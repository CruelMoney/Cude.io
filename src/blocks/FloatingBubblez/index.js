import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import fetcher from '../../higher-order-components/Fetcher/index'
import seedrandom from 'seedrandom'
import styles from './index.scss'
import {throttle} from '../../utils/helperFunctions'

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



class Bubble extends React.Component {

  up = false
  animate(bubble){
    if(bubble){
        const amount = (this.up ? -1 : 1) * 3  
        const translate = `translateY(${amount}px)`
        bubble.style.transform = 
        translate + this.transform
        this.up = !this.up
    }
  }
    

  componentWillMount(){
    this.scale = 
      this.props.scale === 3 ? "2.2" :
      this.props.scale === 2 ? "1.7" :
      "1.1"


    this.transform = ` scale(${this.scale}) translateX(0%)`
   
  }

  bubble = null

  render() {
      return (
       <li
        
        ref={r=>{
            Math.seedrandom(this.props._id)
            if(r && this.props.animate){
              setTimeout(()=> {
              this.intervalID = window.setInterval( () => this.animate(r), 1000 );
                }, Math.floor(Math.random() * 1000));
            }else{
              this.intervalID && window.clearInterval(this.intervalID);
            }
          }}
        style={{transform: `scale(${this.scale})` }}
        className={styles.bubble}
       >
        {this.props.name}
        {this.props.image ? 
          <img 
          src={"/uploads/"+this.props.image.filename}
          alt={this.props.name}
          className={styles.skillIcon} />
        : null}
      
        {this.props.description ?
        <div 
        style={{transform: `translateX(-50%) translateY(-50%) scale(${1/this.scale})` }}
        className={styles.popup}>
          {this.props.description}
        </div>
        : null}
        
      </li>
    );    
  }
}


class Bubblez extends React.Component {
  state={animate:false}

  componentDidMount(){
    this.throttledScroll = throttle(this.handleScroll, 300)
    window.addEventListener("scroll", this.throttledScroll);
  }
  componentWillUnmount(){
      window.removeEventListener("scroll", this.throttledScroll);
  }
  handleScroll = () =>{
    var rect = this.bubbles.getBoundingClientRect();
    if (rect.top <= window.innerHeight) {
       !this.state.animate && this.setState({animate:true})
    } else {
      this.state.animate && this.setState({animate:false})
    }
  }


  generateCells(){
    const rows = 3
    const cols = 5

    const cellwidth = 100/cols  
    const cellHeight = 100/rows 
    
    const cells = createArray(rows,cols) // [rows][cols]

    var count = 0

    for (var i = 0; i < cols; i++) { 
       for (var j = 0; j < rows; j++) { 
            if(++count % 2 === 0){
            cells[j][i] =
            {
              left: i*cellwidth, 
              top: j*cellHeight,
              occupied: false,
              size: 0
            }
          }else{
            cells[j][i] =
            {
              left: i*cellwidth, 
              top: j*cellHeight,
              occupied: true,
              size: 0
            }
          }
       }
    }
    return cells
  }

  fillNextCell(cells, size){
    const rows = 3
    const cols = 5

    var colsCounts = []
    var rowsCounts = []
    
    for (var i = 0; i < rows; i++) {
      const occupiedCount = cells[i].reduce((a, b) => ({size: a.size + b.size})).size;
      rowsCounts[i] = occupiedCount

      //also count column 
      for (var j = 0; j < cols; j++) { 
      
          colsCounts[j] ? colsCounts[j] + cells[i][j].size :  colsCounts[j] = cells[i][j].size
        
      } 
    } 


    //Array of sorted priorities
    colsCounts = shuffleArray(colsCounts
      .map((v,idx)=>{return{idx:idx,val:v}}))
      .sort((a,b)=>a.val>b.val)
    rowsCounts = shuffleArray(rowsCounts
      .map((v,idx)=>{return{idx:idx,val:v}}))
      .sort((a,b)=>a.val>b.val)


    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) { 
        var r = rowsCounts[i].idx
        var c = colsCounts[j].idx
        if(!cells[r][c].occupied){
          cells[r][c].size = size
          cells[r][c].occupied = true
          return cells[r][c]
        }
      } 
    } 

   

  }


  render() {
    this.cells = this.generateCells()

    return (
      <ul 
      ref={(ref=>this.bubbles=ref)}
      className={styles.wrapper}> 
        {this.props.data && this.props.data.skills ?
         this.props.data.skills
          .sort((a,b)=>a.level>b.level)
          .map(skill=>{
          
          var cell = this.fillNextCell(this.cells, skill.level)
          cell = {"top": cell.top + "%", "left": cell.left + "%"}

          return(
            <div
            className={styles.bubbleWrapper}
            style={cell}
            > 
          <Bubble
            animate={this.state.animate}
            image={skill.icon}
            description={skill.description}
            key={skill._id}
            name={skill.name}
            scale={skill.level}
          / >
          </div>
          )
        }) : null }
      </ul>
    );    
  }
}

export default fetcher(Bubblez, '/api/homepage')

