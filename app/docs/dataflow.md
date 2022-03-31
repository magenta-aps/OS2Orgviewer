# Application Architecture

## Dataflow (idealized)

The general action/dataflow could summarized like this:
User action -> URL params -> View (dispatch) -> Store/AJAX -> View (getter) -> DOM update

Below is a more detailed description of this flow:

1. When a route changes, **URL parameters** are updated.
2. Views pick up URL changes and **dispatch data fetch actions** to fetch data from backend API.
3. Views then use **getters** to obtain updated data and change the DOM accordingly.
4. Users are free to interact with **router-links**, thus repeating the cycle.
