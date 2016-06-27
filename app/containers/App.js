import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Home from '../components/Home';
import startChat from '../chat';

// reducers で宣言した全ての state を管理する store を作成
const store = configureStore();

// Socket.ioで通信を開始
startChat(store);

export default React.createClass({
  render() {
    return (
      <div>
        <Provider store={store}>
          <Home />
        </Provider>
      </div>
    );
  }
});