import React from 'react'

export default function About(){
    return(
        <div className="container" style={{marginTop:"20px"}}>
            <h1>How to Use this Tool</h1>
            <ul>
                <li>Light Green Node represent Start Node. To change the position of the start node click on start node button at the top then click on the 
                    position you want start node on
                </li>
                <li>
                    Red Node represents Finish Node. To change its position follow same procedure as start node.
                </li>
                <li>
                    Black Node represents Wall which means path cannot pass through this node. To create a wall node click directly on the position you want
                     (no need to click on wall node button). You can create multiple wall nodes by clicking and dragging on the nodes. 
                </li>
                <li>
                    For visualization click on the visualize button at the top. 
                </li>
                <li>
                    The blue nodes forming on the screen show the nodes which are visited by the algorithm in order to find the path
                </li>
                <li>
                    The yellow nodes represent the shortest path from start node to the end node.
                </li>
            </ul>
        </div>
    )
}