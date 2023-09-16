FROM node:19

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate
# RUN bunx prisma migrate dev
RUN npm run build

EXPOSE 3001


ENTRYPOINT ["./entrypoint.sh"]
