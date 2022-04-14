import React, { Component } from 'react'
import { ReactSVG } from 'react-svg'
import logo from './logo.svg'
import network from './network.svg'
const brain = require('brain.js')

export default class NeuralNetwork extends Component {
  state={
    showNeuralNetwork: false,
  }
  constructor(props) {
    super(props)
    this.neuralNetwork = new brain.NeuralNetwork()
    this.neuralNetwork.train([
      {input: [0,0], output: [0]},
      {input: [0,1], output: [1]},
      {input: [1,0], output: [1]},
      {input: [1,1], output: [0]}
    ])
  }
  render() {
    return (
      <div>
          <button onClick={()=>{
            console.log(brain.utilities.toSVG(this.neuralNetwork))
            
            this.setState({
              showNeuralNetwork: !this.state.showNeuralNetwork
            })
          }}>
            {this.state.showNeuralNetwork ? 'Hide Neural Network' : 'Show Neural Network'}
          </button>
          {this.state.showNeuralNetwork?
          <div>
            <ReactSVG src={network}/>
          </div>:null}
      </div>
    )
  }
}
