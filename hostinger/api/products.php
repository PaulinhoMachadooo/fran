<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$pdo = db();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int) $_GET['id'] : null;

if ($method === 'GET') {
    if ($id !== null && $id > 0) {
        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $product = $stmt->fetch();

        if (!$product) {
            jsonResponse(['error' => 'Produto não encontrado'], 404);
        }

        jsonResponse(['data' => $product]);
    }

    $stmt = $pdo->query('SELECT * FROM products ORDER BY id DESC');
    jsonResponse(['data' => $stmt->fetchAll()]);
}

if ($method === 'POST') {
    $data = inputJson();

    $name = trim((string)($data['name'] ?? ''));
    $description = trim((string)($data['description'] ?? ''));
    $price = (float)($data['price'] ?? 0);
    $stock = (int)($data['stock'] ?? 0);

    if ($name === '') {
        jsonResponse(['error' => 'Campo name é obrigatório'], 422);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO products (name, description, price, stock, active) VALUES (:name, :description, :price, :stock, 1)'
    );
    $stmt->execute([
        'name' => $name,
        'description' => $description,
        'price' => $price,
        'stock' => $stock,
    ]);

    jsonResponse(['message' => 'Produto criado', 'id' => (int)$pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    if ($id === null || $id <= 0) {
        jsonResponse(['error' => 'ID obrigatório'], 422);
    }

    $data = inputJson();

    $name = trim((string)($data['name'] ?? ''));
    $description = trim((string)($data['description'] ?? ''));
    $price = (float)($data['price'] ?? 0);
    $stock = (int)($data['stock'] ?? 0);
    $active = isset($data['active']) ? (int)(bool)$data['active'] : 1;

    if ($name === '') {
        jsonResponse(['error' => 'Campo name é obrigatório'], 422);
    }

    $stmt = $pdo->prepare(
        'UPDATE products SET name=:name, description=:description, price=:price, stock=:stock, active=:active WHERE id=:id'
    );
    $stmt->execute([
        'id' => $id,
        'name' => $name,
        'description' => $description,
        'price' => $price,
        'stock' => $stock,
        'active' => $active,
    ]);

    jsonResponse(['message' => 'Produto atualizado']);
}

if ($method === 'DELETE') {
    if ($id === null || $id <= 0) {
        jsonResponse(['error' => 'ID obrigatório'], 422);
    }

    $stmt = $pdo->prepare('DELETE FROM products WHERE id = :id');
    $stmt->execute(['id' => $id]);

    jsonResponse(['message' => 'Produto removido']);
}

jsonResponse(['error' => 'Método não permitido'], 405);
