# API-1.0

###Installation Setup and Running Instructions

### Prerequisites

- [Node.js and npm](nodejs.org) Node ^8.5.0, npm ^3.10.10
- [MySQL](https://dev.mysql.com/) v5.7 

### Setup the database
- CREATE DATABASE <Database_Name>

### Developing

1. Run `npm install` to install server dependencies.

2. Run `npm install gulp -g`

3. For configuration, Go to config directory, update `development_config.ts` file. Please note password needs to be added in encrypted form and to encrypt your password please run `node convertPassword.js your_password`. This will give you the string of encrypted password in shell and use that in configuration file. 

4. Run `gulp` 

5. If Database is not created run `NODE_ENV=<environment> node_modules/.bin/sequelize  db:create --env=<environment>`

6. Then Run `NODE_ENV=<environment> node_modules/.bin/sequelize db:migrate --env=<environment>` to generate tables

7. Then Run `NODE_ENV=<environment> node_modules/.bin/sequelize sequelize db:seed:all`

8. Open new shell and run `npm start`(Now we can access swagger url: http://localhost:3000/api-docs)
