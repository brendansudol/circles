import React, { Component } from 'react'
import { getRandomInt, sample } from '../utils'
import { Circles } from './Circles'

const WIDTH = 800
const COLS = 3
const ROWS = 3

const COLORS = [
  ['#ffe54d', '#5ac8e1'],
  ['#fe7615', '#715941'],
  ['#ffb959', '#f25c9a'],
  ['#cde448', '#49dac6'],
  ['#962a9b', '#77e1c2'],
  ['#f1599a', '#e84c45'],
  ['#ee6627', '#5d1993'],
]

const getRandomSeed = () => getRandomInt(0, 1000)

class App extends Component {
  state = { key: Math.random() }

  refresh = () => this.setState({ key: Math.random() })

  render() {
    return (
      <>
        <button className="absolute top-0 right-0 m1" onClick={this.refresh}>
          refresh
        </button>
        <div className="p2 mx-auto" style={{ maxWidth: WIDTH }}>
          <div className="flex flex-wrap">
            {[...Array(COLS * ROWS)].map((_, i) => (
              <div key={i} style={{ width: `${(1 / COLS) * 100}%` }}>
                <Circles colors={sample(COLORS)} seed={getRandomSeed()} size={WIDTH} />
              </div>
            ))}
          </div>
          <div />
        </div>
      </>
    )
  }
}

export default App
