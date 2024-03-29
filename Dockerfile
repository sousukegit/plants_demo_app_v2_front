FROM node:18-slim

#Dockerファイルで環境変数を設定
ARG WORKDIR
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    API_URL=${API_URL}

WORKDIR ${HOME}

RUN apt-get update \
    && apt-get install -y \
    git \
    vim

#npmインストール
#npmの依存関係をイメージ内にコピー
COPY package.json package-lock.json ./
#.npmのキャッシュを覗いてインストールする（追加分のみ）
RUN --mount=type=cache,target=./.npm npm install