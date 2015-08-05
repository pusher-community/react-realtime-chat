var WelcomeView = React.createClass({

  render: function() {

    var view;
    var name = this.props.name;

    if (name) {
      view = <h1>Welcome {name}</h1>
    } else {
      view = <input onKeyPress={this.props._onName} placeholder="Please enter your Twitter username" />
    }

    return view;
  }

});