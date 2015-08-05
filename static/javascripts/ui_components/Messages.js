var Messages = React.createClass({

  render: function() {

    var messageList = this.props.messages.map(function(message){

      return  (
        <li>
          <img src={"https://twitter.com/"+message.name+"/profile_image?size=original"}/>
          <b>{message.name} - {message.time}</b>
          <p>{message.text}</p>
        </li>
      )

    });

    return (
      <ul>
        {messageList}
      </ul>
    );
  }

});