import React, {Component} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
// app/actions/CommentActions.jsで重複して宣言しているのでおそらく別セッションになってしまう。
// middlewareとして登録するのが良さそう。
// http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#setting-up-the-socket-io-client
// http://spraso.com/real-time-data-flow-with-redux-and-socket-io/
// モジュール化したもの(redux-socket.io)もあるようだが、たぶん自分で実装した方が良い。
import io from 'socket.io-client';
export const socket = io('http://localhost:3000');

class CommentBox extends Component {
  componentWillMount() {
    const {actions} = this.props;
    socket.on('recieve comments', function(comments) {
      console.log('[components][socket.id]', socket.id);
      actions.recieveComments(comments);
    });
  }

  componentDidMount() {
    this.props.actions.searchComments();
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm onCommentSubmit={this.props.actions.createComment} />
      </div>
    );
  }
}

export default CommentBox;