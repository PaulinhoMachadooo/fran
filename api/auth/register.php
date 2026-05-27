<?php
require_once __DIR__ . '/helpers.php';
$data = jsonInput();
requireFields($data, ['nome', 'email', 'password']);
$id = bin2hex(random_bytes(16));
$hash = password_hash($data['password'], PASSWORD_DEFAULT);
$stmt = db()->prepare('INSERT INTO usuarios (id,nome,email,senha_hash) VALUES (:id,:nome,:email,:senha_hash)');
try {
  $stmt->execute(['id'=>$id, 'nome'=>$data['nome'], 'email'=>$data['email'], 'senha_hash'=>$hash]);
} catch (Throwable $e) {
  jsonResponse(['error' => 'E-mail já cadastrado ou dados inválidos'], 409);
}
$user = ['id' => $id, 'nome' => $data['nome'], 'email' => $data['email']];
jsonResponse(['token' => issueToken($user), 'user' => $user], 201);
