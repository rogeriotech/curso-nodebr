## postgres 
docker run --name postgres -e POSTGRES_USER=rogeriorodrigues -e POSTGRES_PASSWORD=senhasupersecreta -e POSTGRES_DB=heroes -p 5432:5432 -d postgres 

docker ps 

docker exec -it postgres /bin/bash 

## adminer 
docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer 

## mongo 
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=ADMIN -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d mongo:4 

## mongoclient 
docker run --name mongoclient -d -p 3000:3000 -e MONGO_URL=mongodb://ADMIN:senhaadmin@mongodb:27017/admin --link mongodb:mongodb mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u ADMIN -p senhaadmin --authenticationDatabase=admin --eval "db.getSiblingDB('herois').createUser({user: 'rogeriorodrigues', pwd: 'minhasenhasecreta', roles: [ {role: 'readWrite', db: 'herois'} ] })"