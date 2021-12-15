
<h1 style="text-align: center;">
    <span>Powered by</span><br>
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</h1>


## Description

A simple CRUD application for music platform  
Has three database entities:
- Band
- Album
- Track

## Installation

```bash
$ npm install
```

Application connects to the postgres instance, you have to have one.  
In my case it is running in docker, so there is a dedicated script to run it.

```bash
$ npm run start:dev:db
```

### Variables

You need to add variables to the .env file for it to work:

#### Database

- POSTGRES_HOST
- POSTGRES_PORT
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DATABASE

#### User authentication

- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET

#### Email sender

- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASSWORD

#### Other

- APP_LINK - this app url
- CLIENT_URL - your client url (to redirect after email confirmation)

Now you can run database migrations to create tables

```bash
$ npm run typeorm -- migration:run
```

## Running the app

```bash
# development
$ npm run start:dev

# build
$ npm run build

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
