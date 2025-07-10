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

## ScyllaDB Table Setup

To use ScyllaDB, you must first create a keyspace (like a database/schema) and then create your tables inside that keyspace.

### 1. Connect to ScyllaDB
Use cqlsh (for example, with Docker):
```sh
sudo docker exec -it demo-backend-scylla-1 cqlsh
```

### 2. Create a Keyspace
Replace `my_keyspace` with your desired keyspace name:
```sql
CREATE KEYSPACE IF NOT EXISTS my_keyspace
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};
```

### 3. Switch to the Keyspace
```sql
USE my_keyspace;
```

### 4. Create the Required Tables
Now run:
```sql
CREATE TABLE IF NOT EXISTS user_transactions (
    user_id int,
    transaction_id UUID,
    amount decimal,
    type text,
    status text,
    created_at timestamp,
    PRIMARY KEY (user_id, transaction_id)
) WITH CLUSTERING ORDER BY (transaction_id DESC);

CREATE TABLE IF NOT EXISTS user_product (
    user_id int,
    product_id UUID,
    amount decimal,
    quantity int,
    created_at timestamp,
    PRIMARY KEY (user_id, product_id)
);
```

**Note:**
- Make sure your `.env` file's `SCYLLA_KEYSPACE` matches the keyspace you created above.
- Always switch to the correct keyspace before creating tables.


## ScyllaDB Keyspace & Table Troubleshooting

If you get errors like `my_keyspace does not exist` or `unconfigured table user_transactions`, follow these steps:

1. **List all keyspaces:**
   ```sql
   DESCRIBE KEYSPACES;
   ```

2. **Switch to your keyspace:**
   ```sql
   USE my_keyspace;  -- or the keyspace set in your .env as SCYLLA_KEYSPACE
   ```

3. **List all tables in the current keyspace:**
   ```sql
   DESCRIBE TABLES;
   ```

4. **Describe a specific table:**
   ```sql
   DESCRIBE TABLE user_transactions;
   ```

5. **Check your .env file:**
   Make sure `SCYLLA_KEYSPACE` matches the keyspace where your tables exist.

6. **If needed, create the keyspace:**
   ```sql
   CREATE KEYSPACE IF NOT EXISTS my_keyspace
   WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
   ```

7. **If needed, create the tables:**
   (see the ScyllaDB Table Setup section above)

8. **Restart your app** after making changes.

This will help any new developer quickly resolve common ScyllaDB setup issues.
