import React, { useState, useEffect } from 'react';

const EmplyoeeTasks = ({employee}) => {

    const[tasks,setTask] = useState([])
    const[teamtask,setTeamTask] = useState([])
    useEffect(() => {
        const FetchAllTasks = async () => {
            try {
                const response = await fetch(`http://localhost:5055/api/Task/IndividualTask?empID=${employee.employeeId}`);
                if (response.ok) {
                    const data = await response.json();
                        console.log('here2');
                        setTask(data.$values); 
                } else {

                    console.error('Server returned an error:', response.status, response.statusText);
                    setTask([]); 
                }
            }catch (error) {
                console.error('Error fetching tasks:', error);
            }
            console.log(tasks)
        };

        FetchAllTasks();
    }, []);
    useEffect(() => {
        if(employee.role==='Manager')
           { 
        const FetchTeamTasks = async () => {
            try {
                const response = await fetch(`http://localhost:5055/api/Task/ManagertTeamTask?ManagerID=${employee.employeeId}`);
                console.log('here1Manager');
                if (response.ok) {
                    const data = await response.json();
                        console.log('here2');
                        setTeamTask(data.$values); 
                } else {

                    console.error('Server returned an error:', response.status, response.statusText);
                    setTeamTask([]); 
                }
            }catch (error) {
                console.error('Error fetching tasks:', error);
            }
            console.log(tasks)
        };
        FetchTeamTasks();
    }

       
    }, []);
    return(
        <>
        
        {            
              tasks && tasks.length > 0 ? ( 
                <div> 
                <h1>My Tasks</h1>
           <table border={1}>
            <thead>
                <tr>
                <th>Task ID</th>
                <th>Task Name</th>
                <th>Status</th>
                <th>DueDate</th>
                <th>CompleteDate</th> 
                </tr>
                           
            </thead>
            <tbody>
                {
                   tasks.map(task =>
                    {
                        return <tr key={task.taskId}>
                            <td>{task.taskId}</td>
                            <td>{task.title}</td>
                            <td>{task.status}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.completedDate}</td>

                        </tr>
                    }
                   ) 
                }
            </tbody>
           </table> 
           </div>) :
           (<h3>No task been Assigned to you!</h3>)
        }
        {            
              teamtask && teamtask.length > 0 &&
                <div> 
                <h1>Team Tasks</h1>
           <table border={1}>
            <thead>
                <tr>
                <th>Task ID</th>
                <th>Task Name</th>
                <th>Assgined Emp Id</th>
                <th>Status</th>
                <th>DueDate</th>
                <th>CompleteDate</th> 
                </tr>
                           
            </thead>
            <tbody>
                {
                   teamtask.map(task =>
                    {
                        return <tr key={task.taskId}>
                            <td>{task.taskId}</td>
                            <td>{task.title}</td>
                            <td>{task.assignedTo}</td>
                            <td>{task.status}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.completedDate}</td>

                        </tr>
                    }
                   ) 
                }
            </tbody>
           </table> 
           </div>
        }
        </>
    )

}

export default EmplyoeeTasks;