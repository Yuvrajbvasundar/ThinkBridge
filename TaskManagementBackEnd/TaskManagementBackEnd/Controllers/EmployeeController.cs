using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementBackEnd.Models;

namespace TaskManagementBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly TaskManagementDBContext TaskDb;

        public EmployeeController(TaskManagementDBContext TaskDb)
        {
            this.TaskDb = TaskDb;
        }
        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult>  CheckEmployee([FromBody] string email)
        {

            var Employee = await TaskDb.Employees.FirstOrDefaultAsync(e => e.Email == email);

            if (Employee != null)
            {              
                return Ok(Employee);
            }
            return NotFound();
        }
        [Route("Manager")]
        [HttpGet]
        public async Task<IActionResult> GetManager()
        {
            try
            {
                List<Employee> result = await TaskDb.Employees.Where(e=> e.Role == "Manager").
                    Select(e => new Employee
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Email = e.Email,
                    Role = e.Role,
                }
                ).ToListAsync();

                if (result == null || result.Count == 0)
                    return NotFound("No Employees found.");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("ManagerTeam")]
        [HttpGet]
        public async Task<IActionResult> GetManagerTeam([FromQuery] int ManagerID)
        {
            try
            {
                List<Employee> result = await TaskDb.Employees.Where(e => e.ManagerId == ManagerID).
                    Select(e => new Employee
                    {
                        EmployeeId = e.EmployeeId,
                        Name = e.Name,
                        Email = e.Email,
                        Role = e.Role,
                    }
                ).ToListAsync();

                if (result == null || result.Count == 0)
                    return NotFound("No Employees found.");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult>    GetEmployee()
        {
            try
            {
                List<Employee> result = await TaskDb.Employees.Select(e=> new Employee 
                { EmployeeId = e.EmployeeId,
                Name =  e.Name,
                 Email = e.Email,
                 Role = e.Role,
                }
                ).ToListAsync();

                if(result == null || result.Count == 0)
                    return NotFound("No Employees found.");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateEmployee(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee cannot be null");
            }
            try
            {
                Employee employee2 = new Employee
                {
                    Name = employee.Name,
                    Email = employee.Email,
                    Role = employee.Role,
                    ManagerId = employee.ManagerId,
                };
                TaskDb.Employees.Add(employee2);
                TaskDb.SaveChanges();
                return Ok(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
