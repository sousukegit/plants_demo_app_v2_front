FROM node:18.18.0-alpine

ARG WORKDIR
ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0

#RUN yarn install

# ENV check（このRUN命令は確認のためなので無くても良い）
RUN echo ${HOME}

#yarn install
RUN yarn install

WORKDIR ${HOME}

