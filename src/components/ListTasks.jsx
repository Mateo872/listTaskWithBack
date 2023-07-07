import { ListGroup } from "react-bootstrap";
import ItemTask from "./ItemTask";

const ListTask = ({ listingTasks, deleteTask, updatedTask }) => {
  return (
    <ListGroup>
      {listingTasks.map((task) => (
        <ItemTask
          key={task._id}
          task={task}
          deleteTask={deleteTask}
          updatedTask={updatedTask}
        ></ItemTask>
      ))}
    </ListGroup>
  );
};

export default ListTask;
