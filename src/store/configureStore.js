import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
import { createLogger } from "redux-logger/src";

/*const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    return {
        ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run(rootSaga)
    }
};

export default configureStore;
*/

const logger = createLogger({
    collapsed: true
});

const configureStore = initialState => {
    const sagaMiddleware = createSagaMiddleware();

    const getMiddleWare = () => {
        if (process.env.NODE_ENV === "development") {
            return applyMiddleware(sagaMiddleware, logger);
        }
        return applyMiddleware(sagaMiddleware);
    };

    const store = createStore(rootReducer, initialState, getMiddleWare());

    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;
