type ApiResult<T = any> = Promise<{ data: T; error: any }>;

type Session = { user: any } | null;

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) || "/api";

class QueryBuilder {
  private filters: Record<string, any> = {};
  private sort: { column: string; ascending?: boolean } | null = null;

  constructor(private table: string) {}

  eq(column: string, value: any) {
    this.filters[column] = value;
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.sort = { column, ascending: options?.ascending };
    return this;
  }

  async select(_columns = "*"): ApiResult<any[]> {
    try {
      const qs = new URLSearchParams();
      qs.set("table", this.table);
      Object.entries(this.filters).forEach(([k, v]) => qs.set(`filter.${k}`, String(v)));
      if (this.sort) {
        qs.set("orderBy", this.sort.column);
        qs.set("ascending", String(this.sort.ascending !== false));
      }
      const res = await fetch(`${API_BASE_URL}/db/select?${qs.toString()}`);
      const json = await res.json();
      if (!res.ok) return { data: [] as any, error: json?.error || { message: "Erro ao buscar dados" } };
      return { data: json?.data || [], error: null };
    } catch (error) {
      return { data: [] as any, error };
    }
  }

  async maybeSingle(): ApiResult<any | null> {
    const r = await this.select("*");
    return { data: Array.isArray(r.data) ? (r.data[0] || null) : null, error: r.error };
  }

  async single(): ApiResult<any> {
    const r = await this.maybeSingle();
    return { data: r.data, error: r.error || (!r.data ? { message: "Registro não encontrado" } : null) };
  }

  async insert(payload: any[]): ApiResult<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/db/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: this.table, rows: payload }),
      });
      const json = await res.json();
      return { data: json?.data || [], error: res.ok ? null : json?.error || { message: "Erro ao inserir" } };
    } catch (error) {
      return { data: [], error };
    }
  }

  async update(values: any): ApiResult<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/db/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: this.table, values, filters: this.filters }),
      });
      const json = await res.json();
      return { data: json?.data || [], error: res.ok ? null : json?.error || { message: "Erro ao atualizar" } };
    } catch (error) {
      return { data: [], error };
    }
  }

  async delete(): ApiResult<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/db/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: this.table, filters: this.filters }),
      });
      const json = await res.json();
      return { data: json?.data || [], error: res.ok ? null : json?.error || { message: "Erro ao excluir" } };
    } catch (error) {
      return { data: [], error };
    }
  }
}

const auth = {
  async signInWithPassword(params: { email: string; password: string }) {
    const res = await fetch(`${API_BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await res.json().catch(() => ({}));
    return { data: data?.data || null, error: res.ok ? null : data?.error || { message: "Erro no login" } };
  },
  async signUp(emailOrParams: any, password?: string) {
    const payload = typeof emailOrParams === "string" ? { email: emailOrParams, password } : emailOrParams;
    const res = await fetch(`${API_BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { data: data?.data || null, error: res.ok ? null : data?.error || { message: "Erro no cadastro" } };
  },
  async signOut() {
    await fetch(`${API_BASE_URL}/auth/sign-out`, { method: "POST" });
  },
  async getSession() {
    const res = await fetch(`${API_BASE_URL}/auth/session`);
    const data = await res.json().catch(() => ({}));
    return { data: { session: (data?.session || null) as Session } };
  },
  onAuthStateChange(_cb: any) {
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
};

export const supabase = {
  auth,
  from: (table: string) => new QueryBuilder(table),
  channel: (_name: string) => ({ on: () => ({ subscribe: () => ({}) }) }),
  removeChannel: (_c: any) => {},
};
