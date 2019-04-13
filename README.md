# QA server

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/malcodeman/qa-server/blob/master/LICENSE)

QA server is simple RESTful API imagined as a private, secure home for organization’s questions and answers.

## Usage

.env file should look like this:

```
PORT=9001
DB_NAME = "qa"
DB_USERNAME = "root"
DB_PASSWORD = "toor"
DB_HOST = "localhost"
```

To start the service run:

```
yarn install
yarn start
```

Client is located [here](https://github.com/malcodeman/qa-client).

## License

[MIT](./LICENSE)
