# OS2Orgviewer

This is a web application that displays a chart over an organization and its members.
You can navigate the chart, display info on individual sections and people, and search for people or units within the organisation.
It pulls organization information from OS2MO REST API.

## Installation

Assuming you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed, check out this code and install the build dependencies:

```
git clone git@git.magenta.dk:rammearkitektur/os2orgviewer.git
cd os2orgviewer/app
npm install
```

### Development quick start

OS2orgviewer assumes you have a running OS2MO instance somewhere with access to it's API.
If that is not the case, you should start a local OS2MO instance like so:
1. Install OS2MO
2. Make a file `docker-compose.override.yml` and edit it to insert this configuration: 
```
services:
  mo:
    environment:      
      OS2MO_AUTH: "false"
```
3. Start OS2MO with this command
```
FIXTURE=kolding docker-compose -f docker-compose.yml -f docker-compose.fixture.yml -f docker-compose.override.yml up -d --build
```

Then you can configure and start OS2orgviewer.

1. Make a copy of .env.example and set its VUE_APP_API_BASEURL variable:
   ```
   cd app
   cp .evn.example .env
   ```
   Open the `.env` file and edit the VUE_APP_API_BASEURL (assuming OS2MO is running at http://localhost:5000)
   ```
   VUE_APP_API_BASEURL=http://localhost:5000
   ```

2. Start development server
   ```
   (from app/)
   npm run serve
   ```
   This will give you an URL, usually something like `http://localhost:8652/`, where your application is running.

3. Edit files and enjoy hot reloading.

Refer to [the development section](./app/docs/development.md) for further development instructions.


### Deploy quick start

Inside [os2orgviewer/app](./app) directory, run the build script

```
npm run build (default setup)
```

New directories will be created in the [app/dist](./app/dist) folder with your build (example: `app/dist/default/`). Hook it up to a server, and you'll be good to go.

## Documentation

[Document for the application can be found here.](./app/docs/index.md)

### Configuration documentation

Configuration details can be found in [the configuration section](./app/docs/configuration.md)
