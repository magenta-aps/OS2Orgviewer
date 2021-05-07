# Development

Refer to the [the general README](../README.md) for setup instructions.


## Start a development server with hot reload
```
pnpm run serve
```

## Compile for production and deploy
```
pnpm run build
```
This command creates a build for every customer specific setup and copies them into individual directories inside the generated `/dist` folder. The default build resides in the the `dist/default` folder.

After compile, pick any build folder and serve `index.html` and its associated static resources. 

## Run tests
You can run Testcafe E2E tests from the command line.
```
pnpm run test
# or
pnpm run headlesstest 
```

## Configuration

See [the configuration section](./app/CONFIGURATION.md) for details on configuration.


# REST API interfacing

orgviewer uses the [OS2MO REST API](https://os2mo.readthedocs.io/en/development/api/rest.html) as a backend.

## Some sample API requests for getting org unit info

While getting org unit information from the REST API, it may be nescessary to compile the output of several requests in order to get complete data.
GET `/service/ou/[uuid]/` returns `parent` (OU object)
GET `/service/ou/ancestor-tree?uuid=[uuid]` returns a list of OUs with properties `child_count` (number) OR `children` (array of OU objects)
GET `/service/ou/[uuid]/children` returns a list of OUs with property `child_count`