import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import fetcher from '../../../CMS/higher-order-components/Fetcher/index'
import seedrandom from 'seedrandom'
import styles from './index.scss'
import { Watch } from 'scrollmonitor-react';


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
       <div
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
      </div>
    );    
  }
}


const Bubblez = Watch(class Bubblez extends React.Component {

  componentWillMount(){
    this.generateCells()
  }

  generateCells(){
    const rows = 3
    const cols = 5

    const cellwidth = 100/cols  
    const cellHeight = 100/rows 
    
    const flatCells = []
    const cells = createArray(rows,cols) // [rows][cols]

    var count = 0

    for (var i = 0; i < cols; i++) { 
       for (var j = 0; j < rows; j++) { 
            if(++count % 2 === 0){
            const cell = {
              left: i*cellwidth, 
              top: j*cellHeight,
              occupied: false,
              size: 0
            }
            cells[j][i] = cell
            flatCells.push(cell)
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
    this.cells = flatCells
    return cells
  }

  


  render() {
    return (
      <ul 
      ref={(ref=>this.bubbles=ref)}
      className={styles.wrapper
      + (this.props.isInViewport || this.props.isAboveViewport ? (" " + styles.show) : "")}> 
        {this.props.data && this.props.data.skills ?
         this.props.data.skills
          .sort((a,b)=>a.level>b.level)
          .map((skill,idx)=>{
          
          var cell = this.cells[idx]
          cell = {"top": cell.top + "%", "left": cell.left + "%"}

          return(
            <div
            key={skill._id}
            className={styles.bubbleWrapper}
            style={cell}
            > 
          <Bubble
            animate={this.props.isFullyInViewport}
            image={skill.icon}
            description={skill.description}      
            name={skill.name}
            scale={skill.level}
          / >
          </div>
          )
        

          
        }) : null }
      </ul>
    );    
  }
})

export default fetcher(Bubblez, '/api/homepage')

