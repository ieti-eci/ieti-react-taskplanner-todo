import React, { useState } from "react";

export const tasks = [
  {
    id: "1",
    isCompleted: false,
    name: "Arreglar el checklist del edit",
    description: "Arreglar cosas",
    assignedTo: "NA",
    dueDate: "2021-01-01",
    status: "TODO"
  },
  {
    id: "2",
    isCompleted: false,
    name: "Limpiar el campo del create task cuando se crea tarea",
    description: "Arreglar cosas",
    assignedTo: "NA",
    dueDate: "2021-01-01",
    status: "TODO"
  },
  {
    id: "3",
    isCompleted: false,
    name: "Mejorar el UI usando CSS",
    description: "Arreglar cosas",
    assignedTo: "NA",
    dueDate: "2021-01-01",
    status: "TODO"
  },
  {
    id: "4",
    isCompleted: false,
    name: "Modificar la estructura del proyecto(UI y lógica) para que el Task tenga los siguientes campos: [name, description,assignedTo, dueDate, [status(TODO, IN_PROGRESS,REVIEW, DONE)]",
    description: "Arreglar cosas",
    assignedTo: "NA",
    dueDate: "2021-01-01",
    status: "TODO"
  }
];

const initialData = { tasks };

const DataContext = React.createContext(initialData);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const value = { data, setData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = React.useContext(DataContext);

  return context;
};
