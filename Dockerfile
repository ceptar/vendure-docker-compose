FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
# Set the locale
RUN apt-get update && apt-get install -y locales && \
    locale-gen en_US.UTF-8 && \
    update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
RUN yarn
COPY . .
RUN chmod +x /usr/src/app/wait-for-it.sh
RUN yarn build
