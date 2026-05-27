import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scissors } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { api } from "@/integrations/api/client";

const API_URL = (import.meta.env.VITE_API_URL || "/api").trim();
const TOKEN_KEY = "auth_token";

export default function AuthCliente() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ telefone: "" });
  const [signupData, setSignupData] = useState({
    nome: "",
    telefone: "",
  });

  const normalizePhone = (value: string) => value.replace(/\D/g, "");
  const getClienteEmail = (telefone: string) =>
    `${normalizePhone(telefone)}@cliente.barbearia.com`;
  const getClientePassword = (telefone: string) =>
    `cliente_${normalizePhone(telefone)}`;

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Sessão inválida");
        const data = await res.json();
        if (data?.user?.id) {
          checkUserType(data.user.id);
        }
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      });
  }, []);

  const checkUserType = async (userId: string) => {
    const { data: cliente } = await supabase
      .from("clientes")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (cliente) {
      navigate("/painel-cliente");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const telefoneNormalizado = normalizePhone(loginData.telefone);

      if (!telefoneNormalizado) {
        throw new Error("Informe um telefone válido");
      }

      const authRes = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: getClienteEmail(telefoneNormalizado),
          password: loginData.password,
        }),
      });
      const authData = await authRes.json();
      if (!authRes.ok) throw new Error(authData.error || "Erro no login");
      localStorage.setItem(TOKEN_KEY, authData.token);

      if (authData.user) {
        const { data: cliente, error: clienteError } = await supabase
          .from("clientes")
          .select("id")
          .eq("user_id", authData.user.id)
          .maybeSingle();

        if (clienteError) throw clienteError;

        if (!cliente) {
          await api.post("/clientes", {
            user_id: authData.user.id,
            nome: authData.user.nome || "Cliente",
            email: authData.user.email || getClienteEmail(telefoneNormalizado),
            telefone: telefoneNormalizado,
          });
        }

        toast({
          title: "Login realizado!",
          description: "Bem-vindo de volta!",
        });
        navigate("/painel-cliente");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const cleanPhone = normalizePhone(signupData.telefone);
      const generatedEmail = getClienteEmail(cleanPhone);
      const authRes = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: signupData.nome,
          email: generatedEmail,
          password: signupData.password,
          cargo: "cliente",
          nivel_acesso: "cliente",
        }),
      });
      const authData = await authRes.json();
      if (!authRes.ok) throw new Error(authData.error || "Erro no cadastro");
      localStorage.setItem(TOKEN_KEY, authData.token);

      if (authData.user) {
        await api.post("/clientes", {
          user_id: authData.user.id,
          nome: signupData.nome,
          email: generatedEmail,
          telefone: cleanPhone,
        });

        toast({
          title: "Cadastro realizado!",
          description: "Bem-vindo à nossa barbearia!",
        });
        navigate("/painel-cliente");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Scissors className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Área do Cliente</CardTitle>
          <CardDescription>
            Entre ou cadastre-se para agendar seus serviços
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-telefone">Telefone</Label>
                  <Input
                    id="login-telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={loginData.telefone}
                    onChange={(e) =>
                      setLoginData({ ...loginData, telefone: e.target.value })
                    }
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-nome">Nome Completo</Label>
                  <Input
                    id="signup-nome"
                    type="text"
                    placeholder="Seu nome"
                    value={signupData.nome}
                    onChange={(e) =>
                      setSignupData({ ...signupData, nome: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-telefone">Telefone</Label>
                  <Input
                    id="signup-telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={signupData.telefone}
                    onChange={(e) =>
                      setSignupData({ ...signupData, telefone: e.target.value })
                    }
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
