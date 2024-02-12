FROM node:18-slim

ARG WORKDIR
ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0


# #RUN yarn install

# # ENV check（このRUN命令は確認のためなので無くても良い）
# RUN apt-get update \
#     && apt-get install -y \
#     git \
#     vim

# WORKDIR ${HOME}

#ここから下は成功したやつ
# FROM node:18-slim

# ENV TZ Asia/Tokyo


# WORKDIR /app
WORKDIR ${HOME}

RUN apt-get update \
    && apt-get install -y \
    git \
    vim