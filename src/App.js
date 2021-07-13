import './App.css';
import PathFindVisualizer from './mycomponents/PathFindingVisualizer'
import Header from './mycomponents/Header'
import About from './mycomponents/About'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
    <Route exact path="/" render={()=>{
        return(
          <>
          <Header/>
          <div className="App">
            <PathFindVisualizer i={30} j={60}/>
          </div>
          </>
        )
    }}></Route>
    <Route exact path="/about" render={()=>{
        return(
          <>
          <Header/>
          <About/>
          </>
        )
    }}></Route>
    </Router>
    </>
  );
}

export default App;
