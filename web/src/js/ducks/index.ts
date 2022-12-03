import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    compose,
    createStore as createReduxStore,
    PreloadedState,
    Store
} from "redux"
import eventLog from "./eventLog"
import flows from "./flows"
import ui from "./ui/index"
import connection from "./connection"
import options from './options'
import commandBar from "./commandBar";
import splitView from "./splitView";
import thunk, {ThunkAction, ThunkDispatch, ThunkMiddleware} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import backendState from "./backendState";
import options_meta from "./options_meta";


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducer = combineReducers({
    splitView,
    commandBar,
    eventLog,
    flows,
    connection,
    ui,
    options,
    options_meta,
    backendState,
});
export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    AnyAction>

interface AppStore {
    store: Store<RootState>;
    persistor: Persistor;
}

export const createAppStore = (preloadedState?: PreloadedState<RootState>): AppStore => {
    const store = createReduxStore(
        persistedReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(
            thunk as ThunkMiddleware<RootState>
        )))
    const persistor = persistStore(store);

    return { store, persistor };
};

const appStore = createAppStore(undefined);
export const store = appStore.store;
export const persistor = appStore.persistor;

// this would be correct, but PyCharm bails on it
// export type AppDispatch = typeof store.dispatch
// instead:
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
