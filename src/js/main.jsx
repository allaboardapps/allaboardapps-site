import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({

  render() {
    return (
      <div className="app">
        <h1>All Aboard Apps</h1>
        Randy Burgess, Developer<br/>
        773-551-6808<br/>
        <a href="mailto:randy@allaboardapps.com">randy@allaboardapps.com</a><br/>
        <img className="what" src="apple-icon.png" />
      </div>
    )
  }
});

ReactDOM.render(<App/>, document.querySelector('#main'));
