let rootNode = document.getElementById('root');
let users = new Set();
let loadingFinished = false;

window.onload = () => {
    users = new Set(JSON.parse(localStorage.getItem('usernames')));
    for (let user of users){
            getDetails(user);
    }
    loadingFinished = true;
}

function addUser() {
    let username = document.getElementById('username').value;
    document.getElementById('username').value = '';
    if (username === '') return;
    getDetails(username);
}

function deleteUser() {
    const card = this.parentElement.parentElement;
    const username = card.getElementsByClassName('username')[0].innerHTML.slice(1,-1);
    users.delete(username);
    storeData(users);
    this.parentElement.parentElement.remove();
    
}

function storeData(data) {
    localStorage.setItem('usernames',JSON.stringify(Array.from(data)));
}

function getDetails(username){
    username = username.toLowerCase();
    if (users.has(username) && loadingFinished) return;
    fetch(`https://competitive-coding-api.herokuapp.com/api/codechef/${username}`)
    .then( function (result) { return result.json() } )
    .then(
        function (data) {
            // console.log(data);
            const information = {
                name: data.user_details.name,
                username: data.user_details.username,
                rating: data.rating,
                highestRating: data.highest_rating,
                stars: data.stars,
                countryRank: data.country_rank,
                globalRank: data.global_rank 
            }
            createCard(information);
            users.add(username);
            storeData(users);
        }
    )
    .catch((error) => console.log("Cannot Fetch Data From API, ",error))
}

function createCard({name, username, rating, highestRating, stars, countryRank, globalRank}){

    const root = document.createElement("div");
    root.classList.add("card");

    const div_name = document.createElement("div"); 
    div_name.classList.add("card-header");

    const e_name = document.createElement("p");
    e_name.innerHTML = name;
    e_name.classList.add("name");

    const e_username = document.createElement("p");
    e_username.innerHTML = `(${username})`;
    e_username.classList.add("username");
    
    div_name.appendChild(e_name);
    div_name.appendChild(e_username);

    const e_rating = document.createElement("p");
    e_rating.innerHTML = `Rating: ${rating} (${stars})`;
    e_rating.classList.add("rating");

    const div_others = document.createElement("div"); 
    div_others.classList.add("others");
    
    const e_highestRating = document.createElement("p");
    e_highestRating.innerHTML = `Highest Rank: ${highestRating}`;
    e_highestRating.classList.add("highest-rating");
    
    const e_globalRank = document.createElement("p");
    e_globalRank.innerHTML = `Global Rank: ${globalRank}`;

    const e_countryRank = document.createElement("p");
    e_countryRank.innerHTML = `Country Rank: ${countryRank}`;

    const e_delete = document.createElement("button");
    e_delete.innerHTML = 'Delete';
    e_delete.classList.add('delete-button')
    e_delete.addEventListener('click', deleteUser);

    div_others.appendChild(e_highestRating);
    div_others.appendChild(e_globalRank);
    div_others.appendChild(e_countryRank);
    div_others.appendChild(e_delete);


    root.appendChild(div_name);
    root.appendChild(e_rating);
    root.appendChild(div_others);
    
    // Sorting happens here
    console.log(rootNode.childNodes);
    for (let curNode of rootNode.childNodes){
        const curNodeRating = parseInt(curNode.innerText.split("Rating: ")[1].split(" ")[0],10);
        if (highestRating >= curNodeRating){
            rootNode.insertBefore(root,curNode);
            return;
        }
    }
    // If we get here, all other nodes have lower values
    if (rootNode.childElementCount == 0){
        rootNode.appendChild(root);
    }else{
        rootNode.insertAdjacentElement("afterend",rootNode.lastChild);
    }
}
