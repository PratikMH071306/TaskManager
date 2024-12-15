import axios from "axios";

export const fetchTasks = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return data.slice(0, 20).map((task) => ({
    id: task.id,
    title: task.title,
    description: "",
    status: task.completed ? "Done" : "To Do",
  }));
};
