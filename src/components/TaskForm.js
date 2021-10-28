import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useData } from "../providers/DataProvider";

export const TaskForm = ({}) => {
  const history = useHistory();
  const { data, setData } = useData();
  const { taskId } = useParams();
  const task = data.tasks.find((task) => task.id === taskId);

  const [text, setText] = useState(task?.name ?? "");
  const [newDescription, setNewDescription] = useState(task?.description ?? "");
  const [newAssignedTo, setNewAssignedTo] = useState(task?.assignedTo ?? "");
  const [newDueDate, setNewDueDate] = useState(task?.dueDate ?? "");
  const [newStatus, setNewStatus] = useState(task?.status ?? "");


  if (!task) {
    return <div>Task not found</div>;
  }

  const handleChange = (e) => {
    const inputName = e.target.value;

    setText(inputName);
  };

  const handleChangeDescription = (e) => {
    const inputDescription = e.target.value;

    setNewDescription(inputDescription);
  }

  const handleAssignedTo = (e) => {
    const inputAssignedTo = e.target.value;

    setNewAssignedTo(inputAssignedTo);
  }

  const handleDueDateChange = (e) => {
    const inputDate = e.target.value;

    setNewDueDate(inputDate);
  }

  const handleStatusChange = (e) => {
    setNewStatus(e);
  }

  const handleSave = () => {
    const newTasks = data.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name: text, description: newDescription, assignedTo: newAssignedTo, dueDate: newDueDate };
      }

      return task;
    });

    setData((prev) => ({ ...prev, tasks: newTasks }));

    history.goBack();
  };
 
  const handleChangeCheckBox = () => {
    let updateCheckbox = data.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    setData(() => ({ ...data, tasks: updateCheckbox }));
  }



  return (
    <form>
    <form class="Create">
      <input type="checkbox" onChange={() => handleChangeCheckBox()} checked={task.isCompleted}/>
      <button class="Button" type="button" onClick={handleSave}>
        Save
      </button>
      <ul>
        <li>Name: <input  type="text" placeholder="Task Name" value={text} onChange={handleChange}/></li>
        <li>Description: <input type="text" placeholder="TaskName" value={newDescription} onChange={handleChangeDescription} /></li>
        <li>AssignedTo: <input type="text" placeholder="AssignedTo" value={newAssignedTo} onChange={handleAssignedTo} /></li>
        <li>DueDate: <input type="date" placeholder="dueDate" value={newDueDate} onChange={handleDueDateChange} /></li>
        <li>Status: 
          <select value={newStatus} onChange={(val) => handleStatusChange(val.target.value)}>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="REVIEW">REVIEW</option>
            <option value="DONE">DONE</option>
          </select>
        </li>
      </ul>
    </form>
  );
};
