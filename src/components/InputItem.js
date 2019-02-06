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
    if (newValue && newValue !== '') this.props.addItem(newValue.value)
  }

  handleCreate = (newValue) => {
    if (newValue && newValue !== '') this.props.addItem(newValue)
  }

  render() {
    return (
      <div className='element element-select' >
        <AsyncCreatableSelect
          isClearable
          value={this.state.value}
          placeholder={`${this.props.index + 1}. Add Skill`}
          onChange={this.handleChange}
          loadOptions={this.getOptions}
          onCreateOption={this.handleCreate}
          components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}

          menuPortalTarget={document.body}
          menuContainerStyle={{ 'zIndex': 999 }}
          styles={
            {
              container: base => ({
                ...base,
                display: 'blue',
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#b9cbecb7',
              }),
              option: (provided) => ({
                ...provided,
                padding: 20,
              }),
              control: (base) => ({
                ...base,
                display: 'flex',
                flex: 1,
                backgroundColor: '#b9cbecb7',
                padding: 10,
                paddingLeft: 0
              }),
              menuPortal: base => {
                const { zIndex, ...rest } = base
                return { ...rest, zIndex: 999, }
              },
            }
          }

        />
      </div>
    )
  }
}

export default InputItem