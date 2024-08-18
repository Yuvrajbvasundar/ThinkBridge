import React, { useState, useEffect } from 'react';

const TaskCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [openForm, setForm] = useState(false);
    const [status,setStatus] = useState('Open');
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5055/api/Employee'); // Replace with your API endpoint to fetch employees
                const data = await response.json();
                console.log(data)
                setEmployees(data.$values);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
            console.log(employees)
        };

        fetchEmployees();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(status)
        const newTask = { title, description, dueDate,AssignedTo: employeeId,status }

        try {
            const response = await fetch('http://localhost:5055/api/Task', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                setTitle('');
                setDescription('');
                setDueDate('');
                setEmployeeId('');
                setForm(false);
                alert('Task Created');
            } else {
                console.error('Failed to create task:', response.statusText);
                alert('Failed to create task.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the task.');
        }
    };

    return (
        <div>
            <h2>Create Task</h2>
            <button onClick={() => setForm(!openForm)}>Create Task</button>
            {
                openForm &&
                (<form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>                    
                    <div>
                        <label>Assign to Employee:</label>
                        <select
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select Employee
                            </option>
                            {
                            employees.map(employee => (
                                <option key={employee.employeeId} value={employee.employeeId}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Due Date:</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>                           
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>)
            }
        </div>
    );
};

export default TaskCreate;
