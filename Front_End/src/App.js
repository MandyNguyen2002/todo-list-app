import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList';
import { TextField, Button, Checkbox, List, ListItem, Container, Box} from "@mui/material";

function App() {
  return (
    <div className='to-do-list'>
      <h1>TO DO LIST</h1>
      <ToDoList/> 
    </div>
    
  
    
    
  );
}

export default App;
