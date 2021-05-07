# OS2Orgviewer

This is a web application that displays a chart over an organization and its members.
You can navigate the chart, display info on individual sections and people, and search for people or units within the organisation.
It pulls organization information from OS2MO REST API.

## Project setup
Assuming you have [Node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/) installed, check out this code and install the build dependencies:
```
git clone git@git.magenta.dk:rammearkitektur/os2orgviewer.git
cd os2orgviewer/app
pnpm install
```

### Build and deploy quick start
Inside [os2orgviewer/app](./app) directory, run the build script
```
pnpm run build (default setup)
```

New directories will be created in the [app/dist](./app/dist) folder with your build (example: `app/dist/default/`). Hook it up to a server, and you'll be good to go.

## Configuration

Configuration details can be found in [the configuration section](./app/CONFIGURATION.md)

## Development
Refer to [the development section](./app/DEVELOPMENT.md) for development instructions.