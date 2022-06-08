const booksParent = document.querySelector(".books");
const filterInputs = {
    name : document.querySelector("[data-filter-name]"),
    author : document.querySelector("[data-filter-author]"),
    description : document.querySelector("[data-filter-description]"),
    cover : document.querySelector("[data-add-cover]")
}
const addInputs = {
    name : document.querySelector("[data-add-name]"),
    author : document.querySelector("[data-add-author]"),
    description : document.querySelector("[data-add-description]"),
    cover : document.querySelector("[data-add-cover]")
}

let booksObj = {
    "123" : {
        name: "The Useless Book",
        description : "This is just a sample book. try adding some and removing others.",
        author : "me",
        cover : "../media/cover.png"
    }
}

function Book(name, author, description, cover){this.name = name;this.author = author;this.description = description;this.cover = cover;}

let showBook = function(id){
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("data-book", id);
    bookDiv.setAttribute("class", "book card");

    const bookCover = document.createElement("div");
    bookCover.setAttribute("class", "cover");
    bookCover.style.cssText = `background-image: url("${booksObj[id].cover}");width: 100%;height:200px;background-size: cover;`;
    bookDiv.appendChild(bookCover);

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = booksObj[id].name;
    bookDiv.appendChild(bookTitle);

    const bookDescription = document.createElement("p");
    bookDescription.textContent = booksObj[id].description;
    bookDiv.appendChild(bookDescription);

    const bookbutton = document.createElement("button");
    bookbutton.textContent = "Delete Book";
    bookbutton.setAttribute("data-delete-book", id);
    bookDiv.appendChild(bookbutton);

    booksParent.appendChild(bookDiv);
}

let deleteBook = (id)=>{
    delete booksObj[id];
    document.querySelector(`[data-book="${id}"]`).remove();
}

let addBook = (name, author, description, cover)=>{
    let book = new Book(name, author, description, cover);

    let id = Math.floor(Math.random()*9999999);
    while(booksObj.hasOwnProperty(id)){id = Math.floor(Math.random()*9999999);}
    booksObj[id] = book;
}

let addBooksToView = ()=>{
    //clear
    Array.from(booksParent.children).forEach(child=>{child.remove();})

    //show filtered
    const booksFilterObj = {
        name : filterInputs.name.value,
        author : filterInputs.author.value,
        description : filterInputs.description.value,
        cover : filterInputs.cover.value
    }

    for (const bookID in booksObj) {
        if (booksObj.hasOwnProperty(bookID)) {
            // console.log(`ID: ${bookID}`);

            let belons = true;
            for (const BookProp in booksObj[bookID]) {
                // console.log(`book.prop: ${BookProp}`);
                if (booksObj[bookID].hasOwnProperty(BookProp)) {
                    if(!booksObj[bookID][BookProp].includes(booksFilterObj[BookProp]) && booksFilterObj[BookProp] != ""){
                        belons=false;break;
                    }
                }
            }
            
            // console.log(`belongs: ${belons}`);
            if(belons){showBook(bookID);}
        }
    }
}

addBooksToView();


document.addEventListener("click", (e)=>{
    if(e.target == e.target.currentTarget){return;}
    
    if(e.target.hasAttribute("data-delete-book")){
        deleteBook(e.target.getAttribute("data-delete-book"));
        addBooksToView();
    }else if(e.target == document.querySelector("[data-add-book]")){
        addBook(addInputs.name.value, addInputs.author.value, addInputs.description.value, addInputs.cover.value);
        addBooksToView();
    }else if(e.target == document.querySelector("[data-filter-book]")){
        addBooksToView();
    }
})