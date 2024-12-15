import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskFilters = () => {
  const { tasks, setFilteredTasks } = useContext(TaskContext); // Add `setFilteredTasks` to context
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleFilterChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    if (status) {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    } else {
      setFilteredTasks(tasks); // Show all tasks if no status is selected
    }
  };

  return (
    <div className="mb-4">
      <select
        value={selectedStatus}
        onChange={handleFilterChange}
        className="p-2 bg-gray-100 border border-gray-400"
      >
        <option value="">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default TaskFilters;
