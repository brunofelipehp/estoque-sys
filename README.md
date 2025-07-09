# 📦 Sistema de estoque

Sistema completo para controle de estoque com frontend em React + Vite, backend em Fastify + Prisma e integração com PostgreSQL e MinIO.

## 📁 Estrutura do Projeto

```
estoque-sys/
├── back/          # Backend Fastify com Prisma
├── front/         # Frontend React com Vite
```

---

## ⚙️ Tecnologias

- **Frontend:** React, Vite, TypeScript, React Router DOM, React Query, Zod
- **Backend:** Fastify, Prisma, PostgreSQL, MinIO
- **Infra:** Docker, Docker Compose

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js
- pnpm (ou npm)
- Docker e Docker Compose

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/estoque-sys.git
cd estoque-sys
```

### 2. Subir serviços com Docker

```bash
docker-compose up --build
```

Isso iniciará:

- PostgreSQL em `localhost:5432`
- MinIO em `localhost:9000` (console em `localhost:9090`)

MinIO:

- Usuário: `brunohp`
- Senha: `brunohp3008`
- Bucket: `uploads`

### 3. Backend

```bash
cd back
pnpm install
pnpm prisma db push
pnpm run seed # opcional, para dados iniciais
pnpm run dev
```

### 4. Frontend

```bash
cd front
pnpm install
pnpm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## 🖼️ Uploads de Imagem com MinIO

### Envio (upload)

O backend salva imagens usando o MinIO:

```ts
await minioClient.putObject('uploads', fileName, image.file);
```

### Acesso

As imagens são acessíveis via URL pública:

```
http://localhost:9000/uploads/arquivo.jpg
```

---

## 🥪 Comandos úteis

```bash
pnpm prisma studio    # Interface visual do banco
pnpm prisma generate  # Gerar cliente Prisma
pnpm run dev          # Rodar backend localmente
```

---

## 🛡️ Observações

- MinIO no Render pode excluir buckets automaticamente em free tier
- Imagens estáticas no frontend devem estar na pasta `public/`
- Para produção, certifique-se que o bucket do MinIO está com política pública ou gere URLs assinadas
