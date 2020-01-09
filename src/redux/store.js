// Imports

import { createStore, combineReducers, applyMiddleware, compose }   from 'redux'
import thunk        from 'redux-thunk'
import userReducer  from './reducers/userReducer'
import dataReducer  from './reducers/dataReducer'
import uiReducer    from './reducers/uiReducer'



// ---------------------------------------------------------------------------------------------------------

// Variables

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({

    user:   userReducer,
    data:   dataReducer,
    UI:     uiReducer

})

const store = createStore(

    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware) 
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

)



// ---------------------------------------------------------------------------------------------------------

// Exports

export default store