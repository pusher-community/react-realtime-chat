var Messages = React.createClass({

  render: function() {

    var messageList = this.props.messages.map(function(message){
      var text = message.text;

      var emojiMatches = text.match(/[^\u0000-\u007F]+/);

      if (emojiMatches) {
        $.each(emojiMatches, function(index, match){
          text = text.replace(/[^\u0000-\u007F]+/, "<span class='emoji'>"+match+"</span>");
        });
      }


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
            <p className="message-body" dangerouslySetInnerHTML={{__html: text}}>
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