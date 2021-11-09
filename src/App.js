import React from 'react'
import "./styles.css"
import { Navbar } from "./components/Navbar/Navbar"
import { TaskList } from "./components/TaksList/TaskList"
import { useState } from "react"

let idAcc = 0;
const generateId = () => {
  idAcc = ++idAcc
  return idAcc
}

export function App() {

  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    }
    setTasks((existingTasks) => {
        return [...existingTasks, newTask]
    })
  }

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if(task.id === id){
          return { ...task, title, state }
        }else {
          return task;
        }
      })
    })
  }

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <div className="container">
          <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="pendente"
          tasks={tasks.filter((t) => t.state === "pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
          />
          <TaskList
          title="Executando"
          onAddTask={addTask}
          taskState="executando"
          tasks={tasks.filter((t) => t.state === "executando")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
          />
          <TaskList
          title="Concluída"
          onAddTask={addTask}
          taskState="concluida"
          tasks={tasks.filter((t) => t.state === "concluida")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
          />
        </div>
      </header>
    </div>
  )
}