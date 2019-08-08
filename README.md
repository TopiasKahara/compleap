# CompLeap Prototype

This repository contains source code for Compleap Prototype components. This source code acts as an example implementation of the prototyped CompLeap service. The prototype application demonstrates a learner profile that makes use of information about learner's skills, competences, and interests. With the aid of this information, learning opportunity recommendations are offered to help the learner realise new areas where the competences and interests could be combined.

In terms of source code, the prototype application is divided into two main components:

- Client-side application (`model` directory)
- Recommendations application (`src` directory)

## Technologies and development tools

- JavaScript with ECMAScript 2015 features (programming language for the client app)
- R (programming language for the recommendations app)

The client app also makes use of the following core technologies and development tools:

- Node.js & NPM (https://nodejs.org/en/) (dependency management)
- React (https://reactjs.org/) (views)
- webpack (https://webpack.js.org/) and Babel (https://babeljs.io/) (build)
- styled-components (https://www.styled-components.com/) (styles)
- JavaScript Standard Style (https://standardjs.com/) and ESLint (https://eslint.org/) (code style)

In addition, following tools are used to ease the development:

- Docker (https://www.docker.com/) and Docker Compose (https://docs.docker.com/compose/) (development environment)

## Installing dependencies

Ensure that you are using a correct version of Node.js and NPM:

```shell
node --version
# v10.15.3

npm --version
# 6.4.1
```

Install dependencies:

```shell
npm i
```

Create `.env` file for environment variables by copying it from the example file:
```shell
cp .env.example .env
```

## Running client app locally

```shell
npm run start:dev
```

This starts up the development server (webpack-dev-server) and serves the app at http://localhost:8080/.

Alternatively, you can create a development build (`npm run build:dev`) and serve the files from the `dist` directory with some other HTTP server application. The production build can be created similarly by running `npm run build:prod`.

For using the client with the recommendations API, see [below](#Connecting-from-the-client-app).

## Running recommendations API locally

To start up the recommendations API locally, run:

```shell
docker-compose build model-api
docker-compose up model-api
```

The API is now available at `localhost:8000`.

### Connecting from the client app

First, switch from mock API to the locally served API by changing the `API_ENDPOINT` environment variable from `mock` to `/v2/match`.

To use the local recommendations API together with the client app (being served from e.g. the webpack-dev-server), both the API and an Nginx reverse proxy can be started by running:
```shell
docker-compose up
```

The client is now connected to the API can be accessed from `localhost:7000`.

## Running tests

**All tests:**

```shell
npm run test
```

**Or by type:**

Puppeteer-based browser tests:
```shell
npm run test:ui
```

Component tests:
```shell
npm run test:component
```

## License


Copyright (c) 2019 The Finnish National Board of Education - Opetushallitus

This program is free software: Licensed under the EUPL, Version 1.2 (the "Licence").

You may not use this work except in compliance with the Licence.
You may obtain a copy of the Licence at https://joinup.ec.europa.eu/software/page/eupl or from the [LICENSE.txt](https://github.com/Opetushallitus/compleap/blob/master/LICENSE.txt) file contained within this repository.
