import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Todo from "./pages/Todo";



function App() {
 
  return (
    <div>
    
  <Router>
   <Switch>
       
         <Route    path="/" component={Todo}></Route>
        </Switch>
  

   </Router>
   </div>
  );
}

export default App;
