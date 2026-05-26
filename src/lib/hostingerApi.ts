// Cliente para a API PHP hospedada na Hostinger.
// Hoje cobre apenas servicos_quitados (movido para fora da Lovable Cloud).

const BASE_URL = (import.meta.env.VITE_HOSTINGER_API_URL || "").replace(/\/$/, "");

export interface ServicoQuitado {
  id: string;
  agendamento_id: string | null;
  cliente_id: string | null;
  servico_id: string | null;
  funcionario_id: string | null;
  funcionario: string | null;
  data_hora: string | null;
  data_quitacao: string;
  valor_servico: number;
  forma_pagamento: string | null;
  observacoes: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ServicoQuitadoInput {
  agendamento_id?: string | null;
  cliente_id?: string | null;
  servico_id?: string | null;
  funcionario_id?: string | null;
  funcionario?: string | null;
  data_hora?: string | null;
  data_quitacao?: string | null;
  valor_servico: number;
  forma_pagamento?: string | null;
  observacoes?: string | null;
}

function endpoint(path: string) {
  if (!BASE_URL) {
    throw new Error("VITE_HOSTINGER_API_URL não configurada");
  }
  return `${BASE_URL}/${path.replace(/^\//, "")}`;
}

export async function listServicosQuitados(params?: {
  from?: string;
  to?: string;
}): Promise<ServicoQuitado[]> {
  const qs = new URLSearchParams();
  if (params?.from) qs.set("from", params.from);
  if (params?.to) qs.set("to", params.to);
  const url = endpoint(`servicos_quitados.php${qs.toString() ? `?${qs}` : ""}`);
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Falha ao listar serviços quitados (${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function createServicoQuitado(
  payload: ServicoQuitadoInput,
): Promise<ServicoQuitado> {
  const res = await fetch(endpoint("servicos_quitados.php"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let detail = "";
    try {
      const j = await res.json();
      detail = j?.error || "";
    } catch {}
    throw new Error(
      `Falha ao registrar serviço quitado (${res.status})${detail ? `: ${detail}` : ""}`,
    );
  }
  return res.json();
}