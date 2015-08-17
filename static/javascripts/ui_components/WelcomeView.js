var WelcomeView = React.createClass({

  render: function() {

    var view;
    var name = this.props.name;

    if (name) {
      view = <h3 className="light white">Welcome {name}</h3>
    } else {
      view = (
        <div style={{marginTop: '20px'}}>
          <p className="light white">Enter your Twitter name and start chatting!</p>
          <div style={{marginTop: '20px'}}>
            <input className="swish-input" style={{width: '350'}} onKeyPress={this.props._onName} placeholder="Enter Twitter ID here" />
            <a className="button bright-blue-hover btn-white" id="try-it-out"> Try it out </a>
          </div>
        </div>
      )
    }


    return (

      <section className="blue-gradient-background intro-splash splash">
          <div className="container center-all-container">
            <h1 className="white light splash-title" style={{fontSize: '36px'}}>
              Realtime Chat Made Easy With Pusher
            </h1>
            {view}
          </div>
      </section>
    )

  }

});