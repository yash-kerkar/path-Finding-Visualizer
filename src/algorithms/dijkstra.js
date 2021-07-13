
export function dijkstra(grid,startNode,finishNode){
    console.log(finishNode)
    const visitedNodesInOrder = []
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid);
    let i = 0;
    while(i < unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes);
        const minNode = unvisitedNodes.shift()
        if(minNode.distance === Infinity) return [visitedNodesInOrder,null]
        if(minNode.isWall || minNode.isBorder) continue
        minNode.isVisited = true
        visitedNodesInOrder.push(minNode)
        console.log(finishNode)
        if(minNode === finishNode) return [visitedNodesInOrder,findPath(finishNode)]
        updateNeighbours(minNode,grid)
    }

}

function getAllNodes(grid){
    let temp = []
    for(let i=0; i < grid.length; i++){
        for(let j=0; j <grid[i].length; j++){
            if(!grid[i][j].isVisited){
                temp.push(grid[i][j])
            }
        }
    }
    return temp
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA,nodeB)=>nodeA.distance - nodeB.distance)
}

function updateNeighbours(node,grid){
    const {row,col} = node;
    if(row > 0 && grid[row-1][col].isVisited !== true && grid[row-1][col].distance > node.distance + 1){
        grid[row-1][col].distance = node.distance + 1;
        grid[row-1][col].parentNode = node
    }
    if(row < grid.length-1 && grid[row+1][col] !== true && grid[row+1][col].distance > node.distance + 1){
        grid[row+1][[col]].distance = node.distance + 1
        grid[row+1][col].parentNode = node
    }
    if(col > 0 && grid[row][col-1] !== true && grid[row][col-1].distance > node.distance + 1){
        grid[row][col-1].distance = node.distance + 1
        grid[row][col-1].parentNode = node
    }
    if(col < grid[0].length-1 && grid[row][col+1] !== true && grid[row][col+1].distance > node.distance + 1){
        grid[row][col+1].distance = node.distance + 1
        grid[row][col+1].parentNode = node
    }
}

function findPath(finishNode){
    let temp = []
    while(finishNode.isStart !== true){
        temp.push(finishNode.parentNode)
        finishNode = finishNode.parentNode
    }
    return temp.reverse()
}