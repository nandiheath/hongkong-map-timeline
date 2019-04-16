# hongkong-map-timeline
## Dependencies
MongoDB

## Setup Environment
### API server

```bash
cd backend
npm i
```

For Windows users who encounter issues installing **bcrypt** (Can't find Python executable), please run the following command to install the Windows Build Tools using **an elevated (Administrator) terminal** window which installs the **VS Build Tools** and also **Python 2.7**

```bash
npm install --global --production windows-build-tools
```

### web server

```bash
cd app
npm i
```

## Start Development
set the enviroment variables with ```.env``` file
### Start the API server

```bash
cd backend
npm run dev
```

### Run the web server for the front-end

```bash
cd app
npm run dev
```
