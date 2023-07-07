const URL_TASKS = import.meta.env.VITE_API_TASKS;

export const getTasks = async () => {
  try {
    const response = await fetch(URL_TASKS);
    const listTasks = await response.json();
    return listTasks;
  } catch (error) {
    console.log(error);
  }
};

export const getTask = async (id) => {
  try {
    const response = await fetch(`${URL_TASKS}/${id}`);
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(`${URL_TASKS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await fetch(`${URL_TASKS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteConsultTask = async (id) => {
  try {
    const response = await fetch(`${URL_TASKS}/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
