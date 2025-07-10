1.sudo docker ps
2.sudo docker compose up --build

#GUI
Connect DBeaver to PostgreSQL
Connection details:
Host: localhost
Port: 5432
Database: postgres
Username: postgres
Password: postgres

Connect ScyllaDB via commands:
sudo docker exec -it demo-backend-scylla-1 cqlsh
USE mykeyspace;
DESCRIBE TABLES;
SELECT * FROM <tableName>;


prisma cmd:
npx prisma generate
npx prisma migrate deploy


run code for user & admin:
1.npx nx serve admin-app
2.npx nx serve users-app
--check with: 
http://localhost:3001/api 
http://localhost:3002/api/docs  #swagger user
http://localhost:4001/api 
http://localhost:4002/api/docs  #swagger admin


#env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
USERS_PORT=3002
ADMIN_PORT=4002
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_super_refresh_secret_key
