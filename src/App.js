import React from 'react';
import axios from 'axios';

const url = 'http://localhost:8080';
const headers = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      phone: '',
      users: []
    }
  }

  onAddUser = () => {
    const { name, age, phone } = this.state;
    const payload = {
      name,
      age,
      phone
    }
    axios.post(`${url}/users`, payload, headers)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  onGetUsers = () => {
    axios.get(`${url}/users`, headers)
    .then(res => {
      this.setState({ users: res.data });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const { users } = this.state
    return (
      <div className="App">
        <input placeholder='Name' onChange={name => this.setState({ name: name.target.value })}></input>
        <input placeholder='Age' onChange={age => this.setState({ age: age.target.value })}></input>
        <input placeholder='Phone' onChange={phone => this.setState({ phone: phone.target.value })}></input>
        <button onClick={this.onAddUser}>Add user</button>
        <button onClick={this.onGetUsers}>Show all users</button>
        { users.map(user => (
          <div>
            <p>{user.name}</p>
          </div>
        ))
        }
      </div>
    );
  }
}

export default App;