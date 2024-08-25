import {Component} from 'react'
import './Matrix.css'

class Matrix extends Component {
  state = {
    boxColors: Array(9).fill('white'),
    clickOrder: [],
    isSequenceRunning: false,
  }

  changeColorsToOrange = () => {
    const {boxColors, clickOrder} = this.state
    const newBoxColors = [...boxColors]

    clickOrder.forEach((i, idx) => {
      setTimeout(() => {
        newBoxColors[i] = 'orange'
        this.setState({boxColors: [...newBoxColors]})
      }, 300 * idx)
    })
  }

  handleBoxClick = index => {
    const {boxColors, clickOrder, isSequenceRunning} = this.state

    if (boxColors[index] === 'white' && !isSequenceRunning) {
      const newBoxColors = [...boxColors]
      newBoxColors[index] = 'green'
      const newClickOrder = [...clickOrder, index]

      this.setState({
        boxColors: newBoxColors,
        clickOrder: newClickOrder,
      })

      if (newClickOrder.length === 9) {
        this.setState({isSequenceRunning: true}, () => {
          setTimeout(() => {
            this.changeColorsToOrange()
            this.setState({isSequenceRunning: false})
          }, 300)
        })
      }
    }
  }

  render() {
    const {boxColors} = this.state

    return (
      <div className="matrix">
        {boxColors.map((color, index) => {
          const row = Math.floor(index / 3)
          const col = index % 3
          const uniqueKey = `row-${row}-col-${col}`

          return (
            <div
              key={uniqueKey}
              className="box"
              style={{backgroundColor: color}}
              onClick={() => this.handleBoxClick(index)}
              role="button"
              tabIndex={0}
              aria-label={`Box ${index + 1}`}
            />
          )
        })}
      </div>
    )
  }
}

export default Matrix
