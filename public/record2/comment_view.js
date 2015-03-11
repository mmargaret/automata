var sum_rep = "summary-report2";
var test_data = [
    {
        id: 1,
        user: 'Yuki Nishida',
        acl: ['user'],
        create: '2015-03-09T18:12:04+09:00',
        timestamp: '2015-03-09T18:12:04+09:00',
        content: '<p>hogehoge</p>'
    },
    {
        id: 2,
        user: 'Yuki Nishida',
        acl: ['user'],
        create: '2015-03-09T18:12:04+09:00',
        timestamp: '2015-03-09T18:12:04+09:00',
        content: '<p>fuga</p>'
    }
];

var Comment = React.createClass({
    render: function() {
        return (
                <li id={sum_rep + "-comment" + this.props.comment.id}>
                <div className="meta">
                <p className="author">{this.props.comment.user}</p>
                <p className="edit">
                <a title="編集する">✏</a>
                <a title="削除する">✖</a>
                </p>
                <p className="acl">提出者に公開</p>
                <p className="date">{this.props.comment.timestamp}</p>
                </div>
                <div className="message">{this.props.comment.content}</div>
                </li>
        );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
                <div className="form">
                <textarea rows="6"/>
                <input type="submit" value="コメントする"/>
                <input type="button" value="プレビュー"/>
                <input id="summary-report2_comment_acl_user" type="checkbox" name="user"/>
                <label htmlFor="summary-report2_comment_acl_user">提出者に公開</label>
                <input id="summary-report2_comment_acl_other" type="checkbox" name="other"/>
                <label htmlFor="summary-report2_comment_acl_other">提出者以外に公開</label>
                </div>
        );
    }
});

var CommentView = React.createClass({
    getInitialState: function() {
        return {
            comments: []
        };
    },

    componentDidMount: function() {
        $.get('../api/comment.cgi',
              {
                  user: 'id2d7b99ddce72d3c723f121df99144072',
                  report: 'report_8_88',
                  action: 'get',
              },
              function(result) {
                  this.setState({
                      comments: result
                  });
              }.bind(this));
    },

    render: function() {
        var comments = this.state.comments.map(function(comment) {
            return (
                    <Comment comment={comment}/>
            );
        });
        return (
                <div className="status_view">
                <ul className="comments">
                {comments}
                <li><CommentForm/></li>
                </ul>
                </div>
        );
    }
});
