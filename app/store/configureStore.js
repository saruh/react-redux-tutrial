// 参考
//  https://hogehuga.com/post-1123/
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from '../reducers/index';

// createStore時に、Middlewareが実装されるように拡張
// ここでは、非同期処理機能のthunkMiddlewareを指定
let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
// reducerをまとめる
const rootReducer = combineReducers(reducers);

// middlewareを搭載し、
// 初期stateパラメータを反映した
// storeを作成
export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}