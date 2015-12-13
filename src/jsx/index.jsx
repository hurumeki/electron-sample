import React from 'react';

var View = React.createClass({
  sendMessage(e) {
    if (e.keyCode == 13) {
      this.props.sendMessage(e.target.value);
    }
  },
  render() {
    return (
      <div>
        <input type="text" onKeyDown={ this.sendMessage } />
      </div>
    );
  }
});

export default View;
