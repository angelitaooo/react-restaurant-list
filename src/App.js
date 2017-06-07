import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {
  // Initial State
  state ={
    items: JSON.parse(localStorage.getItem('items')) || [],
    inputText: ''
  }

  updateValue(e) {
    this.setState({
      inputText: e.target.value
    });
  }

  updateLocalStorage() {
    localStorage.setItem('items', JSON.stringify(this.state.items));
  }

  updateCheckbox(index) {
    const modifiedItems = this.state.items.map((item, i) => {
      if (i === index) {
        return {
          text: item.text,
          done: !item.done
        }
      }

      return item;
    });

    this.setState({
      items: modifiedItems
    });
  }

  deleteItems() {
    this.setState({
      items: []
    });
  }

  uncheckItems() {
    const uncheckedItems = this.state.items.map(item =>{
      return {
        text: item.text,
        done: false
      };
    });

    this.setState({
      items: uncheckedItems
    });
  }

  checkAllItems() {
    const checkedItems = this.state.items.map(item =>{
      return {
        text: item.text,
        done: true
      };
    });

    this.setState({
      items: checkedItems
    });
  }

  addItem(e) {
    e.preventDefault();

    const text = this.state.inputText;
    const item = {
      text: text,
      done: false    
    };

    // Create a new array of items
    // this.state.items.concat(item);
    const newItems = [
      ...this.state.items,
      item
    ];
    // Update the state with the new item and reset the input
    this.setState({
      items: newItems,
      inputText: ''
    });

    // Update localStorage
    // localStorage.setItem('items', JSON.stringify(this.state.items));
  }
  render() {
    this.updateLocalStorage();
    return (
      <div> 
        <div className="wrapper">
          <h2>LOCAL TAPAS</h2>
          <p></p>
          <ul className="plates">
            {
              this.state.items.length === 0 &&
              <li>Loading Tapas...</li>
            }
            {
              this.state.items.length > 0 &&
              this.state.items.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => this.updateCheckbox(index)}
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      readOnly
                    />
                    <label>
                      {item.text}
                    </label>
                  </li>
                )
              })
            }
          </ul>
          <form className="add-items">
            <input
              type="text"
              name="item"
              placeholder="Item Name"
              required
              value={this.state.inputText}
              onChange={this.updateValue.bind(this)}
            />
            <input
              type="submit"
              value="+ Add Item"
              disabled={this.state.inputText === ''}
              onClick={this.addItem.bind(this)}
            />
          </form>
          <div className="button-wrapper">
            <button onClick={this.deleteItems.bind(this)}>
              Delete all
            </button>
            <button onClick={this.uncheckItems.bind(this)}>
              Uncheck all
            </button>
            <button onClick={this.checkAllItems.bind(this)}>
              Check all
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
