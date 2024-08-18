using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementBackEnd.Models;
using Task = TaskManagementBackEnd.Models.Task;

namespace TaskManagementBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskManagementDBContext TaskDb;

        public TaskController(TaskManagementDBContext TaskDb)
        {
            this.TaskDb = TaskDb;
        }
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            try
            {
                var tasks = await TaskDb.Tasks.ToListAsync();

                if (tasks == null || tasks.Count == 0)
                {
                    return NotFound("No tasks found.");
                }

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving tasks.");
            }

        }

        [Route("IndividualTask")]
        [HttpGet]
        public async Task<IActionResult> GetTasks(int empID)
        {
            try
            {
                var tasks = await TaskDb.Tasks.Where(e=> e.AssignedTo == empID).ToListAsync();   

                if (tasks == null || tasks.Count == 0)
                {
                    return NotFound("No tasks found.");
                }

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving tasks.");
            }

        }
        [Route("ManagertTeamTask")]
        [HttpGet]
        public async Task<IActionResult> GetManagerTeamTasks(int ManagerID)
        {
            try
            {
                var tasks = await (from t in TaskDb.Tasks
                                   join e in TaskDb.Employees on t.AssignedTo equals e.EmployeeId
                                   where e.ManagerId == ManagerID
                                   select t).ToListAsync();

                if (tasks == null || tasks.Count == 0)
                {
                    return NotFound("No tasks found.");
                }

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving tasks.");
            }

        }



        [HttpPost]
        public IActionResult CreateTask(Task task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null");
            }

            try
            {
                var assignedEmployee = TaskDb.Employees.Find(task.AssignedTo);

                if (assignedEmployee == null)
                {
                    return BadRequest("Assigned employee does not exist.");
                }

                Task newTask = new Task

                {
                    TaskId = task.TaskId,
                    Title = task.Title,
                    Description = task.Description,
                    AssignedToNavigation = assignedEmployee,
                    AssignedTo = task.AssignedTo,
                    Status = task.Status,
                    DueDate = task.DueDate,
                    CompletedDate = task.CompletedDate,
                };

                TaskDb.Tasks.Add(newTask);

                TaskDb.SaveChanges();


                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

      
    }
}
