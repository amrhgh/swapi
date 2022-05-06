function fetch_data(url){
    return fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .catch((error) => console.error("FETCH ERROR:", error));
}

function fetch_film(film_id) {
    return fetch_data(`https://swapi.dev/api/films/${film_id}`)
}

function create_cart(group, film_title, film_episode_id, film_release_date) {
    const card = document.createElement("div")
    card.className = "card";
    card.setAttribute("style", "width: 18rem");
    const body = document.createElement("div")
    body.className = "card-body";
    const title = document.createElement("h5")
    title.className = "card-title";
    title.append(document.createTextNode(film_title))
    const text = document.createElement("p")
    text.className = "card-text";
    text.innerHTML = `episode_id: ${film_episode_id} <br> release_date: ${film_release_date}`

    const btn = document.createElement("a")
    btn.className = "btn";
    btn.text = "StarShip"
    btn.href = `${film_episode_id}.html`
    card.append(body)
    body.append(title)
    body.append(text)
    body.append(btn)
    group.append(card)

}

function render_home() {
    let group = null;
    let groups = [document.getElementById('card-group_1'), document.getElementById('card-group_2')]
    for (let i = 1; i < 7; i++) {
        if (group == null){
            group = document.createElement("div")
            group.className = "card-group"
            let container = document.getElementById('container')
            container.append(group)
            console.log(group)
        }
        fetch_film(i).then((data) => {
            console.log(group)
            create_cart(groups[Math.floor((i - 1) / 3)], data.title, data.episode_id, data.release_date)
            }
        )
    }
}

function create_collapse(data){
    let c = document.getElementById('container')
    const button = document.createElement("button")
    button.innerHTML = data.name
    button.type = 'button'
    button.className = 'collapsible'
    const content = document.createElement("div")
    content.className = 'collapsible-container'
    const detail = document.createElement("p")
    detail.innerHTML = `model: ${data.model} <br> manufacturer: ${data.manufacturer} <br> crew: ${data.crew} <br> passangers: ${data.passangers}`
    button.addEventListener("click", function() {
        this.classList.toggle("active");
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
    c.append(button)
    content.append(detail)
    c.append(content)
}

function render_starship(episode_id){
    fetch_film(episode_id).then((data) => {
        console.log(data.starships)
        data.starships.forEach(item => {
            console.log(item)
            fetch_data(item).then((data) => {
                create_collapse(data)
            })
        })
        })
}

