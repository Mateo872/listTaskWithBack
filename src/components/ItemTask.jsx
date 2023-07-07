import { Button, ListGroup } from "react-bootstrap";

const ItemTask = ({ task, deleteTask, updatedTask }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      {task.taskName}
      <div className="d-flex gap-2">
        <Button
          variant="primary"
          onClick={() => updatedTask(task._id, task.taskName)}
        >
          Editar
        </Button>
        <Button variant="danger" onClick={() => deleteTask(task._id)}>
          Borrar
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemTask;
