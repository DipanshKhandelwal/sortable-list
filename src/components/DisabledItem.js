import React from 'react'
import './App.css'

const DisabledItem = (props) => {
  return (
    <div
      style={{
        userSelect: 'none',
        backgroundColor: 'rgb(217, 221, 230)',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '10px',
        fontSize: '17',
        fontWeight: '400',
        color: '#273339',
      }} >
      <p>{props.index + 1}. Add Skill</p>
    </div>
  )
}

const styles = {
  item: {
    display: 'flex',
    flex: 1
  }
}

export default DisabledItem