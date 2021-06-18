#multistage build

#stage 1. build the app
FROM node:14.1-alpine AS builder

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install
ENV PATH="./node_modules/.bin:$PATH"
COPY . ./
RUN npm run build



#stage 2. build the production (server) environment
FROM nginx:1.17-alpine

#install curl and envsubst
RUN apk --no-cache add curl
RUN apk --no-cache add bash
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin


#set environment variable
ENV REACT_APP_API_URL=https://app-backend-test-001.azurewebsites.net


#copy config file over to the template
COPY ./nginx.config /etc/nginx/nginx.template

#COPY ./nginx/default.conf /etc/nginx/nginx.conf
#COPY ./nginx.config /etc/nginx/nginx.template

#COPY ./default.conf /etc/nginx/nginx.template
#RUN rm /etc/nginx/conf.d/default.conf
#COPY default.conf /etc/nginx/conf.d/default.conf


#CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf"]
#COPY . ./
#RUN rm -rf /etc/nginx/conf.d
#COPY conf /etc/nginx
#RUN rm /etc/nginx/conf.d/default.conf
#RUN mv ./default.conf /etc/nginx/conf.d/
#COPY ./default.conf /etc/nginx/conf.d/


WORKDIR /usr/share/nginx/html



COPY ./env.sh .
COPY .env.development .
RUN chmod +x env.sh

# Start Nginx server
#CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

RUN bash env.sh

#set variables
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh"]

#substitute out default.conf file with nginx.template AND start the server
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
#CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf"]
#CMD ["/bin/sh", "-c", "nginx -g 'daemon off;'"]

# Static Build
COPY --from=builder /opt/web/build /usr/share/nginx/html


 