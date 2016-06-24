import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as CommentActions from '../actions/CommentActions';
import CommentBox from './CommentBox';

class Home extends Component {
  render() {
    const {dispatch, comments} = this.props;
    const actions = bindActionCreators(CommentActions, dispatch);
    return (
      <div>
        <CommentBox actions={actions} data={comments} />
      </div>
    );
  }
}
//export default connect(state => state.Comment)(Home)
/*
reducersの書き方で多少の差異はあったが、
下記のような感じで、propsにセットしているものが多い。
*/
//const mapStateToProps = (state) => state.Comment
const mapStateToProps = (state) => {
  return { comments : state.Comment.comments };   // this.props.commentsにセット
}
export default connect(mapStateToProps)(Home)
