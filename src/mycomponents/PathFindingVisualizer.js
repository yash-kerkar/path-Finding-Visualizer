import React, { Component } from 'react';
import Node from './Node';
import { dijkstra } from '../algorithms/dijkstra';

export default class PathFindVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid:[],
            startNode:{row:15,col:2},
            finishNode:{row:15,col:20},
            mousePressed:false,
            clickedOnStartNode:false,
            clickedOnFinishNode:false
        };
    }

    componentDidMount(){
        const grid = this.createGrid()
        this.setState({grid})
    }

    selectStartNode(){
        if(this.state.clickedOnStartNode) this.setState({clickedOnStartNode:false})
        else this.setState({clickedOnStartNode:true})
    }

    selectFinishNode(){
        if(this.state.clickedOnFinishNode) this.setState({clickedOnFinishNode:false})
        else this.setState({clickedOnFinishNode:true})
    }

    handleMouseDown(row,col){
        if(this.state.clickedOnStartNode){
            const newGrid = this.state.grid.slice()
            const node1 = newGrid[row][col]
            const node2 = newGrid[this.state.startNode.row][this.state.startNode.col]
            const newNode1 = {
                ...node1,
               isStart:true,
            };
            const newNode2 = {
                ...node2,
                isStart:false
            }
            newGrid[row][col] = newNode1
            newGrid[this.state.startNode.row][this.state.startNode.col] = newNode2
            this.setState({grid:newGrid,startNode:{row,col},clickedOnStartNode:false})
        }
        else if(this.state.clickedOnFinishNode){
            const newGrid = this.state.grid.slice()
            const node1 = newGrid[row][col]
            const node2 = newGrid[this.state.finishNode.row][this.state.finishNode.col]
            const newNode1 = {
                ...node1,
               isFinish:true,
            };
            const newNode2 = {
                ...node2,
                isFinish:false
            }
            newGrid[row][col] = newNode1
            newGrid[this.state.finishNode.row][this.state.finishNode.col] = newNode2
            this.setState({grid:newGrid,finishNode:{row,col},clickedOnFinishNode:false})
        }
        else{
            const newGrid = creatGridWallToglled(this.state.grid,row,col)
            this.setState({grid:newGrid,mousePressed:true})
        }
    }

    handleMouseEnter(row,col){
        if(this.state.mousePressed){
            const newGrid = creatGridWallToglled(this.state.grid,row,col)
            this.setState({grid:newGrid})
        }
    }

    handleMouseUp(row,col){
        this.setState({mousePressed:false})
    }

    animateDijkstra(visitedNodes,path){
        for(let i=0;i<=visitedNodes.length;i++){
            if(i===visitedNodes.length){
                setTimeout(()=>{
                    this.animateShortestPath(path)
                },10*i)
                return
            }
            setTimeout(()=>{
             const node = visitedNodes[i]
         const newGrid = this.state.grid.slice();
         const newNode = {
             ...node,
             isVisited:true
         };
         newGrid[node.row][node.col] = newNode
             this.setState({grid:newGrid});
            },10* i);
        }
       }

    animateShortestPath(path){
        for(let j =0;j<path.length;j++){
            setTimeout(()=>{
                const node = path[j]
                const newGrid = this.state.grid.slice();
                const newNode = {
                    ...node,
                    isVisited:false,
                    isInPath:true
                };
                newGrid[node.row][node.col] = newNode
                    this.setState({grid:newGrid});
        },25*j)
       }
    }

    visualizeDijkstra(){
       const {grid} = this.state
       const startNode = grid[this.state.startNode.row][this.state.startNode.col]
       const finishNode = grid[this.state.finishNode.row][this.state.finishNode.col]
       console.log(finishNode)
       const [visitedNodes,path] = dijkstra(grid,startNode,finishNode)
       let grid1 = this.refreshGrid()
       this.setState({grid:grid1})
       this.animateDijkstra(visitedNodes,path)
       
    }

    refreshGrid(){
        const newGrid = this.state.grid.slice()
        for (let row = 0; row < this.props.i; row++) {
            for (let col = 0; col < this.props.j; col++) {
                let node = newGrid[row][col]
                const currentNode = {
                    ...node,
                    isVisited:false
                }
                newGrid[row][col] = currentNode
            }
        }
        return newGrid
    }

    createGrid(){
        let grid = []
        for (let row = 0; row < this.props.i; row++) {
            let currentRow = []
            for (let col = 0; col < this.props.j; col++) {
                let currentNode = {
                    row,
                    col,
                    isStart:row===this.state.startNode.row && col===this.state.startNode.col,
                    isFinish:row===this.state.finishNode.row && col===this.state.finishNode.col,
                    distance:Infinity,
                    isWall:false,
                    isInPath:false,
                    isVisited:false,
                    parentNode:null,
                    isBorder:false
                }
                if(row === 0 || col === 0 || row === 29 || col === 59){
                    currentNode.isBorder = true
                }
                currentRow.push(currentNode)
            }
            grid.push(currentRow)
        }
        return grid
    }
    

    render(){
        const {grid} = this.state;
        let align = {
            textAlign:"center",
            fontSize:"0"
        }
        return(
        <>
        <div style={{marginTop:"10px"}}>
        <button onClick={()=>this.visualizeDijkstra()}> Visualize Dijkstra's Algorithm</button>
        <button onClick={()=>this.selectStartNode()} style={{marginLeft:"5px",marginRight:"5px"}}>
        <div className="node-start"></div>
        <p>Start Node</p>
        </button>
        <button onClick={()=>this.selectFinishNode()}>
        <div className="node-finish"></div>
        <p>Finish Node</p>
        </button>
        <button style={{marginLeft:"5px",marginRight:"5px"}}>
        <div className="node-isWall" ></div>
        <p>Wall Node</p>
        </button>
        <button onClick={()=>this.componentDidMount()} style={{marginLeft:"5px",marginRight:"5px"}}> Reset</button>
        <div style={align} className="my-3">
        {
          grid.map((row,rowIdx)=>{
              return <div key={rowIdx}>
                  {row.map((node,nodeIdx) => {
                  const {row,isStart,isFinish,isVisited,isInPath,isWall,col,isBorder} = node
                  return (<Node key={nodeIdx} 
                    row={row}
                    col={col}
                    isStart={isStart} 
                    isFinish={isFinish} 
                    isWall={isWall}
                    isVisited={isVisited} 
                    isInPath={isInPath} 
                    isBorder={isBorder}
                    onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                    onMouseUp={(row,col)=>this.handleMouseUp(row,col)}
                    onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}>
                     </Node>)
                  })}
              </div>
          })
        }
        </div>
        </div>
        </>
        );
    }
}

const creatGridWallToglled = (grid,row,col) => {
    const newGrid = grid.slice()
    console.log(newGrid)
    const node = newGrid[row][col]
    const newNode = {
        ...node,
        isWall:!node.isWall,
    };
    newGrid[row][col] = newNode
    return newGrid
}
