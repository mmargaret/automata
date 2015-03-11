var user = 'id2d7b99ddce72d3c723f121df99144072';
var rep = 'report_8_88';

var data =[
    { login: 'kobayashi',
      token: 'id2d7b99ddce72d3c723f121df99144072',
      name: '小林 恵',
      ruby: 'こばやし めぐみ',
      report: {report_8_88:
               {status:'check',
                timestamp:'2015-02-20T17:16:50+09:00',
                submit:'2015-02-20T17:16:50+09:00',
                initial_submit:'2015-02-20T17:16:50+09:00',
                log:{build:'OK'},
                unsolved:[],
                optional:['hoge']}
              }
    }];

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
            },
            { prop: 'log',
              label:'build'}
        ];
        var raw_logs = this.props.data;
        var logs = defs.map(
            function (def) {
                return (
                        <div>
                        <dt class={def.prop}>{def.label}</dt>
                        <dd class={def.prop}>{raw_logs[def.prop]}</dd>
                        </div>
                );
            });
        return (<div> {logs} </div>);
    }
});

var LogView = React.createClass({
    getInitialState: function(){
        return {
            log: {}
        };
    },

    componentDidMount: function () {
        $.get('../api/user.cgi',
              {
                  user: user,
                  type: 'status',
                  status: 'record',
                  log : true,
                  report: rep
              },
              function(result) {
                  this.setState({
                      log: (result[0].report['report_8_88'])
                  });
              }.bind(this));
    },
    
    render: function() {
        var status = this.state.log;
        return (
                <div id={"summury-"+rep+"_status_view"} className="status_view">
                <dl class="log_msg">
                <Log data={status}/>
                </dl>
                </div>
        );
    }
});
