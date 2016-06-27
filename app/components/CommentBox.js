import React, {Component} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
  componentDidMount() {
    this.props.actions.searchComments();
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm onCommentSubmit={this.props.actions.addComment} />
      </div>
    );
  }
}

export default CommentBox;