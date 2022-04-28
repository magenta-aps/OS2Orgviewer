# Development

Refer to the [the general README](../../README.md) for setup instructions.

## Start a development server with hot reload

```
npm run serve
```

## Compile for production and deploy

```
npm run build
```

This command creates a build for every customer specific setup and copies them into individual directories inside the generated `/dist` folder. The default build resides in the the `dist/default` folder.

After compile, pick any build folder and serve `index.html` and its associated static resources.

## Run tests

You can run Testcafe E2E tests from the command line.
Assuming you have Chrome browser installed, and your app runs on localhost:8083:
```
(from app/)
node_modules/.bin/testcafe chrome tests/*.js --baseurl http://localhost:8083
```
Tests can also be run in headless mode, if your browser supports it:
```
(from app/) 
node_modules/.bin/testcafe chrome:headless tests/*.js --baseurl http://localhost:8083
```

## Configuration

See [the configuration section](configuration.md) for details on configuration.

# REST API interfacing

orgviewer uses a combination of the [OS2MO REST API]() and [GraphQL](https://rammearkitektur.docs.magenta.dk/os2mo/graphql/intro.html) as a backend.
