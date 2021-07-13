import React from 'react'
import {Link} from "react-router-dom";
import './Node.css';

export default function header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
  <Link className="navbar-brand" to="/" style={{fontFamily: 'Staatliches',fontSize:"30px"}}>Path Finding Visualizer Tool</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Select Algorithm
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Dijkstra</a>
          <a class="dropdown-item" href="#">BFS</a>
          <a class="dropdown-item" href="#">DFS</a>
          <a class="dropdown-item" href="#">Bellmen-Ford</a>
        </div>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">How to use</Link>
      </li>
    </ul>
 </div>
 <p className="font-link">Created by Yash Kerkar<br/>kerkaryash4@gmail.com</p>
 </div>
</nav>
    )
}
