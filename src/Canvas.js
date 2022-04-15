import React, { Component } from 'react'
const ORIGIN_COLOR= '#db0948'
const DESTINATION_COLOR= '#00b0ff'
const OBSTACLE_COLOR= '#ff00ff'
const MAX_OBSTACLES= 10
export default class Canvas extends Component {
    state={
        setDestination: false,
        setOrigin: false,
        origin: null,
        destination: null,
        obstacles: [],
        setObstacles: false,
        currentPosition: null,
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
    clearOldNode(x, y){
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        ctx.fillStyle='black'
        ctx.fillRect(x,y,20, 30)
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
