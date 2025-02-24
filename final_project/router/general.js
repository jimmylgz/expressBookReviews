const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  res.send(JSON.stringify(books[isbn]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const req_author = req.params.author;

  function findBooksByAuthor(authorName) {
    const result = [];
    for (const isbn in books) {
        if (books[isbn].author === authorName) {
            result.push({isbn, ...books[isbn]});
            }
        }
        return result;
  }


  const booksByReqAuthor = findBooksByAuthor(req_author);

  res.send(JSON.stringify(booksByReqAuthor, null, 4));
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const req_title = req.params.title;

  function findBooksByTitle(titleName) {
    const result = [];
    for (const isbn in books) {
        if (books[isbn].title === titleName) {
            result.push({isbn, ...books[isbn]});
            }
        }
        return result;
    }

    const booksByReqTitle = findBooksByTitle(req_title);

    res.send(JSON.stringify(booksByReqTitle, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  const req_book = books[isbn];
//   res.send(JSON.stringify(req_book[review]));
  res.send(req_book["reviews"]);
  
});

module.exports.general = public_users;
