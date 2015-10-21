var Chat = React.createClass({

  getInitialState: function() {
    return {
      name: null
    };
  },

  _onClick: function(){
    var input = document.getElementById('input-name');
    var name = input.value;
    this.setState({name: name});
  },

  _onName: function(e){
    if (e.nativeEvent.keyCode != 13) return;
    var name = e.target.value;
    this.setState({name: name});
  },

  render: function() {
    return (
      <div>
        <WelcomeView name={this.state.name} _onClick={this._onClick} _onName={this._onName} />
        <MainView name={this.state.name} />
      </div>
    );
  }

});

React.render(<Chat />, document.getElementById('app'));