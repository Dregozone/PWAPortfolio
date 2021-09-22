
//get elements referenced in code
let txtName = document.getElementById('name');
let txtNumber = document.getElementById('number') ;
let txtPeople = document.getElementById("people");
let btnAdd = document.getElementById('add');

//add event listener to button
btnAdd.addEventListener('click', addEntry);

//reference to directory
let directory = [];

if ("directory" in localStorage) {
    directory = JSON.parse(localStorage.getItem('directory'));
    showEntries();
}

function showEntries() {
    txtPeople.value = "";
    for (let i = 0; i < directory.length; i++) {
        txtPeople.value += directory[i].name + "\t" +
            directory[i].number + "\n";
    }
}

function addEntry() {
    const entry = {
        "name": txtName.value,
        "number": txtNumber.value
    };
    directory.push(entry);
    localStorage.setItem('directory',
        JSON.stringify(directory));
    showEntries();
}
