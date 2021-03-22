import { createStore } from 'redux';
import rootReducer from './reducers/index.js';

const configureStore = () => {
    return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
};

export default configureStore;