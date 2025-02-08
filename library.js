import { Author, Book } from "./es6classes.js";

//first div
const FIga = document.getElementById("Figa");
const valueCounter = document.getElementById("counter");
const Gobtn = document.getElementById("submitbtn");

//second div
const DivForm = document.getElementById("divForm");
const Form = document.getElementById("formID");
const addbtn = document.getElementById("addbtn");

//third Div
const divTable = document.getElementById("divTable");
const tableId = document.getElementById("tableId");
const tablebody = document.querySelector("#tableId tbody");

//Logic
DivForm.style.display = "none";
divTable.style.display = "none";
let NumberOfEntry = 0;
let books = [];


Gobtn.addEventListener("click", function () {
    const maxEntries = parseInt(valueCounter.value);
    if (isNaN(maxEntries) || maxEntries <= 0) {
        alert("Please enter a valid number of books.");
        return;
    }
    FIga.style.display = "none";
    DivForm.style.display = "block";
});

addbtn.addEventListener("click", function (event) {
    event.preventDefault();
    const Bookname = document.getElementById("name").value;
    const Bookprice = document.getElementById("price").value;
    const authname = document.getElementById("authName").value;
    const AuthEmail = document.getElementById("AuthEmail").value;

    if (!validateInputs(Bookname, Bookprice, authname, AuthEmail)) {
        return;
    }
    const auth = new Author(authname, AuthEmail);
    const book = new Book(Bookname, Bookprice, auth);
    books.push(book);
    console.log(books);
    NumberOfEntry++;

    if (NumberOfEntry == valueCounter.value) {
        displayTable();
        DivForm.style.display = "none";
    }
});

function displayTable() {
    divTable.style.display = "block";
    books.forEach((book, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>${book.author.name}</td>
            <td>${book.author.email}</td>
            <td>
                <button class="editbtn">Edit</button>
                <button class= "savebtn" style="display: none;">Save</button>
                <button class= "cancelbtn" style="display: none;">Cancel</button>
                <button class="deletebtn">Delete</button>
            </td>`;
        tablebody.appendChild(row);

        const editbtn = row.querySelector(".editbtn");
        const savebtn = row.querySelector(".savebtn");
        const cancelbtn = row.querySelector(".cancelbtn");
        const deletebtn = row.querySelector(".deletebtn");

        editbtn.addEventListener("click", function () {
            editBook(index, this);
        });
        savebtn.addEventListener("click", function () {
            saveRow(index, this);
        });
        cancelbtn.addEventListener("click", function () {
            cancelEdit(index,this);
        });
        deletebtn.addEventListener("click", function () {
            deleteBook(index, this);
        });

    });
}
function editBook(index, btn) {
    const row = btn.parentNode.parentNode;
    const cells = row.querySelectorAll("td");

    cells.forEach((td, i) => {
        if (i < 4) td.contentEditable = "true";
    });
    btn.style.display = "none";
    row.querySelector(".deletebtn").style.display="none";
    row.querySelector(".savebtn").style.display = "inline-block";
    row.querySelector(".cancelbtn").style.display = "inline-block";
}
function saveRow(index, btn) {
    const row = btn.parentNode.parentNode;
    const cells = row.querySelectorAll("td");
    console.log(books);

    if (!validateInputs(cells[0].innerText, cells[1].innerText, cells[2].innerText, cells[3].innerText)) {
        return;
    }

    books[index].name = cells[0].innerText;
    books[index].price = cells[1].innerText;
    books[index].author.name = cells[2].innerText;
    books[index].author.email = cells[3].innerText;
    cells.forEach((td, i) => {
        if (i < 4)
            td.contentEditable = "false";
    });
    btn.style.display = "none";
    row.querySelector(".deletebtn").style.display="inline-block";
    row.querySelector(".cancelbtn").style.display = "none";
    row.querySelector(".editbtn").style.display = "inline-block";
    console.log(books);
}
function cancelEdit(index,btn)
{
    const row = btn.parentNode.parentNode;
    const cells = row.querySelectorAll("td");

    let olddata={
        Bookname:books[index].name,
        bookprice:books[index].price,
        Aname:books[index].author.name,
        Aemail:books[index].author.email,
    }
    cells[0].innerText = olddata.Bookname;
    cells[1].innerText = olddata.bookprice;
    cells[2].innerText = olddata.Aname;
    cells[3].innerText = olddata.Aemail;

    cells.forEach((td, i) => {
        if (i < 4) 
            td.contentEditable = "false";
    });

    btn.style.display = "none";
    row.querySelector(".savebtn").style.display = "none";
    row.querySelector(".deletebtn").style.display="inline-block";
    row.querySelector(".editbtn").style.display = "inline-block";

    console.log(books);
}
function deleteBook(index, btn) {
    books.splice(index, 1);
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);

    tablebody.innerHTML = "";
    displayTable();

    console.log(books);
}
function validateInputs(name, price, author, email) {
    if (!name || !price || !author || !email) {
        alert("All fields are required.");
        return false;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
        alert("Price must be a valid positive number.");
        return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[A-Za-z ]+$/;
    if (!namePattern.test(name)) {
        alert("Book name must contain only alphabetic characters.");
        return false;
    }
    if (!namePattern.test(author)) {
        alert("Author name must contain only alphabetic characters.");
        return false;
    }
    if (!emailPattern.test(email)) {
        alert("Invalid email format.");
        return false;
    }
    return true;
}










