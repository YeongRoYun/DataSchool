# How to simulate it

```
docker container run -d --rm --name mysql \
-e "MYSQL_ALLOW_EMPTY_PASSWORD=yes" \
-e "MYSQL_DATABASE=volume_test" \
-e "MYSQL_USER=example" \
-e "MYSQL_PASSWORD=example" \
--volumes-from mysql-data \
mysql:latest
```
```
docker container exec -it mysql mysql -u root -p volume_test
```
- Save any data and Destory & Restart