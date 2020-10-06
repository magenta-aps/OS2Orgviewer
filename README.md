# orgchart


## Project setup
```
npm update
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles for production and deploy
```
npm run build
```
After compile, serve `index.html` and associated static resources from the generated `/dist` folder.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## System design considerations

### Data store
All org_units' data are stored in graph array.
Every org_unit contains children and parent properties as lists of uuids
Root org_unit and current org_unit are stored as different values

### Data flow

Data flows between REST API, state graph, and tree view

1. User actions update URL query
2. Components watch for changes in URL query and dispatches state action to check for data
3. State checks if data is available or fetches it via REST API
4. Components ask state for data based on URL query


