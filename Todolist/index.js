const http = require("http");
const path = require("path");
const express = require("express");
const port = 9000;
const app = express();
// const fs = require("fs");

// function requestHandler(req, res) {
//   console.log(req.url);
//   res.writeHead(200, { "content-type": "text/html" });

//   let filePath;

//   switch (req.url) {
//     case "/":
//       filePath = "./index.html";
//       break;
//     case "/profile":
//       filePath = "./profile.html";
//       break;
//     default:
//       filePath = "./404.html";
//   }

//   fs.readFile(filePath, function (err, data) {
//     if (err) {
//       console.log("error", err);
//       return res.end("<h1>Error!</h1>");
//     }
//     return res.end(data);
//   });
// }

// const server = http.createServer(requestHandler);
// server.listen(port, function (err) {

//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log("Server is up and running on port:", port);
// });
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

//middleware 1
// app.use(function (req, res, next) {
//   req.myName = "Priya";
//   // console.log("middleware 1 called");
//   next();
// });

// //middleware 2
// app.use(function (req, res, next) {
//   console.log("My name from MW2", req.myName);
//   // console.log("middleware 2 called");
//   next();
// });

var contactList = [
  {
    name: "Arpan",
    phone: "1111111111",
  },
  {
    name: "Tony Stark",
    phone: "1234567890",
  },
  {
    name: "Coding Ninjas",
    phone: "234854609",
  },
];
app.get("/", function (req, res) {
  // console.log("from the get route controller", req.myName);
  // res.send("Cool, it is running or is it?");
  return res.render("home", {
    title: "Contacts List",
    contacts_list: contactList,
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", { title: "Let's Practice" });
});

app.post("/create-contact", function (req, res) {
  //  return res.redirect('/practice');
  // console.log(req.body);
  // console.log(req.body.name);
  // console.log(req.body.phone);

  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone,
  // });
  contactList.push(req.body);
  // return res.redirect("/");
  return res.redirect("back");
});

//for deletiing a contact
app.get("/delete-contact/", function (req, res) {
  // console.log(req.query);
  //get the query from the url
  let phone = req.query.phone;

  let contactIndex = contactList.findIndex((contact) => contact.phone == phone);

  if (contactIndex != -1) {
    contactList.splice(contactIndex, 1);
  }
  return res.redirect("back");
});
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Yup! My Express Server is running on port:", port);
});
