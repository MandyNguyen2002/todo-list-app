
import React, {useState} from "react";
import { TextField, Button, Checkbox, List, ListItem, Container } from "@mui/material";
import './App.css';



function ToDoList() {
const [tasks, setTasks] = useState([]);
const [newTask, setNewTasks] = useState ("");

function handleInputChange(event){
    setNewTasks(event.target.value);
    
}

function handleAddTask(event){
    if(newTask.trim() !== ""){
        setTasks(t => [...t,{text: newTask, completed: false}])
    setNewTasks("");
    }
    
}

function handleDeleteTask(index){
    setTasks(t => t.filter((_, i) => i !== index));
}

function handleCheckTask(index){
    setTasks(t => t.map((tasks, i) => i === index ? {...tasks, completed: !tasks.completed} : tasks))

}
return(
    <Container className="Container">
        <TextField className="TextField" type ="text"
                value ={newTask}
                placeholder="Please enter your task"
                onChange={handleInputChange}/>

        <Button className="AddButton" onClick={handleAddTask}>
                Add
            </Button>
        
        <List className="List"> {tasks.map((tasks, index) => 
        <ListItem className="ListItem" key = {index} style ={{color: tasks.completed ? "gray" : "black"}}>
            <Checkbox className="Checkbox"
                        
                        checked = {tasks.completed}
                        onChange={() => handleCheckTask(index)}/>
            {tasks.text}
            <Button className="DelButton" onClick={() => handleDeleteTask(index)}
                                            >
                Delete
            </Button>
        </ListItem>
            )}

            
        </List>
    </Container>
)
}

export default ToDoList;