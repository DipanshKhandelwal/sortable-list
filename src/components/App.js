import React, { Component } from 'react'
import { ListItem } from './ListItem'
import { database } from '../firebase/firebaseApp'

class App extends React.Component {
  state = {
    data: [],
    query: ''
  }

  onDragStart = (e, index) => {
    this.draggedItem = this.state.data[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }

  onDragOver = index => {
    const draggedOverItem = this.state.data[index];
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    let data = this.state.data.filter(item => item !== this.draggedItem);
    data.splice(index, 0, this.draggedItem);
    this.setState({ data });
  }

  onDragEnd = () => {
    this.draggedIdx = null;
  }

  render() {
    return (
      <div >
        <h3>Your favourite list !!</h3>
        <div>
        <ul>
          {this.state.data.map((item, idx) => (
            <span key={item} onDragOver={() => this.onDragOver(idx)}>
              <div
                className="drag"
                draggable
                onDragStart={e => this.onDragStart(e, idx)}
                onDragEnd={this.onDragEnd}
              >
                <ListItem name={item} />
              </div>
            </span>
          ))}
        </ul>
        </div>
      </div>
    );
  }
}

export default App
