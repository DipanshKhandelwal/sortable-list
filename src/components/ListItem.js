import React from 'react'
import './App.css'

const ListItem = (props) => {
  return (
    <div
      onDragOver={() => props.onDragOver(props.index)}
      draggable={true}
      onDragStart={e => props.onDragStart(e, props.index)}
      onDragEnd={props.onDragEnd}
      className="element element-main"  
    >
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <p style={{ marginLeft: 5, marginRight: 5 }} >{props.index + 1}.</p>
        <p style={{ marginLeft: 5, marginRight: 5 }} >{props.item.data}</p>
      </div>
      <div style={{ cursor: 'pointer' }} onClick={() => props.removeItem(props.item.data)} >
      <img
        alt="delete"
        style={{
          boxSizing: 'border-box',
          height: 20,
          width: 20,
          padding: 2
        }}
        src={require('../assets/cancel.png')} />
        </div>
    </div>

  )
}

export default ListItem