import React from 'react'
import './App.css'

const ListItem = (props) => {
  return (
    <div
      onDragOver={() => props.onDragOver(props.index)}
      draggable={true}
      onDragStart={e => props.onDragStart(e, props.index)}
      onDragEnd={props.onDragEnd}
      style={{
        cursor: 'ns-resize',
        backgroundColor: '#eeeeee',
        userSelect: 'auto',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '10px'
      }} >
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <p>{props.index + 1}.</p>
        <p>{props.item.data}</p>
      </div>
      <div style={{ cursor: 'pointer' }} onClick={() => props.removeItem(props.item.data)} >
      <img
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