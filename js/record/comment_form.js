var _ = require('lodash');
var React = require('react');
var api = require('../api.js');
var Highlight = require('./highlight.js');
var Loading = require('../loading');

function formAclArgument(userFlag, otherFlag) {
    var aclAry = [];
    if (userFlag) { aclAry.push('user'); }
    if (otherFlag) { aclAry.push('other'); }
    return aclAry.join(',');
}

module.exports = React.createClass({
    getInitialState: function() {
        return {
            text: _.result(this.props, 'defaultText', ''),
            mode: 'editing'
        };
    },

    editText: function(e) {
        this.setState({
            text: e.target.value
        })
    },

    onPreview: function() {
        // from commentText to commentHTML
        api.get({
            api: 'comment',
            data: {
                action: 'preview',
                message: this.state.text
            }
        }).done(function(result) {
            if (this.isMounted()) {
                this.setState({
                    mode: 'preview',
                    commentHTML: result
                })
            }
        }.bind(this));

        this.setState({
            mode: 'querying-preview'
        })
    },

    cancelPreview: function() {
        this.setState({
            mode: 'editing'
        });
    },

    submitComment: function() {
        var aclUser = _.has(this.refs, 'aclUser') ?
                      this.refs.aclUser.getDOMNode().checked :
                      true;
        var aclOther = _.has(this.refs, 'aclOther') ?
                       this.refs.aclOther.getDOMNode().checked :
                       false;
        var data = {
            user: [this.props.token],
            report: this.props.report,
            acl:  formAclArgument(aclUser, aclOther),
            message: this.state.text
        }
        if (_.isUndefined(this.props.comment_id)) {
            data.action = 'post';
        } else {
            data.action = 'edit';
            data.id = this.props.comment_id;
        }
        api.post({ api: 'comment', data: data }).done(function() {
            this.props.afterSubmit();
            if (this.isMounted()) {
                this.setState({
                    mode: 'editing',
                    text: ''
                })
            }
        }.bind(this));

        this.setState({
            mode: 'submitting-comment'
        })
    },

    render: function() {
        var comment_area;
        var submitButton;
        var previewButton;
        var disabled = false;
        switch (this.state.mode) {
            case 'querying-preview':
                comment_area = Loading.Icon;
                submitButton = (
                    <button disabled>コメントする</button>
                );
                previewButton = (
                    <button disabled>プレビュー</button>
                );
                disabled = true;
                break;
            case 'preview':
                comment_area = (
                    <Highlight className="preview message">{this.state.commentHTML}</Highlight>
                );
                submitButton = (
                    <button onClick={this.submitComment}>コメントする</button>
                );
                previewButton = (
                    <button onClick={this.cancelPreview}>再編集</button>
                );
                break;
            case 'submitting-comment':
                comment_area = (
                    <textarea rows="6" value={this.state.text} disabled/>
                );
                submitButton = (
                    <button disabled>コメントする</button>
                );
                previewButton = (
                    <button disabled>プレビュー</button>
                );
                disabled = true;
                break;
            default:
                comment_area = (
                    <textarea rows="6" value={this.state.text}
                              onChange={this.editText}/>
                );
                submitButton = (
                    <button onClick={this.submitComment}>コメントする</button>
                );
                previewButton = (
                    <button onClick={this.onPreview}>プレビュー</button>
                );
                break;
        }
        var cancelButton;
        if (_.isFunction(this.props.onCancel)) {
            cancelButton = (
                <button onClick={this.props.onCancel}>キャンセル</button>
            );
        }
        var checkBox;
        if (this.props.admin) {
            checkBox = (
                <span>
                    <label>
                        <input type="checkbox" ref="aclUser" disabled={disabled}
                               defaultChecked={_.result(this.props, 'aclUserFlag', true)}/>
                        提出者に公開
                    </label>
                    <label>
                        <input type="checkbox" ref="aclOther" disabled={disabled}
                               defaultChecked={_.result(this.props, 'aclOtherFlag', false)}/>
                        提出者以外に公開
                    </label>
                </span>
            );
        }
        return (
            <div style={ {display: "inline"} }>
                {comment_area}{submitButton}{previewButton}{cancelButton}{checkBox}
            </div>
        );
    }
});
