import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task";

function App() {
  const [taches, setTasks] = useState([]);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState({
    title: "",
    description: "",
    status: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (update.description != "" && update.status != "") {
      try {
        const response = await fetch(`http://localhost:3002/tasks`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        });
        if (!response.ok) {
          console.error("Failed to update task:", response.statusText);
        }
      } catch (error) {
        console.error("Error update form:", error);
      }
      setAdd(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3002/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [taches]);

  return (
    <div className="bg-slate-700 h-screen text-white text-[22px] flex items-center justify-center relative">
      <div className="h-screen w-[70vw] flex flex-col items-start justify-start pt-[100px] gap-y-[50px]">
        <div className="flex items-center justify-between w-full px-[20px]">
          <h1 className="text-[40px]">Task Manager</h1>
          <div
            onClick={() => {
              setAdd(true);
            }}
            className="ab w-[40px] h-[40px] flex items-center justify-center rounded-full bg-blue-500 cursor-pointer "
          >
            <img className="w-[20px]" src="/plus.png" />
          </div>
        </div>
        <div className=" w-full h-full bg-slate-900  overflow-hidden flex flex-col gap-y-[20px]">
          <div className="flex items-center justify-between p-[20px]">
            <div>ID</div>
            <div>Title</div>
            <div>description</div>
            <div>Status</div>
            <div>setting</div>
          </div>
          <div className="h-full flex flex-col gap-y-[20px] overflow-auto	p-[20px]">
            {taches.map((item, index) => (
              <Task key={index} item={item} setTasks={setTasks} />
            ))}
          </div>
        </div>
      </div>
      {add && (
        <div className="absolute top-0 right-0 w-full h-full bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
          <div className="w-[300px] h-[300px] bg-white  p-[40px] text-black relative">
            <div
              onClick={() => {
                setAdd(false);
              }}
              className="absolute top-0 right-0 text-red-600 cursor-pointer"
            >
              X
            </div>
            <div className="flex flex-col gap-y-10">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={update.title}
                onChange={handleChange}
              />
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
                onClick={() => handleSubmit()}
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

export default App;
