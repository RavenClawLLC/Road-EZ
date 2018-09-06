import React, { Component } from 'react';
import InputFields from './InputFields.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }


}

  render() {
    return (
      <div>
        <p>Hello Worlds</p>
        <InputFields  passCallback={passCallback}/>
      </div>
    );
  }
}

export default App;
