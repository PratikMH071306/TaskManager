import React, { useContext, useRef, useEffect } from "react";
import { Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { TaskContext } from "../context/TaskContext";

const TaskTable = () => {
  const { tasks, deleteTask, updateTask } = useContext(TaskContext);
  const tableRef = useRef();
  const tabulatorInstance = useRef(null);

  useEffect(() => {
    // Initialize Tabulator
    tabulatorInstance.current = new Tabulator(tableRef.current, {
      layout: "fitColumns",
      reactiveData: true, // React to data changes dynamically
      data: tasks,
      columns: [
        {
          title: "Task ID",
          field: "id",
          width: 80,
          hozAlign: "center",
          editable: false, // Prevent editing
        },
        {
          title: "Title",
          field: "title",
          editor: "input",
          validator: ["required"], // Ensure non-empty title
        },
        {
          title: "Description",
          field: "description",
          editor: "textarea",
        },
        {
          title: "Status",
          field: "status",
          editor: "select",
          editorParams: {
            values: ["To Do", "In Progress", "Done"],
          },
          validator: ["required"], // Ensure valid selection
        },
        {
          title: "Actions",
          formatter: () => '<button class="btn-delete">Delete</button>',
          width: 100,
          hozAlign: "center",
          cellClick: (e, cell) => {
            const taskId = cell.getData().id;
            deleteTask(taskId);
          },
        },
      ],
      cellEdited: (cell) => handleCellEdit(cell), // Global cell edit handler
    });

    // Cleanup on unmount
    return () => {
      if (tabulatorInstance.current) {
        tabulatorInstance.current.destroy();
        tabulatorInstance.current = null;
      }
    };
  }, [tasks, deleteTask]);

  // Handle Cell Edits
  const handleCellEdit = (cell) => {
    const updatedTask = cell.getData();

    if (cell.getField() === "title" && !updatedTask.title.trim()) {
      // Validate Title
      cell.restoreOldValue();
      alert("Title cannot be empty!");
    } else if (cell.getField() === "status" && !updatedTask.status) {
      // Validate Status
      cell.restoreOldValue();
      alert("Status cannot be empty!");
    } else {
      // Save valid changes
      updateTask(updatedTask);
    }
  };

  return (
    <div>
      <div ref={tableRef}></div>
    </div>
  );
};

export default TaskTable;
