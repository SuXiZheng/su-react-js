FROM ubuntu:18.04
LABEL MAINTAINER="suxizheng freestyle.sago@outlook.com"
RUN apt-get update
RUN apt-get install -y nodejs npm nginx
RUN npm i -g npm
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./package.json /opt/app
RUN npm install --registry=https://registry.npm.taobao.org
COPY . /opt/app
RUN npm run build
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN cp -r ./build/* /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]