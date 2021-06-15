FROM node:14.1-alpine AS builder

WORKDIR /opt/web
#why WORKDIR is /opt/web instead of /usr/share/nginx/html ???

COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

ENV REACT_APP_API_URL=https://app-backend-test-001.azurewebsites.net/
#ENV apiUrl=https://app-backend-test-001.azurewebsites.net/
COPY . ./
COPY . .
RUN npm run build

#RUN ["chmod", "+x", "serverdata.sh"]
RUN chmod +x ./serverdata.sh

COPY ./env.sh .
COPY .env.development .

RUN chmod +x env.sh

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN apk --no-cache add bash
RUN apk --no-cache add jq
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template






#Need to update the Dockerfile to copy serverdata.sh to the nginx server root (as defined in nginx.config) as well, as it won't be picked up by the nxginx server build process.
COPY ./serverdata.sh /usr/share/nginx/html/serverdata.sh

#run serverdata.sh upon startup
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/serverdata.sh && nginx -g \"daemon off;\""]


#copy serverdata.sh file to the root so it can be picked up and run by the build process. Might not need to copy if serverdata.sh is in the root (entrypoint) for the Docker container?!
#COPY ./usr/share/nginx/html/serverdata.sh .

#run this serverdata.sh file on startup nginx server startup.
#likely need to fix the line below to call the serverdata.sh script from the right place!
#CMD ["/bin/bash", "-c", "/usr/share/nginx/html/serverdata.sh && nginx -g \"daemon off;\""]




# Static Build
COPY --from=builder /opt/web/build /usr/share/nginx/html

# Start Nginx server
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
#CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf"]
#CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]




