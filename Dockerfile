FROM node:18-slim

#Dockerファイルで環境変数を設定
ARG WORKDIR
ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0

WORKDIR ${HOME}

RUN apt-get update \
    && apt-get install -y \
    git \
    vim