FROM node:14.1-alpine AS builder

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

ENV REACT_APP_API_URL=https://app-backend-test-001.azurewebsites.net/

COPY . ./
RUN npm run build

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template

#copy serverdata.sh file to the root so it can be picked up and run by the build process. Might not need to copy if serverdata.sh is in the root (entrypoint) for the Docker container?!
COPY ./usr/share/nginx/html/serverdata.sh .

#run this serverdata.sh file on startup. (might just need to actually run from the root instead?!)
#likely need to fix the line below to call the serverdata.sh script from the right place!
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/serverdata.sh && nginx -g \"daemon off;\""]

CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /opt/web/build /usr/share/nginx/html




