# payplus

## Description

payPlus Time Clock implementation

## Table of Contents (Optional)

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites

Docker,Docker-compose,Nodejs,npm installed.

## Installation

### Docker-compose

the first step we should init all ENV files env files example in the code below.

postgres.admin.env

```sh
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
PGADMIN_LISTEN_PORT=5433
```

postgres.env

```sh
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=payplus
```

place them in the root dir

```sh
PORT = 3000

DATABASE_URL="postgresql://admin:admin@localhost:5432/payplus?schema=public"


```

after setting all those .env files run those commands

```sh
docker-compose up -d
```

in the root dir where the docker-compose file located.

next step is **mandatory** to init the DB scheme:

```sh
$ docker exec -it <CONTAINER-ID> /bin/sh
```

inside the integrated terminal run this command.

```sh
npx prisma migrate deploy
```
