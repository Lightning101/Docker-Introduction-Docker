# Base image to pull from
FROM mongo

# Copy files to container
COPY ./MongoDB .

# Custom entry point because we want there to be data initially
ENTRYPOINT /restore.sh

EXPOSE 27017