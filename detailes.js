var idOfBook = window.location.href.split("?")[1].split("=")[1];
var cartCounter = window.location.href.split("?")[2].split("=")[1];
// console.log(idOfBook);
// console.log(cartCounter);
var xhr = new XMLHttpRequest();
xhr.open("GET", `https://www.googleapis.com/books/v1/volumes/${idOfBook}`);
xhr.send();
xhr.onprogress = function () {
  console.log(`data is loading`);
};
xhr.onerror = function () {
  console.log(`failed fetching data `);
};

var bookImg = document.getElementById("bookImg");
var bookTitle = document.getElementById("bookTitle");
var bookDesc = document.getElementById("bookDesc");
var author = document.getElementById("author");
var Publisher = document.getElementById("Publisher");
var PublishedDate = document.getElementById("PublishedDate");
var cart = document.getElementById("cart");

xhr.onload = function () {
  var booksDataObj = JSON.parse(xhr.response);
  // console.log(booksDataObj);

  bookImg.src = `${booksDataObj.volumeInfo.imageLinks.thumbnail}`;
  bookTitle.innerHTML = `${booksDataObj.volumeInfo.title}`;
  bookDesc.innerHTML = `${booksDataObj.volumeInfo.description}`;
  author.innerHTML = `Authors : ${booksDataObj.volumeInfo.authors}`;
  Publisher.innerHTML = `Publisher : ${booksDataObj.volumeInfo.publisher}`;
  PublishedDate.innerHTML = `Published Date : ${booksDataObj.volumeInfo.publishedDate}`;
  cart.innerHTML = `CART : ${cartCounter}`;
};
