var MainView = React.createClass({

  getInitialState: function() {

    var messages = ['Hi there!', 'Welcome to your chat app', 'See the tutorial at http://blog.pusher.com/react-chat'];
    messages = messages.map(function(msg){
      return {
        name: 'pusher',
        time: new Date(),
        text: msg
      }
    });

    return {
      messages: messages
    };
  },

  componentWillMount: function() {

    this.pusher = new Pusher('faa685e4bb3003eb825c');
    this.chatRoom = this.pusher.subscribe('messages');

  },

  componentDidMount: function() {

    this.chatRoom.bind('new_message', function(message){
      this.setState({messages: this.state.messages.concat(message)})

      $("#message-list").scrollTop($("#message-list")[0].scrollHeight);

    }, this);

  },

  _onMessage: function(e){
    if (e.nativeEvent.keyCode != 13) return;
    e.preventDefault();
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


    var body = (
      <div className="light-grey-blue-background chat-app">
        <Messages messages={this.state.messages}  />

        <div className="action-bar">
          <div className="option more col-xs-1 white-background">+</div>
          <textarea className="input-message col-xs-9" placeholder="Your message" onKeyPress={this._onMessage}></textarea>
          <div className="option col-xs-1 white-background">
            <span className="fa fa-smile-o light-grey"></span>
          </div>
          <div className="option col-xs-1 green-background send-message">
            <span className="white light fa fa-paper-plane-o"></span>
          </div>
        </div>
      </div>
    );

    return (
      <div style={style} className="text-center">
        <div className="marvel-device iphone6 silver">
            <div className="top-bar"></div>
            <div className="sleep"></div>
            <div className="volume"></div>
            <div className="camera"></div>
            <div className="sensor"></div>
            <div className="speaker"></div>
            <div className="screen">
                {body}
            </div>
            <div className="home"></div>
            <div className="bottom-bar"></div>
        </div>
      </div>

    );
  }

});