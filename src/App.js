import React, { Component } from "react";
import del from "./assets/images/thrash.png";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  componentDidMount() {
    this.refreshStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  refreshStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      console.log("key in saveToLocalStorage is " + key);
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    // console.log("initial newItem value is " + this.state.newItem);
    this.setState({ [key]: value });
  }

  addItem() {
    console.log("newItem in state is " + this.state.newItem);
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };
    //  console.log("new Item after slice-> " + this.state.newItem.slice());
    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
  }
  itemUpdate(value, id) {
    //console.log("itemUpdate called with the id in argument = " + id);
    const list = [...this.state.list];
    /* for (let key in list) {
      console.log("key is " + key);
      if (key.id === id) {
        console.log("IDs match and the key's id is " + key.id);
        key.value = value;
      }
    }*/
    for (let i = 0; i < list.length; i++) {
      //console.log("id in loop is " + list[i].id);
      if (list[i].id === id) {
        //console.log("IDS match ");
        list[i].value = value;
      }
    }
    this.setState({
      list,
      newItem: ""
    });
  }
  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }

  render() {
    //...all the same
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Notes</h1>
        </header>
        <div
          style={{
            padding: 50,
            textAlign: "left",
            maxWidth: 400,
            margin: "auto"
          }}
        >
          Add an item to the list
          <br />
          <input
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
            &#43; Add
          </button>
          <br /> <br />
          <div>
            <ul>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    <input
                      type="text"
                      className="text"
                      value={item.value}
                      onChange={e => this.itemUpdate(e.target.value, item.id)}
                    />
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <div style={{ flex: "1" }} />
                      <img
                        className="iClass"
                        src={del}
                        alt="del"
                        onClick={() => this.deleteItem(item.id)}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
