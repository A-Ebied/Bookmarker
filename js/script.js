var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("tableBody");

var bookMarks;
var mainIndex = 0;

if (localStorage.getItem("bookMarks") == null) {
  bookMarks = [];
} else {
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  displayBook(bookMarks);
}

var nameRegex = /^[a-z_]{1,}$/i;
function isNameValid() {
  if (nameRegex.test(siteName.value)) {
    return true;
  } else {
    return false;
  }
}
var urlRegex = /^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/i;
function isUrlValid() {
  if (urlRegex.test(siteUrl.value)) {
    return true;
  } else {
    return false;
  }
}

siteName.onkeyup = function () {
  if (isUrlValid() && isNameValid()) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true";
  }
};

siteUrl.onkeyup = function () {
  if (isUrlValid() && isNameValid()) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true";
  }
};

addBtn.onclick = function () {
  var bookMark = {
    name: siteName.value,
    url: siteUrl.value,
  };
  if (addBtn.innerHTML == "Update") {
    addBtn.innerHTML = "Submit";
    bookMarks.splice(mainIndex, 1, bookMark);
  } else {
    bookMarks.push(bookMark);
  }

  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  displayBook(bookMarks);
  clearData();
};

function displayBook(anyArray) {
  var marks = ``;
  for (var i = 0; i < anyArray.length; i++) {
    marks += `
            <tr>
                <td>${anyArray[i].name}</td>
                <td><a href="${
                  "https://" + anyArray[i].url
                }" target="_blank" class="btn">Visit</a></td>
                <td><button onclick="updateBook(${i})" class="btn btn--warning">Update</button></td>
                <td><button onclick="deleteBook(${i})" class="btn btn--danger">Delete</button></td>
            </tr>
        `;
  }
  tableBody.innerHTML = marks;
}

function deleteBook(index) {
  bookMarks.splice(index, 1);
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  displayBook(bookMarks);
}

function clearData() {
  siteName.value = "";
  siteUrl.value = "";
}

function updateBook(index) {
  siteName.value = bookMarks[index].name;
  siteUrl.value = bookMarks[index].url;
  addBtn.innerHTML = "Update";
  mainIndex = index;
}

function search(term) {
  var wantedBook = [];
  for (var i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].name.toLowerCase().includes(term.toLowerCase())) {
      wantedBook.push(bookMarks[i]);
    }
  }
  displayBook(wantedBook);
}
