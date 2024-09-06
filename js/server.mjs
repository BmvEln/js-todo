import {name_db, projectSecret} from "./api.mjs";

const baseUrl = `https://${projectSecret}.mockapi.io/${name_db}`;

export const getTasksList = async () => {
  try {
    const response = await fetch(baseUrl);
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const createTask = async (task) => {
  try {
    return await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(task),
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const deleteTask = (taskId) =>
  fetch(`${baseUrl}/${taskId}`, { method: "DELETE" });

export const updateTask = (taskId, taskData) =>
  fetch(`${baseUrl}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(taskData),
  });
