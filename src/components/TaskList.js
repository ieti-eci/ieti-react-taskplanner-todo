import { useState } from "react";
import { useData } from "../providers/DataProvider";
import { TaskItem } from "./TaskItem";
import "../Style.css";
export const TaskList = () => {
  const { data, setData } = useData();
  const [textValue, setTextValue] = useState("");

  const tasks = data.tasks;

  const handleTaskChange = (index) => () => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    setData((prev) => ({ ...prev, tasks: newTasks }));
  };

  const newTask = (name) => {
    const newTask = {
      isCompleted: false,
      name: name,
    };
    setData((prev) => ({ ...prev, tasks: [...tasks, newTask] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newTask(textValue);
    setTextValue("")
  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
  };

  return (
    <article>
      <form class="Create" onSubmit={handleSubmit}>
        <input class="input"
          value={textValue}
          onChange={handleTextChange}
          type="text"
          placeholder="Task name"
        />
        <button class="Button" >Create Task</button>
      </form>

      <ul id="Tasks">
        {tasks.map((task, index) => {
          return (
            <TaskItem
              id={task.id}
              isChecked={task.isCompleted}
              taskName={task.name}
              onTaskChange={handleTaskChange(index)}
            />
          );
        })}
      </ul>
    </article>
  );
};
