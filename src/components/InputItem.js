import React from 'react'
import './App.css'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'

class InputItem extends React.Component {

  state = {
    list: [],
    value: null
  }

  getOptions = (input, callback) => {
    fetch(`https://api.stackexchange.com/2.2/tags?order=asc&sort=popular&inname=${input}&site=stackoverflow`)
      .then(response => response.json())
      .then(data => {
        let a = []
        data.items.map((item, index) => a.push({ label: item.name, value: item.name }))
        this.setState({ list: a })
        console.log(a)
        callback(a)
      });
  }

  handleChange = (newValue) => {
    this.props.addItem(newValue.value)
  }

  handleCreate = (newValue) => {
    this.props.addItem(newValue)
  }

  render() {
    return (
      <div style={{ userSelect: 'none', width: '200px' }} >
        <AsyncCreatableSelect
          isClearable
          value={this.state.value}
          placeholder={`${this.props.index + 1}. Add Skill`}
          onChange={this.handleChange}
          loadOptions={this.getOptions}
          onCreateOption={this.handleCreate}
          components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
        />
      </div>
    )
  }
}

export default InputItem