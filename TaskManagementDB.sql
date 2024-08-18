CREATE TABLE Employees (
    EmployeeId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Role NVARCHAR(50) NOT NULL CHECK (Role IN ('Employee', 'Manager', 'Admin')),
    ManagerId INT NULL,
    FOREIGN KEY (ManagerId) REFERENCES Employees(EmployeeId)
);


CREATE TABLE Tasks (
    TaskId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    AssignedTo INT NOT NULL,
    Status NVARCHAR(50) NOT NULL CHECK (Status IN ('Open', 'In Progress', 'Completed')),
    DueDate DATE NOT NULL,
    CreatedDate DATETIME NOT NULL DEFAULT GETDATE(),
    CompletedDate DATETIME NULL,
    FOREIGN KEY (AssignedTo) REFERENCES Employees(EmployeeId)
);

CREATE TABLE TaskDocuments (
    DocumentId INT PRIMARY KEY IDENTITY(1,1),
    TaskId INT NOT NULL,
    FileName NVARCHAR(255) NOT NULL,        -- Store the original file name
    FileType NVARCHAR(50) NOT NULL,         -- Store the file type (e.g., 'pdf', 'jpg')
    FileData VARBINARY(MAX) NOT NULL,       -- Store the actual file data
    CreatedDate DATETIME NOT NULL DEFAULT GETDATE(),  -- Track when the file was uploaded
    FOREIGN KEY (TaskId) REFERENCES Tasks(TaskId)
);


INSERT INTO Employees (Name, Email, Role, ManagerId)
VALUES ('Admin Name', 'admin@example.com', 'Admin', NULL);
