var xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://www.googleapis.com/books/v1/volumes?q=software+development"
);
xhr.send();
xhr.onerror = function () {
  // console.log(`failed fetching data `);
  categoryOfBooks.style.display = "none";
  booksContainer.innerHTML = `<img class= 'failedImg' src='https://tse4.explicit.bing.net/th?id=OIP.u37EUyyar1ifd6wSKiB5IAAAAA&pid=Api&P=0&h=220'>`;
};
xhr.onprogress = function () {
  // console.log(`data is loading`);
  booksContainer.innerHTML = `<img class= 'loadingImg' src='https://tse2.mm.bing.net/th?id=OIP.Ek1g4htdtpt1UuxM-pihdgHaCx&pid=Api&P=0&h=220'>`;
  categoryOfBooks.style.display = "block";
};
xhr.onload = function () {
  var booksDataObj = JSON.parse(xhr.response);
  var booksDataArr = booksDataObj.items;
  // console.log(booksDataArr);
  showBooks(booksDataArr);
};

var booksContainer = document.getElementById("booksContainer");
var categoryOfBooks = document.getElementById("categoryOfBooks");
// console.log(booksContainer);
// console.log(categoryOfBooks);

//******************** Showing Books Functionality ********************
function showBooks(arrOfBooks, inputValHeader = "Software development") {
  categoryOfBooks.innerHTML = `${inputValHeader.toLowerCase()} Books`;
  booksContainer.innerHTML = ``;
  var cartCounter = 0;
  if (arrOfBooks) {
    arrOfBooks.forEach((book) => {
      if (book.volumeInfo.description == undefined) {
        book.volumeInfo.description = `Not found description`;
      }
      if (book.volumeInfo.authors == undefined) {
        book.volumeInfo.authors = `Not found Author`;
      }
      var bookCard = document.createElement("div");
      bookCard.setAttribute("class", "bookCard");

      var imgContainer = document.createElement("div");
      imgContainer.setAttribute("class", "imgContainer");
      // console.log(book.volumeInfo.imageLinks.thumbnail);

      var bookImg = document.createElement("img");
      bookImg.setAttribute("src", `${book.volumeInfo.imageLinks.thumbnail}`);
      bookImg.setAttribute("alt", "img");
      imgContainer.append(bookImg);

      var bookTitle = document.createElement("h3");
      bookTitle.setAttribute("class", "bookTitle");
      // bookTitle.innerHTML = `Book title : ${book.volumeInfo.title}`;
      bookTitle.innerHTML = `${book.volumeInfo.title}`;

      var bookDesc = document.createElement("p");
      bookDesc.setAttribute("class", "bookDesc");
      bookDesc.innerHTML = `${book.volumeInfo.description}`;
      // bookDesc.innerHTML = `Book Description : ${book.volumeInfo.description}`;

      var bookAuthor = document.createElement("h4");
      bookAuthor.setAttribute("class", "authorName");
      bookAuthor.innerHTML = `Author : ${book.volumeInfo.authors}`;
      // bookAuthor.innerHTML = `Book Author : ${book.volumeInfo.authors}`;

      var showDetailBtn = document.createElement("button");
      showDetailBtn.setAttribute("id", "detailesBtn");
      showDetailBtn.setAttribute("target", "_blank");
      showDetailBtn.innerHTML = `Show Detailes`;

      showDetailBtn.addEventListener("click", function () {
        window.location.href = `detailes.html?id=${book.id}?cart=${cartCounter}`;
      });

      var cartBtn = document.createElement("button");
      cartBtn.setAttribute("id", "cartBtn");
      cartBtn.innerHTML = `Add to Cart`;

      var cartBtnRemove = document.createElement("button");
      cartBtnRemove.setAttribute("id", "cartBtnRemove");
      cartBtnRemove.innerHTML = `Reomve`;

      var cartNav = document.getElementById("cartNav");

      cartBtn.addEventListener("click", function () {
        cartCounter++;
        // console.log(cartCounter);
        cartNav.innerHTML = `CART : ${cartCounter}`;
      });
      cartBtnRemove.addEventListener("click", function () {
        if (cartCounter > 0) {
          cartCounter--;
          // console.log(cartCounter);
          cartNav.innerHTML = `CART : ${cartCounter}`;
        }
      });
      bookCard.append(
        imgContainer,
        bookTitle,
        bookDesc,
        bookAuthor,
        showDetailBtn,
        cartBtn,
        cartBtnRemove
      );
      booksContainer.append(bookCard);
    });
  } else {
    categoryOfBooks.style.display = "none";
    booksContainer.innerHTML = `<img class= 'failedImg' src='https://tse1.mm.bing.net/th?id=OIP.dCYjOfpMyYr1FXc04GN3GQHaDA&pid=Api&P=0&h=220'>`;
  }
}

//******************** Searching Functionality ********************
var searchInput = document.getElementById("searchInput");
// console.log(searchInput);
var searchBtn = document.getElementById("searchBtn");
var errorInputVal = document.getElementById("errorInputVal");

var xhr1 = new XMLHttpRequest();

searchBtn.addEventListener("click", function () {
  categoryOfBooks.innerHTML = "";
  categoryOfBooks.style.display = "block";
  booksContainer.innerHTML = "";
  var searchInputVal = searchInput.value.trim();
  if (searchInputVal != "" && searchInputVal.length != 0) {
    errorInputVal.style.display = "none";
    xhr1.open(
      "GET",
      `https://www.googleapis.com/books/v1/volumes?q=${searchInputVal
        .toLowerCase()
        .trim()}`
    );
    xhr1.send();
    xhr1.onprogress = function () {
      // console.log(`data is loading`);
      categoryOfBooks.style.display = "block";
      booksContainer.innerHTML = `<img class= 'loadingImg' src='https://tse2.mm.bing.net/th?id=OIP.Ek1g4htdtpt1UuxM-pihdgHaCx&pid=Api&P=0&h=220'>`;
    };
    xhr1.onerror = function () {
      // console.log(`failed fetching data `);
      categoryOfBooks.style.display = "none";
      booksContainer.innerHTML = `<img class= 'failedImg' src='https://tse4.explicit.bing.net/th?id=OIP.u37EUyyar1ifd6wSKiB5IAAAAA&pid=Api&P=0&h=220'>`;
    };
    xhr1.onload = function () {
      var searchBooksDataObj = JSON.parse(xhr1.response);
      var searchBooksDataArr = searchBooksDataObj.items;
      // console.log(searchBooksDataArr);
      showBooks(searchBooksDataArr, searchInputVal);
    };
  } else {
    errorInputVal.style.display = "block";
    categoryOfBooks.style.display = "none";
  }
  searchInput.focus();
});
