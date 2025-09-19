const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = "data/tasks.json";


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const readTasks = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
};

const writeTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

app.get("/api/tasks", (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Could not read tasks" });
  }
});

app.post("/api/tasks", (req, res) => {
  const { title, description, priority } = req.body;
  const priorities = ["low", "medium", "high", "urgent"];

  if (!title || !priority) {
    return res.status(400).json({ error: "Title and priority are required" });
  }
  if (!priorities.includes(priority)) {
    return res.status(400).json({ error: "Invalid priority value" });
  }

  const tasks = readTasks();

  const newTask = {
    taskId: "TASK-" + Date.now(),
    title,
    description: description || "",
    priority,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

// Default route
app.get("/", (req, res) => {
  res.send("TaskFlow API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});
