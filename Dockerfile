FROM node

ENV MONGO_DB_USERNAME=mongoadmin\
    MONGO_DB_USERNAME=pass

RUN mkdir -p /home/app

COPY ./app /home/app

CMD [ "node" , "/home/app/server.js" ]