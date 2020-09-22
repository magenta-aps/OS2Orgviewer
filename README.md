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

### Navigation
On first load, URL params indicate what org_unit and/or person data to focus
On subsequent navigation, URL params should update with currently focused org_unit or person

On First load
> check for uuid person or uuid org_unit in url params
  > if person uuid
    > load persondata into list of persons (presumed empty)
    > mark focused person
    > mark focused org
    > fetch correponding org and load ancestortree data
    > add ancestortree data to org graph (presumed empty)
    > draw tree
  > if org uuid
    > mark focused org
    > load ancestortree data
    > add ancestortree data to org graph (presumed empty)
    > draw tree
  > if no uuid
    > fetch root orgs
    > mark root orgs[0] as focused org
    > load children data of orgs[0] and add to org graph (presumed empty)
    > draw tree

On org click
  > load org data and add to graph (unless org is already present)
  > mark org as focused org
  > tree should update, displaying org data

On person click
  > load person data and add to personlist (unless person is already present)
  > mark person as focused person
  > tree should update, displaying person data


### Data flow

Data flows between REST API, state graph, and tree view

1. User actions update URL
2. Router updates state based on URL
3. State requests info from REST API when appropriate
4. Tree view displays state





