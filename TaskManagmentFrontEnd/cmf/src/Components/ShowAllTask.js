import React, { useState, useEffect } from 'react';

const ShowAllTask = () => {

    const[tasks,setTask] = useState([])
    useEffect(() => {
        const FetchAllTasks = async () => {
            try {
                const response = await fetch('http://localhost:5055/api/Task'); 
                const data = await response.json();
                console.log(data)
                setTask(data.$values);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
            console.log(tasks)
        };

        FetchAllTasks();
    }, []);
    return(
        <>
       
        {
          tasks && tasks.length > 0 ?
           (
            <div>
                 <h1>All Tasks</h1>
            
           <table border={1}>
            <thead>
                <th>Task ID</th>
                <th>Task Name</th>
                <th>Status</th>
                <th>AssignedTo</th>
                <th>DueDate</th>
                <th>CompleteDate</th>            
            </thead>
            <tbody>
                {
                   tasks.map(task =>
                    {
                        return <tr key={task.taskId}>
                            <td>{task.taskId}</td>
                            <td>{task.title}</td>
                            <td>{task.status}</td>
                            <td>{task.assignedTo}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.completedDate}</td>

                        </tr>
                    }
                   ) 
                }
            </tbody>
           </table> 
           </div>)
           :(<h2>No Tasks.</h2>)
        }
        </>
    )

}

export default ShowAllTask;