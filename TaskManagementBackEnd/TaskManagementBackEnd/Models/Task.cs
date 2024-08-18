using System;
using System.Collections.Generic;

namespace TaskManagementBackEnd.Models
{
    public partial class Task
    {
        public Task()
        {
            TaskDocuments = new HashSet<TaskDocument>();
        }

        public int TaskId { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public int AssignedTo { get; set; }
        public string Status { get; set; } = null!;
        public DateTime DueDate { get; set; }

       // public DateTime CreatedDate { get; set; }
        public DateTime? CompletedDate { get; set; }

        public virtual Employee? AssignedToNavigation { get; set; } = null!;
        public virtual ICollection<TaskDocument> TaskDocuments { get; set; } = new HashSet<TaskDocument>();
    }
}
