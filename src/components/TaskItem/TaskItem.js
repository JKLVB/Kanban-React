import React, { useState } from "react"
import PropTypes from "prop-types"
import "./taskitem.css"

export function TaskItem({ id, title, taskState, onTaskUpdate, onDeleteTask }){
    const[isEditing, setIsEditing] = useState(false);
    const[editableTitle, setEditableTitle] = useState(title);

    const onTitleChange = (event) => {
        const newTitle= event.target.value
        setEditableTitle(newTitle)
        onTaskUpdate(id, newTitle, taskState)
    }

    const onKeyPress = (event) => {
        if(event.key === "Enter"){
            setIsEditing(false)
            if(editableTitle.length === 0) {
                onDeleteTask(id)
            }
        }
    }

    const onTaskStateChange = (event) => {
        onTaskUpdate(id, title, event.target.value)
    }

    if(isEditing){
        return <input type="text" value={editableTitle} onChange={onTitleChange} onKeyPress={onKeyPress}/>
    } else{
        return(
            <div>
                <div onClick={(e) => {setIsEditing(true)}}>{editableTitle}</div>
                <select onChange={onTaskStateChange} value={taskState}>
                    <option value="pendente">Pendente</option>
                    <option value="executando">Executando</option>
                    <option value="concluida">Concluída</option>
                </select>
            </div>
        )
    }
}

TaskItem.protoType = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    taskState: PropTypes.string.isRequired
}