# hongkong-map-timeline

## Dependencies

Mongodb

## Development

### Requirement

- MongoDB running on localhost
- npm

### Start the api server

```bash
cd backend

# copy the .env file
cp .env-sample .env

# modify the env file

# install dependecies and start the server
npm install

# the server will listen on port 1337
npm run dev

```

### Import the data via api

```bash
cd scripts/had-import

# install dependecies
npm install

# import the csv to db
node had-importer.js import data/had_result_20190311.csv localhost:1337

```

### Start the frontend

```bash
cd app


# install dependecies and start the server
npm install

# the server will listen on port 3000
npm run dev
```