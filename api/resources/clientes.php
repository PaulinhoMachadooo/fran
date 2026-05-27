<?php
require_once __DIR__ . '/../config/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$matches = [];
preg_match('#/api/clientes(?:/([^/]+))?$#', $uri, $matches);
$id = $matches[1] ?? null;

if ($method === 'POST' && !$id) {
  $data = jsonInput();
  requireFields($data, ['nome']);
  $newId = $data['id'] ?? sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', mt_rand(0,65535),mt_rand(0,65535),mt_rand(0,65535),mt_rand(16384,20479),mt_rand(32768,49151),mt_rand(0,65535),mt_rand(0,65535),mt_rand(0,65535));
  $stmt = db()->prepare('INSERT INTO clientes (id, nome, telefone, email, user_id) VALUES (:id,:nome,:telefone,:email,:user_id)');
  $stmt->execute([
    'id' => $newId,
    'nome' => $data['nome'],
    'telefone' => $data['telefone'] ?? null,
    'email' => $data['email'] ?? null,
    'user_id' => $data['user_id'] ?? null,
  ]);
  $s = db()->prepare('SELECT * FROM clientes WHERE id = :id');
  $s->execute(['id' => $newId]);
  jsonResponse($s->fetch(), 201);
}

if ($method === 'DELETE' && $id) {
  $stmt = db()->prepare('DELETE FROM clientes WHERE id = :id');
  $stmt->execute(['id' => $id]);
  jsonResponse(['ok' => true]);
}

jsonResponse(['error' => 'Rota/método não suportado'], 404);
