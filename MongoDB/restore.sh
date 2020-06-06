#!/usr/bin/env bash
docker-entrypoint.sh mongod &
echo "Waiting mongodb to launch on 27017..."

while ! timeout 1 bash -c "echo > /dev/tcp/localhost/27017"; do   
  sleep 1
  echo "waiting"
done
echo "waiting end"
echo "MongoDB launched"
mongorestore /BACKUP/
mongod --shutdown

while timeout 1 bash -c "echo > /dev/tcp/localhost/27017"; do   
  sleep 1
  echo "waiting"
done
docker-entrypoint.sh mongod
