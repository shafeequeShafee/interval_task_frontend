import Upload from "../Assets/Images/upload.png";
import { data } from "../Common/config";

function TableRows({
  deleteTaskImage,
  uploadTaskImage,
  handleChange,
  deleteTask,
  taskData,
}) {
  const baseApiUrl = data?.apiBaseUrl;
  console.log("hhhhhhhh", baseApiUrl);
  return taskData.map((data, index) => {
    let { date, description, heading, time, image, priority, id } = data;
    return (
      <>
        <tr key={id || index}>
          <td>{index + 1}</td>
          <td>
            <input
              type="date"
              value={date}
              onChange={(e) => handleChange(index, e)}
              name="date"
              placeholder="Date"
            />
          </td>
          <td>
            <input
              type="text"
              value={heading}
              onChange={(e) => handleChange(index, e)}
              name="heading"
              placeholder="Heading"
            />
          </td>

          <td>
            <textarea
              type="text"
              value={description}
              onChange={(e) => handleChange(index, e)}
              name="description"
              placeholder="Description"
            />
          </td>
          <td>
            <select
              name="priority"
              value={priority}
              onChange={(e) => handleChange(index, e)}
            >
              <option value="">-- Select --</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High </option>
            </select>
          </td>

          <td>
            <input
              type="time"
              value={time}
              onChange={(e) => handleChange(index, e)}
              name="time"
              placeholder="Time"
            />
          </td>

          <td>
            <div className="file-upload">
              {image.length > 0 ? (
                <>
                  <div className="cache-image-container">
                    {image &&
                      image.map((file, i) => (
                        <img
                          key={i}
                          src={`${baseApiUrl}/${file}`}
                          alt={`image-${i}`}
                        />
                      ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="file-upload-lable">
                    <label
                      htmlFor={"taskImage_" + index}
                      className="choose-files"
                    >
                      <img src={Upload} alt="upload" />
                      <span>Choose File</span>
                    </label>
                  </div>
                </>
              )}

              <ul>
                {image &&
                  image.map((file, i) => {
                    return (
                      <li
                        key={i}
                        title={file}
                        onClick={() => deleteTaskImage(index, i)}
                      >
                        X
                      </li>
                    );
                  })}
              </ul>
            </div>

            <input
              type="file"
              id={"taskImage_" + index}
              name="file"
              onChange={(e) => uploadTaskImage(e, index)}
              accept=".png,.jpeg,.jpg"
              hidden
            />
            {/* <ol>
              {image &&
                image.map((file, i) => {
                  return (
                    <li key={i} className="uploaded-file-name" title={file}>
                      {file}
                    </li>
                  );
                })}
            </ol> */}
          </td>

          <td>
            <span onClick={() => deleteTask(index)}>X</span>
          </td>
        </tr>
      </>
    );
  });
}

export default TableRows;
