FROM node:20.7.0-alpine3.18

#Dockerファイルで環境変数を設定
ARG WORKDIR
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    API_URL=${API_URL}
    #本番のみ使用
    #API_URL=https://api.botanispot.com

WORKDIR ${HOME}

RUN apk update \
    git \
    vim

#npmインストール
#npmの依存関係をイメージ内にコピー
#COPY package.json package-lock.json ./
COPY ./ ./
#.npmのキャッシュを覗いてインストールする（追加分のみ）
RUN npm install
#RUN --mount=type=cache,target=./.npm npm install
