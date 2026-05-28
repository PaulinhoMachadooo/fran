# Guia completo: MySQL + API PHP na Hostinger

Este guia entrega **tudo pronto para publicar**: banco MySQL, tabelas, API PHP e checklist de deploy.

## 1) Criar banco MySQL na Hostinger

1. Entre no **hPanel** da Hostinger.
2. Vá em **Databases > MySQL Databases**.
3. Clique em **Create a new database**.
4. Defina:
   - **Database name**: `app_prod`
   - **Username**: `app_user`
   - **Password**: senha forte (salve em local seguro)
5. Anote:
   - Host MySQL (geralmente `localhost` na hospedagem compartilhada)
   - Nome completo do banco (na Hostinger costuma ter prefixo, ex: `u123456789_app_prod`)
   - Usuário completo (ex: `u123456789_app_user`)

## 2) Importar as tabelas SQL

1. No hPanel, abra **phpMyAdmin** do banco criado.
2. Clique em **Import**.
3. Selecione o arquivo `hostinger/sql/schema.sql`.
4. Execute.

Opcional (dados iniciais):
1. Ainda no phpMyAdmin, importe `hostinger/sql/seed.sql`.

## 3) Publicar API PHP

1. No hPanel, abra **File Manager**.
2. Envie a pasta `hostinger/api/` para `public_html/api/`.
3. Renomeie `hostinger/api/.env.example` para `public_html/api/.env`.
4. Atualize as variáveis do `.env` com os dados do seu MySQL.

Exemplo:

```env
DB_HOST=localhost
DB_NAME=u123456789_app_prod
DB_USER=u123456789_app_user
DB_PASS=SUA_SENHA_FORTE
DB_PORT=3306
APP_ENV=production
APP_DEBUG=false
```

## 4) Permissões de arquivos

- Arquivos PHP: `644`
- Pastas: `755`
- `.env`: `600` (se possível)

## 5) Testar API

Base URL:

```text
https://SEU_DOMINIO.com/api
```

Endpoints:

- `GET /health.php`
- `GET /products.php`
- `GET /products.php?id=1`
- `POST /products.php`
- `PUT /products.php?id=1`
- `DELETE /products.php?id=1`

### Exemplo cURL

Criar produto:

```bash
curl -X POST "https://SEU_DOMINIO.com/api/products.php" \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook","description":"16GB RAM","price":4999.90,"stock":10}'
```

Listar produtos:

```bash
curl "https://SEU_DOMINIO.com/api/products.php"
```

## 6) Configuração de CORS (frontend separado)

No arquivo `hostinger/api/bootstrap.php`, ajuste a constante:

```php
define('ALLOWED_ORIGIN', '*');
```

Para produção, troque `*` pelo domínio exato do frontend.

## 7) Checklist final de publicação

- [ ] Banco MySQL criado no hPanel
- [ ] `schema.sql` importado
- [ ] API enviada para `public_html/api`
- [ ] `.env` configurado com credenciais reais
- [ ] Endpoint `/health.php` respondendo `ok`
- [ ] Testes de CRUD em `/products.php`

---

## Estrutura entregue neste repositório

- `hostinger/sql/schema.sql`
- `hostinger/sql/seed.sql`
- `hostinger/api/.htaccess`
- `hostinger/api/.env.example`
- `hostinger/api/bootstrap.php`
- `hostinger/api/health.php`
- `hostinger/api/products.php`

