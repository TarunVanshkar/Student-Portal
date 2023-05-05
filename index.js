// import data from './MOCK_DATA.json';

const tbody = document.querySelector(".table-container table tbody");
var data = [];
(async function x(){
    try{
        const response = await fetch ("MOCK_DATA.json");
        data = await response.json()
        renderTable(data)
    }
    catch(e){
        console.log(e)
    }
})()

function renderTable(objectList)
{
    let innerTableContent = ""
        objectList.map((content) => {
            let passingStatus = content.passing==false ? "Failed" : "Passing";
            innerTableContent += `<tr>
                                        <td>${content.id}</td>
                                        <td id="name-container">
                                            <img src="${content.img_src}" alt="" class="img">
                                            <span>${content.first_name} ${content.last_name
                                            }</span>
                                        </td>
                                        <td>${content.gender}</td>
                                        <td>${content.class}</td>
                                        <td>${content.marks}</td>
                                        <td>${passingStatus}</td>
                                        <td>${content.email}</td>
                                    </tr>`
            
        })
        tbody.innerHTML += innerTableContent
}

// Implementation of search function
const searchInputBox = document.querySelector(".box-container .search-container input")
const searchButton = document.querySelector(".box-container .search-container button")
function searchTable(){
    const inputValue = searchInputBox.value.toLowerCase();
    // console.log(inputValue)
    const filteredData = data.filter((currentData) => {
        const fullName = `${currentData.first_name} ${currentData.last_name}`;
        return fullName.toLowerCase().includes(inputValue) || currentData.email.toLowerCase().includes(inputValue);
    })
    tbody.innerHTML = '';
    renderTable(filteredData)
}

searchInputBox.addEventListener("input", searchTable)
searchButton.addEventListener("click", searchTable)

// Implementation of sorting functions
const sortContainer = document.getElementsByClassName("sort-button-container");
// console.log(sortContainer[0].children[0])

function sortAZ(){
    let sortedAZ = data.sort((a, b) => {
        return a.first_name.localeCompare(b.first_name)
    });
    tbody.innerHTML = '';
    renderTable(sortedAZ)
}

function sortZA(){
    let sortedZA = data.sort((a, b) => {
        return b.first_name.localeCompare(a.first_name)
    });
    tbody.innerHTML = '';
    renderTable(sortedZA)
}

function sortMarks(){
    let sortMarks = data.sort((a, b) => {
        return a.marks - b.marks
    });
    tbody.innerHTML = '';
    renderTable(sortMarks)
}

function sortPassing(){
    let sortPassing = data.filter((element) => {
        return element.passing;
    });
    tbody.innerHTML = '';
    renderTable(sortPassing)
}

function sortClass(){
    let sortClass = data.sort((a, b) => {
        return a.class - b.class      // Ascending Order
    });
    tbody.innerHTML = '';
    renderTable(sortClass)
}

function sortGender(){
    let sortGenderMale = data.filter((element) => {
        return element.gender == "Male";
    });
    tbody.innerHTML = '';
    renderTable(sortGenderMale)

    let sortGenderFemale = data.filter((element) => {
        return element.gender == "Female";
    });

    renderTable(sortGenderFemale)
}


sortContainer[0].children[0].addEventListener("click", sortAZ)
sortContainer[0].children[1].addEventListener("click", sortZA)
sortContainer[0].children[2].addEventListener("click", sortMarks)
sortContainer[0].children[3].addEventListener("click", sortPassing)
sortContainer[0].children[4].addEventListener("click", sortClass)
sortContainer[0].children[5].addEventListener("click", sortGender)