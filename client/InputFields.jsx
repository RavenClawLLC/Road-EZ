import axios from 'axios';
import React, { Component } from 'react';

class InputFields extends Component {
  constructor() {
    super();
    this.state = {
      dogName: '',
      address: '',
      walkTime: '',
      walkFrame: '',
      myDogs: []
    };
    //
    // this.dogNameChange = this.dogNameChange.bind(this);
    // this.addressChange = this.addressChange.bind(this);
    // this.walkFrameChange = this.walkFrameChange.bind(this);
    // this.walkTimeChange = this.walkTimeChange.bind(this);
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.getStartState = this.getStartState.bind(this);
  }

  getStartState() {
    return {
      dogName: '',
      address: '',
      walkTime: '',
      walkFrame: '',
      myDogs: []
    };
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);    
    axios({
      method: 'put',
      url: '/newDog',
      data: this.state
    }).then((response) => {
      const newState = this.getStartState();
      newState.myDogs = response.data;
      this.setState(newState);
    });
  }


  render() {
    const dogList = [];
    this.state.myDogs.forEach(dog => {
      dogList.push(<li>{dog.name},{dog.address},{dog.earliest_walk_time}</li>);
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Dog:
            <input
              name="dogName"
              type="text"
              value={this.state.dogName}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Address:
            <input
              name="address"
              type="text"
              value={this.state.addressChange}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Walk Time:
            <select
              name="walkTime"
              value={this.state.walkTime}
              onChange={this.handleInputChange}>
                <option value="9AM-11AM">9AM-11AM</option>
                <option value="11AM-1PM">11AM-1PM</option>
                <option value="1PM-3PM">1PM-3PM</option>
                <option value="3PM-5PM">3PM-5PM</option>
            </select>
          </label>
          <br />
          <input
            name="addToSch"
            type="submit"
            value ="Add to Schedule" />
          <input
            name="addNewDog"
            type="submit"
            value="Add New Dog" />
        </form>
        <ul>
        {dogList}  
        </ul>
      </div>
    );
  }
}

export default InputFields;
