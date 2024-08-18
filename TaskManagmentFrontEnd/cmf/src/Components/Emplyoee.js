import React, { useState , useEffect } from 'react';

const EmployeeCreate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [managedID,SetManagerID]= useState('');
    const [manager,setManager] = useState([]);
    const [openform,setForm] = useState(false);
    const [employee,setEmployee]= useState(false);
    
    const handleMangerAndEmp = (e)=>
        {
            const selectedPosition = e.target.value;
            setPosition(selectedPosition)
             if(selectedPosition==='Employee')
                {
                    console.log('he is an employee')
                    setEmployee(true)
                }
            else{
                    setEmployee(false)
                }
            
        }
    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await fetch('http://localhost:5055/api/Employee/Manager'); 
                const data = await response.json();
                console.log(data)
                setManager(data.$values);
            } catch (error) {
                console.error('Error fetching manager:', error);
            }
            console.log(manager)
        };
        fetchManagers();
    }, [openform]);
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const newEmployee = { name, email, Role : position };
        
        if(position === 'Employee')
            newEmployee['ManagerId']=managedID;
        try {
            console.log(newEmployee);
            const response = await fetch('http://localhost:5055/api/Employee', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee),
            });

            if (response.ok) {
                    
                setForm(!openform);
                setName('');
                setEmail('');
                setPosition('');
                setForm(false);
                setManager([]);
                alert('Employee Created')
                setEmployee(false);
               
            } else {
                console.error('Failed to create employee:', response.statusText);
                alert('Failed to create employee.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the employee.');
        }
    };

    return (
        <div>
            <h2>Create Employee</h2>
            <button onClick={()=>{setForm(!openform)}}>Create</button>
            {
                openform &&
               (<form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <select value={position} onChange={(e) => handleMangerAndEmp(e)} required>
                           <option value="" disabled>
                                Select Position
                            </option>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                {
                 employee&&manager&&manager.length>0 && 
                    
                        <>
                    <label>Manager</label>
                    <select value={managedID} onChange={(e) => {SetManagerID(e.target.value)}} required>
                    <option value="" disabled>
                                Select Position
                            </option>
                         {
                            
                             manager.map(employee => (
                                    <option key={employee.employeeId} value={employee.employeeId}>
                                        {employee.name}
                                    </option>
                                ))
                            
                         }
                    </select>
                    </>
}              
                
                <button type="submit">submit</button>
            </form>
           ) }

           
        </div>
    );
};

export default EmployeeCreate;
