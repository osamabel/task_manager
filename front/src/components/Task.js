import React, { useState } from "react";

function Task({ item, setTasks }) {
  const [isupdt, setIsupdt] = useState(false);
  const [update, setUpdate] = useState({
    description: "",
    status: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (taskId) => {
    if (update.description != "" && update.status != "") {
      try {
        const response = await fetch(`http://localhost:3002/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        });
        console.log('DATA', JSON.stringify(update))
        if (!response.ok) {
          console.error("Failed to update task:", response.statusText);
        }
      } catch (error) {
        console.error("Error update form:", error);
      }
      setIsupdt(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3002/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove the deleted task from the tasks array
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to delete task:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="bg-slate-800 w-full min-h-[100px] flex items-center justify-between">
      <div>{item.id}</div>
      <div>{item.title}</div>
      <div>{item.description}</div>
      <div>{item.status}</div>
      <div className="flex flex-col gap-y-[10px]">
        <button
          onClick={() => deleteTask(item.id)}
          className="h-full w-full bg-black"
        >
          delete
        </button>
        <button
          onClick={() => {
            setIsupdt(true);
          }}
          className="h-full w-full bg-black"
        >
          mofidy
        </button>
      </div>
      {isupdt && (
        <div className="absolute top-0 right-0 w-full h-full bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
          <div className="w-[300px] h-[300px] bg-white  p-[40px] text-black relative">
            <div
              onClick={() => {
                setIsupdt(false);
              }}
              className="absolute top-0 right-0 text-red-600 cursor-pointer"
            >
              X
            </div>
            <div className="flex flex-col gap-y-10">
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={update.status}
                onChange={handleChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={update.description}
                onChange={handleChange}
              />
              <button
                onClick={() => handleSubmit(item.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
