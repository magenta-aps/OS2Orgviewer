# orgchart


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Design considerations

### Graph data in state store VS nodedata

Relying on a centralised state to store information about nodes is preferable to letting the nodes store data in the VUE components. This way the data of the tree can be stored in a non-hierarchial graph list. When we try to navigate up to a new parent root node, we don't need to refetch the entire tree and redraw it. We can just fetch the parent and its sibling nodes and add it to the graph list. Setting a new root id, should redraw the tree more efficiently.
Also, finding a node based on UUID is easier when we don't need to account for its hierarchiacal position in the tree. This should come in handy when trying to open the page with a specific tree node in highlighted mode.

Therefore, the Branch and Leaf components only take a uuid as property and pull data from the graph list in the state store.


## Concepts:

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


