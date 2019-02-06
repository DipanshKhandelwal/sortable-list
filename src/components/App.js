import React from 'react'
import ListItem from './ListItem'
import DisabledItem from './DisabledItem'
import InputItem from './InputItem'
import { database } from '../firebase/firebaseApp'
import './App.css'

class App extends React.Component {
  state = {
    data: ["one"],
    loading: true,
  }

  updateDatabase = (list) => {
    database.ref().set({ list })
  }

  onDragStart = (e, index) => {
    this.draggedItem = this.state.data[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(e.target, 20, 20);
  }

  onDragOver = index => {
    const draggedOverItem = this.state.data[index];
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    let data = this.state.data.filter(item => item !== this.draggedItem);
    data.splice(index, 0, this.draggedItem);
    this.setState({ data });
    console.log(data);
    this.updateDatabase(data)
  }

  onDragEnd = () => {
    this.draggedIdx = null;
  }

  getList() {
    const { data } = this.state
    let list = []
    for (let i = 0; i < 10; i++) {
      if (i < data.length) list.push({ id: i, type: 'data', data: data[i] })
      else if (i == data.length) list.push({ id: i, type: 'add', data: null })
      else list.push({ id: i, type: 'empty', data: null })
    }
    return list;
  }

  addItem = (item) => {
    console.log(item)
    let newList = this.state.data
    newList.push(item)
    this.updateDatabase(newList)
    this.setState({ data: newList })
  }

  removeItem = (item) => {
    console.log(item)
    let list = this.state.data.filter((data) => item != data)
    this.updateDatabase(list)
    this.setState({ data: list })
  }

  componentDidMount = () => {
    if (database) {
      database.ref(`list`)
        .on("value", snapshot => {
          this.setState({ data: snapshot.val(), loading: false })
        });
    }
  }

  render() {
    return (
      <div className='container' >
        <ul><li>Your favourite list !!</li></ul>
        <div className='list' >
          <p>Select your skillset </p>
          {
            this.state.loading
              ? <div className='loader' />
              :
              <ul
                style={{
                  columnCount: 2,
                  width: '90%',
                  position: 'relative',
                  padding: 0,
                  margin: 0,
                  columnGap: 25
                }}
              >
                {this.getList().map((item, index) => {
                  if (item.type == 'empty') {
                    return (
                      <DisabledItem
                        key={item.id}
                        item={item}
                        index={index}
                        onDragOver={this.onDragOver}
                        onDragStart={this.onDragStart}
                        onDragEnd={this.onDragEnd}
                      />
                    )
                  } else if (item.type == 'add') {
                    return (
                      <InputItem
                        key={item.id}
                        item={item}
                        index={index}
                        onDragOver={this.onDragOver}
                        onDragStart={this.onDragStart}
                        onDragEnd={this.onDragEnd}
                        addItem={this.addItem}
                      />
                    )
                  } else {
                    return (
                      <ListItem
                        key={item.id}
                        item={item}
                        index={index}
                        onDragOver={this.onDragOver}
                        onDragStart={this.onDragStart}
                        onDragEnd={this.onDragEnd}
                        removeItem={this.removeItem}
                      />
                    )
                  }

                })}
              </ul>
          }
        </div>
      </div>
    );
  }
}

export default App
