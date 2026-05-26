<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_once __DIR__ . '/helpers.php';

$payload = jsonInput();
$table = validateTable($payload['table'] ?? '');
$filters = $payload['filters'] ?? [];
if (!$filters) jsonResponse(['error' => 'filters obrigatório'], 422);

$params = [];
$where = [];
foreach ($filters as $k => $v) { $where[] = "`$k` = :$k"; $params[$k] = $v; }
$sql = "DELETE FROM `$table` WHERE " . implode(' AND ', $where);
db()->prepare($sql)->execute($params);
jsonResponse(['data' => []]);
