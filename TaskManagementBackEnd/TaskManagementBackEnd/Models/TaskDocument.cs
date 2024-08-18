using System;
using System.Collections.Generic;

namespace TaskManagementBackEnd.Models
{
    public partial class TaskDocument
    {
        public int DocumentId { get; set; }
        public int TaskId { get; set; }
        public string FileName { get; set; } = null!;
        public string FileType { get; set; } = null!;
        public byte[] FileData { get; set; } = null!;
        public DateTime CreatedDate { get; set; }

        public virtual Task Task { get; set; } = null!;
    }
}
