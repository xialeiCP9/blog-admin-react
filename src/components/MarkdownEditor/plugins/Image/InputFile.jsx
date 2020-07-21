import React from 'react'

class InputFile extends React.Component {
  constructor (props) {
    super(props)
    this.input = React.createRef()
  }
  click () {
    this.input.current.click()
  }
  render () {
    return (
      <input
        type="file"
        accept="image/*"
        id="file"
        name="file"
        ref={this.input}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          width: 0,
          height: 0,
          opacity: 0,
          zIndex: -1
        }}
        onChange={this.props.onChange}
      />
    )
  }
}

export default InputFile
