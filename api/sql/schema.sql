CREATE TABLE IF NOT EXISTS usuarios (
  id CHAR(32) PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clientes (
  id CHAR(36) PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  telefone VARCHAR(30),
  email VARCHAR(180),
  data_cadastro DATE DEFAULT (CURRENT_DATE),
  ultima_visita DATE NULL,
  observacoes TEXT NULL,
  user_id CHAR(32) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS funcionarios (
  id CHAR(36) PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  telefone VARCHAR(30),
  cargo ENUM('barbeiro','recepcionista','gerente','admin') DEFAULT 'barbeiro',
  nivel_acesso ENUM('colaborador','gerente','admin') DEFAULT 'colaborador',
  ativo TINYINT(1) DEFAULT 1,
  user_id CHAR(32) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servicos (
  id CHAR(36) PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  tempo_medio INT DEFAULT 30,
  ativo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agendamentos (
  id CHAR(36) PRIMARY KEY,
  cliente_id CHAR(36) NOT NULL,
  servico_id CHAR(36) NOT NULL,
  funcionario_id CHAR(36) NOT NULL,
  tipo_pet VARCHAR(50) DEFAULT 'humano',
  data_hora DATETIME NOT NULL,
  duracao_minutos INT DEFAULT 30,
  status ENUM('agendado','confirmado','concluido','cancelado') DEFAULT 'agendado',
  forma_pagamento VARCHAR(30) NULL,
  observacoes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_ag_cli FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  CONSTRAINT fk_ag_srv FOREIGN KEY (servico_id) REFERENCES servicos(id),
  CONSTRAINT fk_ag_fun FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id)
);

CREATE TABLE IF NOT EXISTS comissoes (
  id CHAR(36) PRIMARY KEY,
  funcionario_id CHAR(36) NOT NULL,
  tipo_comissao VARCHAR(40) DEFAULT 'percentual',
  valor DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_com_fun FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id)
);

CREATE TABLE IF NOT EXISTS configuracoes_barbearia (
  id CHAR(36) PRIMARY KEY,
  nome VARCHAR(120) DEFAULT 'Minha Barbearia',
  endereco VARCHAR(255) DEFAULT '',
  telefone VARCHAR(30) DEFAULT '',
  email VARCHAR(180) DEFAULT '',
  logo_url VARCHAR(255) DEFAULT '',
  banner_url VARCHAR(255) DEFAULT '',
  cor_primaria VARCHAR(20) DEFAULT '#111827',
  cor_secundaria VARCHAR(20) DEFAULT '#374151',
  dias_funcionamento JSON,
  horario_abertura TIME DEFAULT '09:00:00',
  horario_almoco_inicio TIME DEFAULT '12:00:00',
  horario_almoco_fim TIME DEFAULT '13:00:00',
  horario_fechamento TIME DEFAULT '18:00:00',
  intervalo_agendamento INT DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transacoes_financeiras (
  id CHAR(36) PRIMARY KEY,
  agendamento_id CHAR(36) NULL,
  tipo ENUM('entrada','saida') NOT NULL,
  categoria VARCHAR(80) NOT NULL,
  descricao VARCHAR(255) NULL,
  valor DECIMAL(10,2) NOT NULL,
  data_transacao DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_fin_ag FOREIGN KEY (agendamento_id) REFERENCES agendamentos(id)
);

CREATE TABLE IF NOT EXISTS servicos_quitados (
  id CHAR(36) PRIMARY KEY,
  agendamento_id CHAR(36) NULL,
  cliente_id CHAR(36) NULL,
  servico_id CHAR(36) NULL,
  funcionario_id CHAR(36) NULL,
  funcionario VARCHAR(120) NULL,
  data_hora DATETIME NULL,
  data_quitacao DATE NOT NULL,
  valor_servico DECIMAL(10,2) NOT NULL,
  forma_pagamento VARCHAR(30) NULL,
  observacoes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
