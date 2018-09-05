import React, { Component } from 'react';

class InputFields extends Component {
  constructor() {
    super();
    this.state = {
      dogName: '',
      address: '',
      walkTime: '',
      walkFrame: '',
    };

    this.dogNameChange = this.dogNameChange.bind(this);
    this.addressChange = this.addressChange.bind(this);
    this.walkFrameChange = this.walkFrameChange.bind(this);
    this.walkTimeChange = this.walkTimeChange.bind(this);
  }

  dogNameChange(e) {}

  addressChange(e) {}

  walkTimeChange(e) {}

  walkFrameChange(e) {}

  render() {
    return (
      <div>
        <form>
          <input type="text" />
          <input type="text" />
        </form>
      </div>
    );
  }
}

export default InputFields;
