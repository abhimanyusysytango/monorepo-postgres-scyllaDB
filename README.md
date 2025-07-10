# Demo Backend Monorepo

## Prerequisites
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [Nx CLI](https://nx.dev/) (optional, for advanced usage)
- [DBeaver](https://dbeaver.io/) (optional, for DB GUI)


##nx- support command
new workspace: npx create-nx-workspace my-workspace --preset=nest
new app: nx g @nx/nest:app apps/my-nest-app
new lib: nx g @nx/nest:lib libs/my-nest-lib
---

## Getting Started

### 1. Start Services with Docker Compose
```bash
sudo docker compose up --build
```

### 2. Check Running Containers
```bash
sudo docker ps
```

---

## Database Access

### PostgreSQL (via DBeaver)
- **Host:** localhost
- **Port:** 5432
- **Database:** postgres
- **Username:** postgres
- **Password:** postgres

### ScyllaDB (via CLI)
```bash
sudo docker exec -it demo-backend-scylla-1 cqlsh
```
Then run:
```sql
USE mykeyspace;
DESCRIBE TABLES;
SELECT * FROM <tableName>;
```

---

## Prisma Commands
```bash
npx prisma generate
npx prisma migrate deploy
```

---

## Running the Apps

### Start Admin & Users Apps
```bash
npx nx serve admin-app
npx nx serve users-app
```

### API & Swagger URLs
- Users API: [http://localhost:3002/api](http://localhost:3002/api)
- Users Swagger: [http://localhost:3002/api/docs](http://localhost:3002/api/docs)
- Admin API: [http://localhost:4002/api](http://localhost:4002/api)
- Admin Swagger: [http://localhost:4002/api/docs](http://localhost:4002/api/docs)

---

## Environment Variables
Add a `.env` file in the root with:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
USERS_PORT=3002
ADMIN_PORT=4002
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_super_refresh_secret_key
```
