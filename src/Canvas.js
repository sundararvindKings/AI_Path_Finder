import React, { Component } from 'react'
import Training from './Training'
const ORIGIN_COLOR= '#db0948'
const DESTINATION_COLOR= '#00b0ff'
const OBSTACLE_COLOR= '#ff00ff'
const MAX_OBSTACLES= 10
const MOVING_DIST = 20
const PROXIMITY_DIST = 40
const TRAINING_COUNT = 200

const brain = require('brain.js')
export default class Canvas extends Component {
    state={
        setDestination: false,
        setOrigin: false,
        origin: null,
        destination: null,
        obstacles: [],
        setObstacles: false,
        currentPosition: null,
        path: [],
    }
    constructor(props){
      super(props)
      let training_data =  []
      for(let i = 0; i < TRAINING_COUNT; i++){
        const input = Training.generateRandom()
        console.log(input)
        //const output = this.findTrainingPath(input.start, input.end)
        //training_data.push({input: input, output: output})
      }
      this.training_data = training_data
     // this.neural = new brain.NeuralNetwork()
      //this.neural.train(training_data)
    }
    componentDidMount(){
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const width = canvas.width
        const height = canvas.height
        ctx.fillStyle='black'
        ctx.fillRect(0,0,width,height)
    }
    draw(startx, startY, color){
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        ctx.fillStyle=color
        ctx.fillRect(startx,startY,20, 30)
    }
    drawPath(startx, startY){
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      ctx.fillStyle='orchid'
      ctx.fillRect(startx,startY,10, 10)
    }
    clearOldNode(x, y){
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        ctx.fillStyle='black'
        ctx.fillRect(x,y,20, 30)
    }
    findPath(){
      //without obstacles first
      let path = []
      let current = this.state.currentPosition
      while(!this.hasReachedLocation(current, this.state.destination)){
        const neighbors = this.getNeighbors(current)
        const bestNeighbor = this.findBestNeighbor(neighbors)
        current = bestNeighbor 
        path.push(bestNeighbor)
        this.drawPath(bestNeighbor.x, bestNeighbor.y)
        this.setState({currentPosition: bestNeighbor})
      }
      console.log(path)
    }
    findTrainingPath(start, destination){
      //without obstacles first
      let path = []
      let current = start
      while(!this.hasReachedLocation(current, destination)){
        const neighbors = this.getNeighbors(current)
        const bestNeighbor = this.findBestNeighborTraining(neighbors)
        current = bestNeighbor 
        path.push(bestNeighbor)
      }
      return path
    }
    hasReachedLocation(current, location){
      return this.getDistance(current, location) <= PROXIMITY_DIST
    }
    getNeighbors(current){
      const n1 = {x: current.x+MOVING_DIST, y: current.y}
      const n2 = {x: current.x-MOVING_DIST, y: current.y}
      const n3 = {x: current.x, y: current.y+MOVING_DIST}
      const n4 = {x: current.x, y: current.y-MOVING_DIST}
      return [n1, n2, n3, n4]
    }
    findBestNeighbor(neighbors){
        let bestNeighbor = null
        let bestNeighborDistance = Infinity
        neighbors.forEach(neighbor=>{
            const distance = this.getDistance(neighbor, this.state.destination)
            if(distance < bestNeighborDistance){
                bestNeighbor = neighbor
                bestNeighborDistance = distance
            }
        })
        return bestNeighbor
    }
    findBestNeighborTraining(neighbors, destination){
        let bestNeighbor = null
        let bestNeighborDistance = Infinity
        neighbors.forEach(neighbor=>{
            const distance = this.getDistance(neighbor, destination)
            if(distance < bestNeighborDistance){
                bestNeighbor = neighbor
                bestNeighborDistance = distance
            }
        })
        return bestNeighbor
    }
    getDistance(node1, node2){
        return Math.sqrt(Math.pow(node1.x-node2.x, 2) + Math.pow(node1.y-node2.y, 2))
    }
    

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <button disabled={this.state.setOrigin} onClick={()=>{
            this.setState({
              setOrigin: true,
              setDestination: false,
              setObstacles: false,
            })
          }}>Change Origin</button>
          <button disabled={this.state.setDestination} onClick={()=>{
            this.setState({
              setDestination: true,
                setOrigin: false,
                setObstacles: false,
            })
          }}>Change Destination</button>
          <button disabled={this.state.setObstacles || !this.state.obstacles.length===MAX_OBSTACLES-1} onClick={()=>{
            this.setState({
              setObstacles: true,
              setDestination: false,
              setOrigin: false,
            })
          }} >Add Obstacles</button>
          <button onClick={()=>{
            let path = this.neural.run([this.state.currentPosition, this.state.destination])
            path.forEach(node=>{
              this.drawPath(node.x, node.y)
            })
           // this.findPath()
            this.setState({
              setObstacles: false,
              setDestination: false,
              setOrigin: false,
            })
          }}>
            Find Path
          </button>
          <canvas id='canvas' width={1024} height={520} onClick={(event)=>{
             if(this.state.setDestination){
              this.draw(event.nativeEvent.offsetX, event.nativeEvent.offsetY, DESTINATION_COLOR)
              if(this.state.destination){
                this.clearOldNode(this.state.destination.x, this.state.destination.y)
              }
                this.setState({
                  destination: {
                    x: event.nativeEvent.offsetX,
                    y: event.nativeEvent.offsetY,
                  }
                })
              
             }
             if(this.state.setOrigin) {
             this.draw(event.nativeEvent.offsetX, event.nativeEvent.offsetY, ORIGIN_COLOR)
             if(this.state.origin){
                this.clearOldNode(this.state.origin.x, this.state.origin.y)
              }
              
                this.setState({
                  origin: {
                    x: event.nativeEvent.offsetX,
                    y: event.nativeEvent.offsetY,
                  },
                  currentPosition:{
                    x: event.nativeEvent.offsetX,
                    y: event.nativeEvent.offsetY,
                  }
                })
             }
             if(this.state.setObstacles){
                if(this.state.obstacles.length < MAX_OBSTACLES){
                 
                this.draw(event.nativeEvent.offsetX, event.nativeEvent.offsetY, OBSTACLE_COLOR)

             
             
                this.setState({
                  obstacles: [...this.state.obstacles, {
                     x: event.nativeEvent.offsetX,
                     y: event.nativeEvent.offsetY,
                  }]
                })
            }
            else{
                alert('You cannot add more obstacles')
            }
        }

             console.log(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
          }} >

          </canvas>
      </div>
    )
  }
}
