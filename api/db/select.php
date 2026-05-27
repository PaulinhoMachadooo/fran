<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_once __DIR__ . '/helpers.php';

$table = validateTable($_GET['table'] ?? '');
$orderBy = $_GET['orderBy'] ?? 'created_at';
$ascending = ($_GET['ascending'] ?? 'true') !== 'false';
$where = [];
$params = [];

foreach ($_GET as $k => $v) {
  if (str_starts_with($k, 'filter.')) {
    $col = substr($k, 7);
    $where[] = "`$col` = :$col";
    $params[$col] = $v;
  }
}

$sql = "SELECT * FROM `$table`";
if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
$sql .= " ORDER BY `$orderBy` " . ($ascending ? 'ASC' : 'DESC');

$stmt = db()->prepare($sql);
$stmt->execute($params);
jsonResponse(['data' => $stmt->fetchAll()]);
