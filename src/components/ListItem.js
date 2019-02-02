import React from 'react'

export const ListItem = (props) => {
  return (
    <div style={styles.item} >
      <p>
        {props.name}
      </p>
    </div>
  )
}

const styles = {
  item: {
    display: 'flex',
    flex: 1
  }
}
