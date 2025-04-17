FROM node:22.11.0
WORKDIR /app

COPY . ./

RUN npm ci
RUN npm run after-ci
RUN npm run prod

EXPOSE ${PORT}
CMD ["node", "backend/dist/server.js"]
# docker build . -t poker-planning-2:v1
# docker run -p 8085:8085 -e PORT=8085 poker-planning-2:v1