import React, { useEffect, useState } from "react";
import TableRows from "./TableRows";
import { toast } from "react-toastify";
import moment from "moment";
import {
  uploadTaskImageApiService,
  getAllTask,
  updateTask,
} from "../Service/taskApiService.js";

function Task() {
  const [taskData, setTaskData] = useState([]);
  useEffect(() => {
    getAllTask()
      .then((response) => {
        if (response?.status === 200) {
          let taskList = [];
          response?.response.length > 0 &&
            response?.response.map((data) => {
              let images = data?.image?.split(",");
              let task = {
                id: data?.id,
                date: moment(data?.date).format("YYYY-MM-DD"),
                heading: data?.heading,
                description: data?.description,
                time: data?.time,
                priority: data?.priority,
                image: images,
                flag: false,
              };
              taskList.push(task);
            });
          setTaskData([...taskList]);
        } else {
          toast.warning("No data found");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong, Please try later.", err);
      });
  }, []);
  const addTaskToList = () => {
    taskData.push({
      id: "",
      date: "",
      heading: "",
      description: "",
      time: "",
      priority: "",
      image: [],
      flag: false,
    });
    setTaskData([...taskData]);
  };

  const deleteTask = (index) => {
    const rows = [...taskData];
    rows.splice(index, 1);
    setTaskData([...rows]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const rowsInput = [...taskData];
    rowsInput[index][name] = value;
    rowsInput[index]["flag"] = true;
    setTaskData(rowsInput);
  };

  const deleteTaskImage = (index, i) => {
    let array = taskData[index].image?.filter((file, index) => {
      if (index === i) {
        file = null;
      }
      return file;
    });
    taskData[index].image = array;
    setTaskData([...taskData]);
  };
  const uploadTaskImage = async (event, index) => {
    event.preventDefault();
    const formData = new FormData();
    let errorData = {
      errorCount: 0,
      errorMsg: "",
    };
    for (let i = 0; i < event.target.files.length; i++) {
      let allowedExtensions = ["image/jpg", "image/jpeg", "image/png"];
      if (!allowedExtensions.includes(event.target.files[i].type)) {
        errorData["errorCount"] = 1;
        errorData["errorMsg"] = "Please upload JPG / PNG  /JPEG file(s) only.";
      }
      if (
        event.target.files[i].size > 5 * 1024 * 1024 &&
        ["image/jpg", "image/png", "image/jpeg"].includes(
          event.target.files[i].type
        )
      ) {
        errorData["errorCount"] = 1;
        errorData["errorMsg"] = "File size should not exceed 5MB.";
      }
      formData.append(event.target.name, event.target.files[i]);
    }
    if (errorData["errorCount"] === 0) {
      uploadTaskImageApiService(formData)
        .then((response) => {
          let data = response?.data?.response.split(",");
          event.target.value = "";
          let array = [...taskData[index].image];

          array = [];
          data.map((file) => {
            array.push(file);
          });

          taskData[index].image = array;
          taskData[index].flag = true;
          console.log("taskData", taskData);
          setTaskData([...taskData]);
        })
        .catch((err) => {
          toast.error("Something went wrong, Please try later.", err);
        });
    }
  };

  const submitTask = (e) => {
    e.preventDefault();
    updateTask(taskData)
      .then((response) => {
        if (response?.status === 200) {
          toast.success("Saved succesfully");
        } else {
          toast.error("Something went while updating task");
        }
      })
      .catch((err) => {});
  };

  {
    console.log("task", taskData);
  }
  return (
    <div className="parent-container">
      <form>
        <div>
          <div className="title-content">
            <h3 className="task-title">
              Add your Task
              <button type="button" className="add-new" onClick={addTaskToList}>
                Add Task
              </button>
            </h3>
          </div>
          <div className="task-body">
            <table className="item-table">
              <thead className="table-header">
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Heading</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Time</th>
                  <th>Image</th>

                  <th></th>
                </tr>
              </thead>
              <tbody className="table-body">
                {taskData.length > 0 && (
                  <TableRows
                    taskData={taskData}
                    deleteTask={deleteTask}
                    handleChange={handleChange}
                    uploadTaskImage={uploadTaskImage}
                    deleteTaskImage={deleteTaskImage}
                  />
                )}
                {taskData.length === 0 && (
                  <>
                    <tr>
                      <td className="text-center" colSpan={5}>
                        No Task added.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>
                        Please add atleast one item to continue.
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <button className="submit-button" onClick={submitTask}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Task;
