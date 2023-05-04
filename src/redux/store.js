import { repoReducer } from "./reducers";
import {combineReducers, createStore} from "redux"

const rootReducer = combineReducers({
    repo:repoReducer
})

export const store = createStore(rootReducer)

