var MainView = React.createClass({

  getInitialState: function() {
    return {
      messages: [] 
    };
  },

  componentWillMount: function() {

    this.pusher = new Pusher('faa685e4bb3003eb825c');
    this.chatRoom = this.pusher.subscribe('messages');

  },

  componentDidMount: function() {

    this.chatRoom.bind('new_message', function(message){
      this.setState({messages: this.state.messages.concat(message)})
    }, this);

  },

  _onMessage: function(e){
    if (e.nativeEvent.keyCode != 13) return;

    var input = e.target;
    var text = input.value;

    if (text === "") return;

    var message = {
      name: this.props.name,
      text: text,
      time: new Date()
    }

    $.post('/messages', message).success(function(){
      input.value = ""
    });

  },

  render: function() {

    if (!this.props.name) var style = {display:'none'}

    return (
      <div style={style}>
        <Messages messages={this.state.messages}  />
        <input placeholder="Type your message" onKeyPress={this._onMessage} />
      </div>
    );
  }

});