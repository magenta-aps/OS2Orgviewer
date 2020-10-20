# OS2Orgviewer

This is a web application that displays a chart over an organization and its members.
You can navigate the chart, display info on individual sections and people, and search for people or units within the organisation.
It pulls organization information from OS2MO REST API.

## Project setup
Assuming you have [Node.js](https://nodejs.org/en/) installed, check out this code and install the build dependencies:
```
git clone git@git.magenta.dk:rammearkitektur/os2orgviewer.git
cd os2orgviewer/app
npm update
npm install
```

### Build and deploy quick start
Inside [os2orgviewer/app](os2orgviewer/app) directory, run any of the customized build scripts
```
npm run build (default setup)
OR 
npm run build-frederikshavn-med (example custom setup)
```

A new directory will be created in the `/dist` folder with your custom build (example: `/dist/frederikshavn-med`). Hook it up to a server, and you'll be good to go.


## Development
Refer to the [app README](app/README.md) for development instructions.