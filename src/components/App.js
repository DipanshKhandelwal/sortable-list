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

  addItem = (item) => {
    console.log(item)
    let newList = this.state.data
    newList.push(item)
    this.updateDatabase(newList)
    this.setState({ data: newList })
  }

  removeItem= (item) => {
    console.log(item)
    let list = this.state.data.filter((data) => item != data)
    this.updateDatabase(list)
    this.setState({ data: list })
  }

  componentDidMount = () => {
    if (database) {
      database.ref(`list`)
        .on("value", snapshot => {
          this.setState({ list: snapshot.val(), data: snapshot.val() })
          console.log(snapshot.val())
        });
    }
  }

  render() {
    return (
      <div style={styles.container} >
        <h3>Your favourite list !!</h3>
        <div style={styles.list} >
        <ul style={{ columnCount: 2, flex: 1 }} >
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

const styles = {
  container: {
    backgroundColor: '#d1d1d1',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 10
  },
  list: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
}

export default App
