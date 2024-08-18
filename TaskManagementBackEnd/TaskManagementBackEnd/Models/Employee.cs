using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TaskManagementBackEnd.Models
{
    public partial class Employee
    {
        public Employee()
        {
            InverseManager = new HashSet<Employee>();
            Tasks = new HashSet<Task>();
        }

        public int EmployeeId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!;

        public int? ManagerId { get; set; } = null;
        [JsonIgnore]
        public virtual Employee? Manager { get; set; } = null;
        [JsonIgnore]
        public virtual ICollection<Employee> InverseManager { get; set; } = null;
        [JsonIgnore]
        public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}
