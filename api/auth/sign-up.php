<?php
require_once __DIR__ . '/../config/bootstrap.php';
$data = jsonInput();
requireFields($data, ['email', 'password']);
$nome = $data['nome'] ?? explode('@', $data['email'])[0];
$id = bin2hex(random_bytes(16));
$hash = password_hash($data['password'], PASSWORD_DEFAULT);
$stmt = db()->prepare('INSERT INTO usuarios (id,nome,email,senha_hash) VALUES (:id,:nome,:email,:senha_hash)');
try {
  $stmt->execute(['id'=>$id,'nome'=>$nome,'email'=>$data['email'],'senha_hash'=>$hash]);
} catch (Throwable $e) {
  jsonResponse(['error' => ['message' => 'Falha ao cadastrar usuário (email pode já existir).']], 409);
}
jsonResponse(['data' => ['user' => ['id'=>$id,'nome'=>$nome,'email'=>$data['email']]]], 201);
