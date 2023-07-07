import { Form, Button } from "react-bootstrap";
import ListTasks from "./ListTasks";
import { useState, useEffect, useRef } from "react";
import {
  createTask,
  deleteConsultTask,
  getTasks,
  updateTask,
} from "./helpers/queries";
import Swal from "sweetalert2";

const Formulario = () => {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    getTasks().then((res) => {
      if (res) {
        setTask(res);
      } else {
        Swal.fire(
          "Se produjo un error al intentar cargar los datos",
          `Intente realizar esta operación más tarde.`,
          "error"
        );
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { taskName: input };

    if (input.length > 0) {
      if (selectedTaskId) {
        updateTask(selectedTaskId, newTask)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire(
                "Tarea actualizada",
                `La tarea '${newTask.taskName}' fue actualizada con éxito.`,
                "success"
              );
              getTasks().then((res) => {
                setTask(res);
              });
              setInput("");
              setSelectedTaskId(null);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createTask(newTask)
          .then((res) => {
            if (res.status === 201) {
              getTasks().then((res) => {
                setTask(res);
              });
              setInput("");
            } else {
              console.log("error");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const updatedTask = (id, taskName) => {
    setSelectedTaskId(id);
    setInput(taskName);
    inputRef.current.focus();
  };

  const deleteTask = (id) => {
    deleteConsultTask(id).then((res) => {
      const taskFiltered = task.filter((task) => task._id === id);
      if (res.status === 200) {
        Swal.fire(
          "Tarea eliminada",
          `La tarea '${taskFiltered[0].taskName}' fue eliminada con éxito.`,
          "success"
        );
        getTasks().then((res) => {
          setTask(res);
        });
      }
    });
  };

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-flex" controlId="task">
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Ingrese una tarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form.Group>
      </Form>
      <ListTasks
        listingTasks={task}
        deleteTask={deleteTask}
        setTask={setTask}
        updatedTask={updatedTask}
      ></ListTasks>
    </section>
  );
};

export default Formulario;
