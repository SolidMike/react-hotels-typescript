import { combineReducers } from 'redux'
import { FiltersReducer } from './reducers'

import { createStore, compose } from 'redux'

const enhancers = compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

const rootReducer = combineReducers({ filter: FiltersReducer })

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, enhancers)
