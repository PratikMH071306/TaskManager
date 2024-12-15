import React, { createContext, useState, useEffect } from "react";
import { fetchTasks } from "../services/taskService";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetchTasks()
      .then((data) => {
        setTasks(data);
        setFilteredTasks(data); // Initialize filteredTasks with all tasks
      })
      .catch(console.error);
  }, []);

  const addTask = (task) => {
    const newTasks = [...tasks, { ...task, id: tasks.length + 1 }];
    setTasks(newTasks);
    setFilteredTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    setFilteredTasks(newTasks);
  };

  const updateTask = (updatedTask) => {
    const newTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(newTasks);
    setFilteredTasks(newTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        setFilteredTasks,
        addTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
