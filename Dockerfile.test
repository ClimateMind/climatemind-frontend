FROM node:14.1-alpine AS builder

WORKDIR /opt/web

COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./

RUN npm run build

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN apk --no-cache add bash
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template

ENV REACT_APP_API_URL=https://app-backend-test-001.azurewebsites.net

COPY . ./

WORKDIR /usr/share/nginx/html

COPY ./env.sh .
COPY .env.development .
RUN chmod +x env.sh

# Static Build
COPY --from=builder /opt/web/build /usr/share/nginx/html

# Start Nginx server
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf"]
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]



