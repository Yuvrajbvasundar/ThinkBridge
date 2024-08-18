
import './App.css';
import EmployeeCreate from './Components/Emplyoee';
import TaskCreate from './Components/Task';
import { useState } from 'react';
import Login from './Components/Login';
import ShowAllTask from './Components/ShowAllTask';
import EmplyoeeTasks from './Components/EmplyoeeTasks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[employee,setEmployee] = useState(null)
    const handleLogin = (data) => {
      console.log(data)
      setEmployee(data)
      setIsLoggedIn(true);  // User is logged in
    };

    const handleLogout = () => {
        setIsLoggedIn(false);  // User logs out
    };

    return (
      <>
          {!isLoggedIn ? (
              <>
                  <Login onLogin={handleLogin} />
                  {console.log("Rendering Login component")}
              </>
          ) : (
              <>
                  {console.log("Rendering EmployeeCreate and TaskCreate components")}
                  <h1>Welcome {employee.name}</h1>
                 {employee.role == 'Admin'&& 
                 <>
                 <div>
                 <EmployeeCreate />
                 </div>
                <div>
                <ShowAllTask></ShowAllTask>
                </div>                
                 </>
                 }

                  <TaskCreate />                
                  <EmplyoeeTasks employee={employee}></EmplyoeeTasks>
                  <button onClick={handleLogout}>Logout</button>
              </>
          )}
      </>
  );
}

export default App;
