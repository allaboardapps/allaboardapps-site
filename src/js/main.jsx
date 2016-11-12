import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({

  render() {
    return (
      <div className="app">
        <img className="company-logo" src="all-aboard-apps-logo.png" alt="All Aboard Apps, LLC" />
        <div className="contact-info">
          Randy Burgess, Developer<br/>
          773-551-6808<br/>
          <a href="mailto:randy@allaboardapps.com">randy@allaboardapps.com</a><br/>
        </div>
        <footer>
          &copy; All Aboard Apps, LLC. All rights reserved.
        </footer>
      </div>
    )
  }
});

ReactDOM.render(<App/>, document.querySelector('#main'));
