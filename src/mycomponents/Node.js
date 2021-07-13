import React, { Component } from 'react'
import './Node.css';

export default class Node extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        const {
            row,
            col,
            isFinish,
            isStart,
            isVisited,
            isWall,
            isBorder,
            isInPath,
            onMouseUp,
            onMouseEnter,
            onMouseDown} = this.props
        const extraClassName = 
        isStart?'node-start':
        isFinish?'node-finish':
        isVisited?'node-isvisited':
        isInPath?'node-inPath':
        isWall?'node-isWall':
        isBorder?'node-isBorder':
        'node';
        return(
            <div 
            id={"node-"+row+"-"+col}
            className={extraClassName} 
            onMouseDown={()=>onMouseDown(row,col)} 
            onMouseEnter={()=>onMouseEnter(row,col)} 
            onMouseUp={()=>onMouseUp(row,col)}>
            </div>
        )
    }
}
