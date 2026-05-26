export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agendamentos: {
        Row: {
          cliente_id: string
          created_at: string
          data_hora: string
          duracao_minutos: number
          forma_pagamento: string | null
          funcionario_id: string
          id: string
          observacoes: string | null
          servico_id: string
          status: Database["public"]["Enums"]["status_agendamento"]
          tipo_pet: string
          updated_at: string
        }
        Insert: {
          cliente_id: string
          created_at?: string
          data_hora: string
          duracao_minutos?: number
          forma_pagamento?: string | null
          funcionario_id: string
          id?: string
          observacoes?: string | null
          servico_id: string
          status?: Database["public"]["Enums"]["status_agendamento"]
          tipo_pet?: string
          updated_at?: string
        }
        Update: {
          cliente_id?: string
          created_at?: string
          data_hora?: string
          duracao_minutos?: number
          forma_pagamento?: string | null
          funcionario_id?: string
          id?: string
          observacoes?: string | null
          servico_id?: string
          status?: Database["public"]["Enums"]["status_agendamento"]
          tipo_pet?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agendamentos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agendamentos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          created_at: string
          data_cadastro: string
          email: string | null
          id: string
          nome: string
          observacoes: string | null
          telefone: string | null
          ultima_visita: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data_cadastro?: string
          email?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          telefone?: string | null
          ultima_visita?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data_cadastro?: string
          email?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          telefone?: string | null
          ultima_visita?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      comissoes: {
        Row: {
          created_at: string
          funcionario_id: string
          id: string
          tipo_comissao: string
          updated_at: string
          valor: number
        }
        Insert: {
          created_at?: string
          funcionario_id: string
          id?: string
          tipo_comissao?: string
          updated_at?: string
          valor?: number
        }
        Update: {
          created_at?: string
          funcionario_id?: string
          id?: string
          tipo_comissao?: string
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "comissoes_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      configuracoes_barbearia: {
        Row: {
          banner_url: string
          cor_primaria: string
          cor_secundaria: string
          created_at: string
          dias_funcionamento: string[]
          email: string
          endereco: string
          horario_abertura: string
          horario_almoco_fim: string
          horario_almoco_inicio: string
          horario_fechamento: string
          id: string
          intervalo_agendamento: number
          logo_url: string
          nome: string
          telefone: string
          updated_at: string
        }
        Insert: {
          banner_url?: string
          cor_primaria?: string
          cor_secundaria?: string
          created_at?: string
          dias_funcionamento?: string[]
          email?: string
          endereco?: string
          horario_abertura?: string
          horario_almoco_fim?: string
          horario_almoco_inicio?: string
          horario_fechamento?: string
          id?: string
          intervalo_agendamento?: number
          logo_url?: string
          nome?: string
          telefone?: string
          updated_at?: string
        }
        Update: {
          banner_url?: string
          cor_primaria?: string
          cor_secundaria?: string
          created_at?: string
          dias_funcionamento?: string[]
          email?: string
          endereco?: string
          horario_abertura?: string
          horario_almoco_fim?: string
          horario_almoco_inicio?: string
          horario_fechamento?: string
          id?: string
          intervalo_agendamento?: number
          logo_url?: string
          nome?: string
          telefone?: string
          updated_at?: string
        }
        Relationships: []
      }
      funcionarios: {
        Row: {
          ativo: boolean
          cargo: Database["public"]["Enums"]["cargo_funcionario"]
          created_at: string
          email: string
          id: string
          nivel_acesso: Database["public"]["Enums"]["nivel_acesso"]
          nome: string
          telefone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ativo?: boolean
          cargo?: Database["public"]["Enums"]["cargo_funcionario"]
          created_at?: string
          email: string
          id?: string
          nivel_acesso?: Database["public"]["Enums"]["nivel_acesso"]
          nome: string
          telefone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ativo?: boolean
          cargo?: Database["public"]["Enums"]["cargo_funcionario"]
          created_at?: string
          email?: string
          id?: string
          nivel_acesso?: Database["public"]["Enums"]["nivel_acesso"]
          nome?: string
          telefone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      servicos: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          duracao_minutos: number
          id: string
          nome: string
          preco: number
          tempo_medio: number
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          duracao_minutos?: number
          id?: string
          nome: string
          preco?: number
          tempo_medio?: number
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          duracao_minutos?: number
          id?: string
          nome?: string
          preco?: number
          tempo_medio?: number
          updated_at?: string
        }
        Relationships: []
      }
      servicos_quitados: {
        Row: {
          agendamento_id: string | null
          cliente_id: string | null
          created_at: string
          data_hora: string | null
          data_quitacao: string
          forma_pagamento: string | null
          funcionario: string | null
          funcionario_id: string | null
          id: string
          observacoes: string | null
          servico_id: string | null
          updated_at: string
          valor_servico: number
        }
        Insert: {
          agendamento_id?: string | null
          cliente_id?: string | null
          created_at?: string
          data_hora?: string | null
          data_quitacao?: string
          forma_pagamento?: string | null
          funcionario?: string | null
          funcionario_id?: string | null
          id?: string
          observacoes?: string | null
          servico_id?: string | null
          updated_at?: string
          valor_servico?: number
        }
        Update: {
          agendamento_id?: string | null
          cliente_id?: string | null
          created_at?: string
          data_hora?: string | null
          data_quitacao?: string
          forma_pagamento?: string | null
          funcionario?: string | null
          funcionario_id?: string | null
          id?: string
          observacoes?: string | null
          servico_id?: string | null
          updated_at?: string
          valor_servico?: number
        }
        Relationships: []
      }
      transacoes_financeiras: {
        Row: {
          agendamento_id: string | null
          created_at: string
          data: string
          descricao: string
          forma_pagamento: string | null
          funcionario_id: string | null
          id: string
          tipo: string
          updated_at: string
          valor: number
        }
        Insert: {
          agendamento_id?: string | null
          created_at?: string
          data?: string
          descricao?: string
          forma_pagamento?: string | null
          funcionario_id?: string | null
          id?: string
          tipo?: string
          updated_at?: string
          valor?: number
        }
        Update: {
          agendamento_id?: string | null
          created_at?: string
          data?: string
          descricao?: string
          forma_pagamento?: string | null
          funcionario_id?: string | null
          id?: string
          tipo?: string
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_financeiras_agendamento_id_fkey"
            columns: ["agendamento_id"]
            isOneToOne: false
            referencedRelation: "agendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacoes_financeiras_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_cliente_id: { Args: never; Returns: string }
      current_funcionario_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "colaborador" | "cliente"
      cargo_funcionario:
        | "barbeiro"
        | "recepcionista"
        | "gerente"
        | "administrador"
        | "tosadora"
      nivel_acesso: "administrador" | "colaborador"
      status_agendamento:
        | "pendente"
        | "confirmado"
        | "concluido"
        | "cancelado"
        | "agendado"
        | "quitado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "colaborador", "cliente"],
      cargo_funcionario: [
        "barbeiro",
        "recepcionista",
        "gerente",
        "administrador",
        "tosadora",
      ],
      nivel_acesso: ["administrador", "colaborador"],
      status_agendamento: [
        "pendente",
        "confirmado",
        "concluido",
        "cancelado",
        "agendado",
        "quitado",
      ],
    },
  },
} as const
