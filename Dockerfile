FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npx nx build demo-backend
CMD ["node", "dist/apps/demo-backend/main.js"] 