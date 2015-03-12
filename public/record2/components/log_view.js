
var Log = React.createClass({
    render: function() {
        var defs = [
            { prop: 'timestamp',
              label: 'ステータス更新日時'
            },
            { prop: 'submit',
              label: '提出日時'
            },
            { prop: 'initial_submit',
              label: '初回提出'
            }
        ];
        var rawData = this.props.data;
        var data = defs.map(
            function (def) {
                return (
                        <div>
                        <dt class={def.prop}>{def.label}</dt>
                        <dd class={def.prop}>{rawData[def.prop]}</dd>
                        </div>
                );
            });
        return (<div> {data} </div>);
    }
});

var LogMessages = React.createClass({
    render: function (){
        var id = function (x){return x;};
        var defs = [
            // {message: "...", reason: ""}
            { prop: 'message',
              label:'メッセージ',
              proc: id },
            { prop: 'error',
              label: 'エラー',
              proc: id},
            { prop: 'reason',
              label: 'エラーの詳細',
              proc: id },
            // {build: 'OK'}
            { prop: 'build',
              label: 'build',
              proc: id },
            // {test: {passed: 0, number: 0}}
            { prop: 'test',
              label: 'テスト通過率',
              proc: function(l){
                  return (l.passed +'/'+ l.number);}
            }
        ];
        var rawLog = this.props.log;
        if (rawLog == undefined){
            var message = (<div></div>);
        } else {
        var messages = defs.map(
            function (def){
                if (rawLog[def.prop] == undefined) {
                    return (<div></div>);
                } else {
                    return (
                            <div className={def.prop}>
                            <dt class={def.prop}>{def.label}</dt>
                            <dd class={def.prop}>{def.proc(rawLog[def.prop])}</dd>
                            </div>
                    );
                };
            });
        };
        return (<div>{messages}</div>);
    }
});

var LogEdit = React.createClass ({
    getInitialState: function (){
        return {
            message:  this.props.data.message,
            error:  this.props.data.error,
            reason: this.props.data.reason
        };
    },

    handleSubmit: function (e){
        $.post('../api/admin_log.cgi',
               { report: this.props.rep,
                 user: this.props.token,
                 id: this.props.id,
                 message: this.state.message,
                 error: this.state.error ,
                 reason: this.state.reason },
               function (d) {return;},
               function(xhr, status, err) {
                   console.error(status, err.toString());
               }.bind(this));
        this.props.exit();
        return;
    },

    handleChangeM: function (e) {
        this.setState({message: e.target.value});
    },
    handleChangeE: function (e) {
        this.setState({error: e.target.value});
    },
    handleChangeR: function (e) {
        this.setState({reason: e.target.value});
    },
    
    render: function (){
        var defs = [
            // {build: 'OK'}
            { prop: 'build',
              label: 'build',
              proc: function(x){return x;}
            },
            // {test: {passed: 0, number: 0}}
            { prop: 'test',
              label: 'テスト通過率',
              proc: function(l){
                  return (l.passed +'/'+ l.number);}
            }];
        var rawLog = this.props.data;
        if (rawLog == undefined) {
            var test = (<div></div>);
        } else {
            var test = defs.map(
                function (def) {
                    if (rawLog[def.prop] == undefined ) {
                         return (<div></div>);
                    } else {
                        return (
                                <div>
                                <dt class={def.prop}>{def.label}</dt>
                                <dd class={def.prop}>{def.proc(rawLog[def.prop])}</dd>
                                </div>);
                    };
                });
        };
        return (
                <div className="form">
                <dt class="message">メッセージ</dt>
                <dd class="message">
                <textarea rows="2" cols="80" onChange={this.handleChangeM} defaultValue={this.props.data.message} />
                </dd>
                <dt class="error">エラー</dt>
                <dd class="error">
                <textarea rows="2" cols="80" onChange={this.handleChangeE} defaultValue={this.props.data.error} />
                </dd>
                <dt class="reason">エラーの詳細</dt>
                <dd class="reason">
                <textarea rows="2" cols="80" onChange={this.handleChangeR} defaultValue={this.props.data.reason} />
                </dd>
                {test}
                <input type="submit" onClick={this.handleSubmit} value="変更" />
                <input type="button" onClick={this.props.exit} value="キャンセル" />
                </div>
        );
    }
});

var LogView = React.createClass({
    getInitialState: function(){
        return {
            data: {},
            onEdit: false
        };
    },

    componentDidMount: function () {
        $.get('../api/user.cgi',
              {
                  user: this.props.token,
                  type: 'status',
                  status: 'record',
                  log : true,
                  report: this.props.report
              },
              function(result) {
                  this.setState({
                      data: (result[0].report[this.props.report])
                  });
              }.bind(this));
    },

    onEdit: function () {
        this.setState(
            {onEdit: true});
    },
    exit: function () {    
        this.setState(
            {onEdit: !this.state.onEdit}
        );
        $.get('../api/user.cgi',
              {
                  user: this.props.token,
                  type: 'status',
                  status: 'record',
                  log : true,
                  report: this.props.report
              },
              function(result) {
                  this.setState({
                      data: (result[0].report[this.props.report])
                  });
              }.bind(this));

    },
    
    toolBar: function () {
//        if (!this.props.admin) { return (<div></div>);}
        if (this.state.onEdit) {
            return (
                    <ul className="status_toolbar">
                    <li className="toolbutton"><a onClick={this.click}>編集中</a></li>
                    </ul>
            );
        } else {
            return (
                    <ul className="status_toolbar">
                    <li className="toolbutton"><a onClick={this.onEdit}>✏ 編集</a></li>
                    </ul>
            );
        };
    },
    
    render: function() {
        var status = {status:'check',
                timestamp:'2015-02-20T17:16:50+09:00',
                submit:'2015-02-20T17:16:50+09:00',
                initial_submit:'2015-02-20T17:16:50+09:00',
                log:{build:'OK'},
                unsolved:[],
                      optional:['hoge']};
        var status2 = this.state.data; 
        if (this.state.onEdit) {
            var logedit = (<LogEdit id={this.state.data.submit} rep={this.props.report} data={this.state.data.log} token={this.props.token} exit={this.exit}/>);
        } else { var logedit = (<LogMessages log={this.state.data.log}/>); };
        return (
                <div className="status_window">
                <StatusHeader tabName="log" toolBar={this.toolBar} />
                <div id={"summury-"+this.props.report+"_status_view"} className="status_view">
                <dl class="log_msg">
                <Log data={status} />
                {logedit}
                </dl>
                </div>
                </div>
        );
    }
});
