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
    FIga.style.display = "none";
    DivForm.style.display = "block";
});

addbtn.addEventListener("click", function (event) {
    event.preventDefault();
    const Bookname = document.getElementById("name").value;
    const Bookprice = document.getElementById("price").value;
    const authname = document.getElementById("authName").value;
    const AuthEmail = document.getElementById("AuthEmail").value;

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
        const row = `<tr>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td>${book.author.name}</td>
            <td>${book.author.email}</td>
            <td>
                <button id="editbtn">Edit</button>
                <button id="deletebtn">Delete</button>
            </td>
        </tr>`;
        tablebody.innerHTML += row;
        const editbtn = document.getElementById("editbtn");
        const deletebtn = document.getElementById("deletebtn");
        editbtn.addEventListener("click", function () {
            editBook(index, this);
        });
        deletebtn.addEventListener("click", function () {
            deleteBook(index,this);
        });

    });
}
function editBook(index, btn) {
    var savebtn = document.getElementById("editbtn");
    var cancelbtn = document.getElementById("deletebtn");
    savebtn.textContent = "Save";
    cancelbtn.textContent = "Cancel";

    const row = btn.parentNode.parentNode;
    const cells = row.querySelectorAll("td");


    let oldData = {
        Aname: cells[0].innerText,
        Aemail: cells[1].innerText,
        BookName: cells[2].innerText,
        BookPrice: cells[3].innerText
    };

    cells.forEach(td => {
        td.setAttribute('contenteditable', true);
    });
    let AnameCell = row.cells[0];
    let AemailCell = row.cells[1];
    let BookNameCell = row.cells[2];
    let BookpriceCell = row.cells[3];
    savebtn.addEventListener("click", function () {
        books[index].author.name = AnameCell.innerText;
        books[index].author.email = AemailCell.innerText;
        books[index].name = BookNameCell.innerText;
        books[index].price = BookpriceCell.innerText;
        cells.forEach(td => td.setAttribute('contenteditable', false));
        savebtn.textContent = "Edit";
        cancelbtn.textContent = "Delete";
    });
    cancelbtn.addEventListener("click",function(){
        AnameCell.innerText = oldData.Aname;
        AemailCell.innerText = oldData.Aemail;
        BookNameCell.innerText = oldData.BookName;
        BookpriceCell.innerText = oldData.BookPrice;

        cells.forEach(td => {
            
            td.setAttribute('contenteditable', false);
        });
        savebtn.textContent = "Edit";
        cancelbtn.textContent="delete";
    });
}

function deleteBook(index,btn) {
    books.splice(index, 1);
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}











