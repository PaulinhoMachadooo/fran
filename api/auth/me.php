<?php
require_once __DIR__ . '/helpers.php';
$user = currentUserFromToken();
if (!$user) {
  jsonResponse(['error' => 'Não autenticado'], 401);
}
jsonResponse(['user' => $user]);
