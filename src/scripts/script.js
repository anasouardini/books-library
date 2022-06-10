const booksModule = (()=>{
    const DOM = {
        _booksParent : document.querySelector(".books"),
        filterInputs : {
            name        : document.querySelector("[data-filter-name]"),
            author      : document.querySelector("[data-filter-author]"),
            description : document.querySelector("[data-filter-description]")        },
        addInputs : {
            name        : document.querySelector("[data-add-name]"),
            author      : document.querySelector("[data-add-author]"),
            description : document.querySelector("[data-add-description]"),
            cover       : document.querySelector("[data-add-cover]")
        }
    }
    
    let _booksObj = {
        "123" : {
            name: "The Useless Book",
            author : "me",
            description : "This is just a sample book. try adding some and removing others.",
            cover : "https://source.unsplash.com/random/600x500"
        }
    }

    //factory
    function _Book(name, author, description, cover){return {name, author, description, cover}}
    
    let createBook = ()=>{
        let book = _Book(
                DOM.addInputs.name.value,
                DOM.addInputs.author.value,
                DOM.addInputs.description.value,
                DOM.addInputs.cover.value
            );
    
        let id = Math.floor(Math.random()*9999999);
        while(_booksObj.hasOwnProperty(id)){id = Math.floor(Math.random()*9999999);}
        _booksObj[id] = book;
    }
    
    let deleteBook = (bookID)=>{delete _booksObj[bookID];}

    let _createBook_DOM = id=>{
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("data-book", id);
        bookDiv.setAttribute("class", "book card");
    
        const bookCover = document.createElement("div");
        bookCover.setAttribute("class", "cover");
        bookCover.style.cssText = `background-image: url("${_booksObj[id].cover}");width: 100%;height:200px;background-size: cover;`;
        bookDiv.appendChild(bookCover);
    
        const bookTitle = document.createElement("h3");
        bookTitle.textContent = _booksObj[id].name;
        bookDiv.appendChild(bookTitle);
    
        const bookDescription = document.createElement("p");
        bookDescription.textContent = _booksObj[id].description;
        bookDiv.appendChild(bookDescription);
    
        const bookbutton = document.createElement("button");
        bookbutton.textContent = "Delete Book";
        bookbutton.setAttribute("data-delete-book", id);
        bookDiv.appendChild(bookbutton);
    
        DOM._booksParent.appendChild(bookDiv);
    }
    
    let addBooksToView = ()=>{
    
        //clear
        Array.from(DOM._booksParent.children).forEach(child=>{child.remove();})
    
        //show filtered
        const booksFilterObj = {
            name : DOM.filterInputs.name.value,
            author : DOM.filterInputs.author.value,
            description : DOM.filterInputs.description.value
        }
    
        for (const bookID in _booksObj) {
            if (_booksObj.hasOwnProperty(bookID)) {
                let belons = true;
                for (const BookProp in booksFilterObj) {
                    if (_booksObj[bookID].hasOwnProperty(BookProp)) {
                        if(booksFilterObj[BookProp] != "" && !_booksObj[bookID][BookProp].toLowerCase().includes(booksFilterObj[BookProp].toLowerCase())){
                            belons=false;break;
                        }
                    }
                }
                
                if(belons){_createBook_DOM(bookID);}
            }
        }
    }

    return {
        addBooksToView,
        createBook,
        deleteBook,
        DOM : {
            addInputs:DOM.addInputs,
            filterInputs:DOM.filterInputs
        }
    };
})()

booksModule.addBooksToView();

document.addEventListener("click", (e)=>{
    if(e.target == e.target.currentTarget){return;}
    
    if(e.target.hasAttribute("data-delete-book")){
        booksModule.deleteBook(e.target.getAttribute("data-delete-book"));
        booksModule.addBooksToView();
    }else if(e.target == document.querySelector("[data-add-book]")){
        booksModule.createBook();
        booksModule.addBooksToView();
    }else if(e.target == document.querySelector("[data-filter-book]")){
        booksModule.addBooksToView();
    }
})

//============================


let nameSpace = (()=>{
    
    let _vlidate = ()=>{console.log("valid")};//private
    let getInput = ()=>{alert();_vlidate();};//public

    return {//namespace
        getInput//closure
    }
})()

// nameSpace.getInput();

//============================

//private/public, closures, namespacing, composition, factory-function
let doNameSpace = (()=>{

    const _logThis = (thing)=>{console.log(thing)};

    const factoryFunc = (name) => ({name});

    const doer = () => ({
        do : function(verb){_logThis(`name is: ${this.name}`)}
    });
    
    const undoer = () => ({
        undo : function(verb){_logThis(`${this.name} is un${verb}ing...`)}
    });

    return {doer, undoer, factoryFunc};
})()


let doIns = Object.assign(
                        {},
                        doNameSpace.factoryFunc("doer only"),
                        doNameSpace.doer()
                    );

let doUndoInst = Object.assign(
                        {},
                        doNameSpace.factoryFunc("doer & undoer"),
                        doNameSpace.doer(),
                        doNameSpace.undoer()
                    );

// console.log(doIns);

doIns.do("eat");



