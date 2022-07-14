const express = require("express");

const mongoose = require("mongoose")

require('dotenv').config()

const app = express();

const Task = require("./model/Task")

app.use(express.json());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI,()=>{
  console.log("connected to mongo db database....")
})

//create a task
app.post("/tasks", async(req, res) => {
 

  const task = new Task({
    id :req.body.id,
    title:req.body.title,
    description :req.body.description,
    priority :req.body.priority,
    emoji :req.body.emoji,
 })

   const SavedTask = await task.save();

   res.json({
    'status':'success',
    'data': SavedTask
   })
});
//to read all task
app.get("/tasks",  async(req, res) => {

  const allTasks = await Task.find();

  res.json({
    status: "success",
    data: allTasks,
  });
});
//read specific task
app.post("/get_task", async(req, res) => {
  const id = req.body.id;

  const specificTask = await Task.findOne({id: id});

 
  res.json({
    status: "success",
    data: specificTask,
  });
});

//Delete all tasks

app.post("/delete_tasks", async(req, res) => {
  
  const result = await Task.deleteMany();

  res.json({
    status:"success",
    message: "successfully deleted all tasks",
    data: result,
  });
 
});
//Delete specific task by id

app.post("/delete_task", async (req, res) => {
  const id = req.body.id;

  const result = await Task.deleteOne({id:id});

res.json({
    status: "success",
    message: " successfully deleted task with id:$(id)",
    data:result ,
  });
});

//update task

app.post("/update_task", async(req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const priority = req.body.priority;
  const emoji = req.body.emoji;

  const updateResult = await Task.updateOne({id:id},{

  $set:{
    title: title,
    description: description,
    priority: priority,
    emoji: emoji,
  }

  })


res.json({
    status: "success",
    message: " task updated successfully",
    data: updateResult,
  });
});

app.listen(PORT, () => {
  console.log("wow! server is running on port ", PORT);
});
