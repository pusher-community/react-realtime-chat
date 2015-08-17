var Messages = React.createClass({

  render: function() {

    var messageList = this.props.messages.map(function(message){
      console.log(message);
      return  (
        <div className="message">
          <div className="avatar">
            <img src={"https://twitter.com/"+message.name+"/profile_image?size=original"} />
          </div>
          <div className="text-display">
            <div className="message-data">
              <span className="author">{message.name}</span>
              <span className="timestamp">{strftime('%H:%M:%S %P', new Date(message.time))}</span>
              <span className="seen"></span>
            </div>
            <p className="message-body">
              {message.text}
            </p>
          </div>
        </div>

      )

    });

    return (
      <div id="message-list">
        <div className="time-divide">
          <span className="date">
            Today
          </span>
        </div>
      {messageList}
      </div>
    );
  }

});