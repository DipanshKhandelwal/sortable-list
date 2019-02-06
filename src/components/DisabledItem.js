import React from 'react'
import './App.css'

const DisabledItem = (props) => {
  return (
    <div className="element element-disabled" >
      <p style={{ marginLeft: 5, marginRight: 5 }} >{props.index + 1}. Add Skill</p>
    </div>
  )
}

export default DisabledItem