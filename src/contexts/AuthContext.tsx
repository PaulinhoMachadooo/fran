import React, { createContext, useContext, useEffect, useState } from "react";

interface Funcionario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  nivel_acesso: string;
  ativo?: boolean;
}

interface AuthContextType {
  user: Funcionario | null;
  session: { token: string } | null;
  funcionario: Funcionario | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    userData: { nome: string; cargo: string; nivel_acesso: string },
  ) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: () => boolean;
  isBarbeiro: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = (import.meta.env.VITE_API_URL || "/api").trim();
const TOKEN_KEY = "auth_token";
const hasValidApiUrl = () => {
  try {
    const url = String(API_URL || "").trim();
    if (!url) return false;
    if (url.startsWith("/")) return true;
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const getConnectionErrorMessage = () =>
  "Falha de conexão com a API de autenticação. Verifique se a API está online e a variável VITE_API_URL está correta.";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Funcionario | null>(null);
  const [session, setSession] = useState<{ token: string } | null>(null);
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Sessão inválida");
        const data = await res.json();
        setUser(data.user);
        setFuncionario(data.user);
        setSession({ token });
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!hasValidApiUrl()) {
      return {
        error: { message: "VITE_API_URL inválida ou não configurada." },
      };
    }
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { error: { message: data.error || "Erro no login" } };

      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
      setFuncionario(data.user);
      setSession({ token: data.token });
      return { error: null };
    } catch {
      return { error: { message: getConnectionErrorMessage() } };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: { nome: string; cargo: string; nivel_acesso: string },
  ) => {
    if (!hasValidApiUrl()) {
      return {
        error: { message: "VITE_API_URL inválida ou não configurada." },
      };
    }
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          nome: userData.nome,
          cargo: userData.cargo,
          nivel_acesso: userData.nivel_acesso,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        return { error: { message: data.error || "Erro no cadastro" } };

      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
      setFuncionario(data.user);
      setSession({ token: data.token });
      return { error: null };
    } catch {
      return { error: { message: getConnectionErrorMessage() } };
    }
  };

  const signOut = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // ignora erro de rede no logout e remove sessão local mesmo assim
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setFuncionario(null);
    setSession(null);
  };

  const isAdmin = () => funcionario?.nivel_acesso === "administrador";
  const isBarbeiro = () => funcionario?.cargo === "barbeiro";

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        funcionario,
        loading,
        signIn,
        signUp,
        signOut,
        isAdmin,
        isBarbeiro,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
