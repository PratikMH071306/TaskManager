import React from "react";
import TaskProvider from "./context/TaskContext"; // Ensure TaskProvider is the default export
import TaskTable from "./components/TaskTable"; // Default export
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters"; // Default export
//import TaskCounters from "./components/TaskCounters"; // Default export
import { ToastContainer } from "react-toastify"; // Ensure react-toastify is installed
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const App = () => {
  return (
    <TaskProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        {/* <TaskCounters /> */}
        <TaskForm />
        <TaskFilters />
        <TaskTable />
        <ToastContainer />
      </div>
    </TaskProvider>
  );
};

export default App;
