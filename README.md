# Sistema Barbearia (Frontend + API PHP + MySQL Hostinger)

## 1) Requisitos
- Node.js 20+
- NPM
- PHP 8.1+
- MySQL 8+

## 2) Configuração do banco (Hostinger)
1. No painel da Hostinger, crie um banco MySQL.
2. Anote: **host, porta, nome do banco, usuário e senha**.
3. Importe o schema `api/sql/schema.sql` no phpMyAdmin da Hostinger.

## 3) Configuração da API PHP
Crie um arquivo `.env` (ou configure variáveis no painel da hospedagem) com:

```env
DB_HOST=SEU_HOST_MYSQL
DB_PORT=3306
DB_NAME=SEU_BANCO
DB_USER=SEU_USUARIO
DB_PASS=SUA_SENHA
```

A API já está pronta em `api/` com endpoints:
- `GET /api/db/select`
- `POST /api/db/insert`
- `POST /api/db/update`
- `POST /api/db/delete`
- `POST /api/auth/sign-in`
- `POST /api/auth/sign-up`
- `POST /api/auth/sign-out`
- `GET /api/auth/session`

## 4) Configuração do frontend
Crie `.env` na raiz:

```env
VITE_API_BASE_URL=https://SEU_DOMINIO.com/api
VITE_API_URL=https://SEU_DOMINIO.com/api
VITE_HOSTINGER_API_URL=https://SEU_DOMINIO.com/api
```

## 5) Rodar localmente
```bash
npm install
npm run dev
```

## 6) Build de produção
```bash
npm run build
```
A saída será gerada em `dist/`.

## 7) Como subir na Hostinger (passo a passo)
1. No hPanel, abra **Gerenciador de Arquivos** do domínio.
2. Faça upload de `dist/` para `public_html/`.
3. Faça upload da pasta `api/` para `public_html/api/`.
4. Garanta que o PHP do domínio está em versão **8.1+**.
5. Configure variáveis de ambiente (ou edite `api/config/database.php` com credenciais fixas, se necessário).
6. Importe `api/sql/schema.sql` no banco da Hostinger.
7. Teste no navegador:
   - `https://SEU_DOMINIO.com/api/auth/session`
   - deve retornar JSON com `session: null`.
8. No frontend, valide login e cadastros.

## 8) Observações
- As rotas de banco aceitam apenas tabelas permitidas em `api/db/helpers.php`.
- O login utiliza tabela `usuarios` com `password_hash` do PHP.
- Para segurança em produção, restrinja CORS e implemente JWT/sessão persistente.
