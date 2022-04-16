const VALIID_X  = 900
const VALIID_Y  = 400

export default{
    generateRandom(){
        //generate random x and y values in valid range
        const start = {x: Math.floor(Math.random()*VALIID_X), y: Math.floor(Math.random()*VALIID_Y)}
        const end = {x: Math.floor(Math.random()*VALIID_X), y: Math.floor(Math.random()*VALIID_Y)}
        console.log(start, end)
        return{
            start: start,
            end: end
        }
        
    }

}