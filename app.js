const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  fs.readdir(`./hisaab`, function (err, files) {
    if (err) return res.status(500).send(err)
    res.render("index", { files: files })
    // we can pass the data in index to we are passing the files with the name of files
  })
  // check every page by render ==> index,hisaab,edit,index

})


app.get("/create", (req, res) => {
  res.render("create")

})


app.get("/edit/:filename", (req, res) => {
  // we want to show the name and data of the file 
  fs.readFile(`./hisaab/${req.params.filename}`, "utf-8", function (err, filedata) {
    if (err) return res.status(500).send(err);
    res.render("edit", { filedata, filename: req.params.filename })
  })
})


app.post("/update/:filename", (req, res) => {
  fs.writeFile(`./hisaab/${req.params.filename}`, req.body.content, function (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/")

  })
})


app.get("/hisaab/:filename", function (req, res) {
  fs.readFile(`./hisaab/${req.params.filename}`, "utf-8", function (err, filedata) {
    if (err) return res.status(500).send(err);
    res.render("hisaab", { filedata, filename: req.params.filename });
    // here we are rendering the data to hisaab page
  })
})




app.get("/delete/:filename", function (req, res) {
  fs.unlink(`./hisaab/${req.params.filename}`, function (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/")
  })
})





app.post("/createhisaab", (req, res) => {

  let currentDate = new Date();
  let date = `${currentDate.getDate()}- ${currentDate.getMonth() + 1}-${currentDate.getFullYear()} `

  //  res.send(req.body) // to check the data and on the basis of this data we have to create a new file 
  fs.writeFile(`./hisaab/${date}.txt`, req.body.content, function (err) {
    if (err) return res.status(500).send(err);
    else {
      res.redirect('/')
    }
  })
  //  create the file in hisaab folder or 

})
app.listen(3000)