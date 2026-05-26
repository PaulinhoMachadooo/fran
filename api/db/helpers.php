<?php
function allowedTables(): array {
  return [
    'clientes', 'funcionarios', 'servicos', 'agendamentos', 'comissoes',
    'configuracoes_barbearia', 'transacoes_financeiras', 'servicos_quitados', 'usuarios'
  ];
}

function validateTable(string $table): string {
  if (!in_array($table, allowedTables(), true)) {
    jsonResponse(['error' => 'Tabela não permitida'], 400);
  }
  return $table;
}
