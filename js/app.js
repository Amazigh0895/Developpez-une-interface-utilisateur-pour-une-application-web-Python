/*  -------------------------------------- My functions-------------------------------- */
// Function slide_next
function slide_next(){
  // Get all buttons slide__next
  const btn_next = document.querySelectorAll('.btn-slide__next');
  // Get all categories
  const categories = document.querySelectorAll('.categorie');
  // Get all categories
  for (let i = 0; i < btn_next.length; i++) {
    const btn = btn_next[i];
    const categorie = categories[i];
    btn.onclick = function () {
      categorie.scrollLeft += 1105;
    };
  }
}

// Function slide_back
function slide_back(){
  // Get all buttons slide__back
  const btn_back = document.querySelectorAll('.btn-slide__back');
  // Get all categories
  const categories = document.querySelectorAll('.categorie');
  for (let i = 0; i < btn_back.length; i++) {
    const btn = btn_back[i];
    const categorie = categories[i];
    btn.onclick = function () {
      categorie.scrollLeft -= 1105; 
    };
  }
}

// Function Open the modal
 function openModal(){
  // Get the modal
  const myModals = document.querySelectorAll("#myModal");
  // Get the button that opens the modal
  const myBtns = document.querySelectorAll("#myBtn");
  // When the user clicks the button, open the modal 
  for (let i = 0; i < myBtns.length; i++) {
    const myBtn = myBtns[i];
    const myModal = myModals[i]
    myBtn.onclick = function () {
      myModal.style.display = "block"; 
    };
}
}

// Function close the modal
function closeModal(){
  // Get the <span> element that closes the modal
  const spans = document.querySelectorAll(".close");
  // Get the modal
  const myModals = document.querySelectorAll("#myModal");
  // When the user clicks on <span> (x), close the modal
  for (let i = 0; i < spans.length; i++) {
    const span = spans[i];
    const myModal = myModals[i]
    span.onclick = function() {
      myModal.style.display = "none";
    }
}
}

// Getting the best movie from the api
function chargingBestMovie(){
  // Get url
  const url = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
  // select my button
  const btn = document.querySelector("#myBtn");

  // -------------Selection of my modal -----------------------
  // Select modal title
  const modal_title = document.querySelector(".modal-title");
  // Select modal image
  const modal_image = document.querySelector(".modal-img");
  // Select modal list_details_movie
  const modal_list_details_movie = document.querySelector(".modal-list_details_movie");
  // Select modal description
  const modal_description = document.querySelector(".modal-description");

  fetch(url)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // `json` est le vrai résultat de notre requête !
    const urlBestMovie = data["results"][0]["url"];
  fetch(urlBestMovie)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      // `json` est le vrai résultat de notre requête !
      // remplissage de ma modal avec des donnes json
      modal_title.innerHTML = data["title"];
      modal_image.src = data["image_url"];
      modal_list_details_movie.innerHTML = `
      <li>Le genre complet du film : <strong>${data["genres"][0]}</strong></li>
      <li>Sa date de sorti : <strong>${data["date_published"]}</strong></li>
      <li>Son Rated : <strong>${data["rated"]}</strong></li>
      <li>Son score Imdb : <strong>${data["imdb_score"]}</strong></li>
      <li>Son réalisateur : <strong>${data["directors"][0]}</strong></li>
      <li>La liste des acteurs : <strong>${data["actors"]}</strong></li>
      <li>Sa durée : <strong>${data["duration"]}</strong></li>
      <li>Le pays d'origine : <strong>${data["countries"][0]}</strong></li>
      <li>Le résultat au Box Office : <strong>${data["votes"]}</strong></li> `
      modal_description.innerHTML = data["long_description"];

      //remplissage de la page d'accueil
      btn.style.background =`center/cover no-repeat url('${data["image_url"]}')`
    })
  })
}
// Function fill home btn image movie
function fillbtnHomeMovie(value){
  const top_rated_categorie = document.querySelector('.top-rated');
  top_rated_categorie.innerHTML +=`
  <div class="items">
    <button id="myBtn" style = " background : center/cover no-repeat url('${value}') ">
    </button>
  </div>`;
} 
// Function fill modal
function fillModalItems(dataMv,index){
  const top_rated_items = document.querySelectorAll('.top-rated .items');
  console.log(top_rated_items)
  top_rated_items[index].innerHTML +=`
  <div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h3 class="modal-title">${dataMv["title"]}</h3>
        <img class="modal-img" src="${dataMv["image_url"]}" alt="test">
        <ul class="modal-list_details_movie">
        <li>Le genre complet du film : <strong>${dataMv["genres"][0]}</strong></li>
        <li>Sa date de sorti : <strong>${dataMv["date_published"]}</strong></li>
        <li>Son Rated : <strong>${dataMv["rated"]}</strong></li>
        <li>Son score Imdb : <strong>${dataMv["imdb_score"]}</strong></li>
        <li>Son réalisateur : <strong>${dataMv["directors"][0]}</strong></li>
        <li>La liste des acteurs : <strong>${dataMv["actors"]}</strong></li>
        <li>Sa durée : <strong>${dataMv["duration"]}</strong></li>
        <li>Le pays d'origine : <strong>${dataMv["countries"][0]}</strong></li>
        <li>Le résultat au Box Office : <strong>${dataMv["votes"]}</strong></li>
        </ul>
        <p class="modal-description">${dataMv["long_description"]}</p>
    </div>
</div>`;
}



function chargingTopRatedMovies(){
      // top rated movies url
      const url = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score'
      // List of urls images movies
      const listUrlsImageTopMovies = []
      fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        // `json` est le vrai résultat de notre requête !
        // Get next page url
        const urlNext = data["next"];
        // Add urls image in list "First page"
        for(let i = 0; i < 5; i++){
          listUrlsImageTopMovies.push(data["results"][i]["image_url"])
        }
        fetch(urlNext)
            .then(function (response) {
              return response.json()
            })
            .then(function (dataNext) {
              // Add urls image in list "Seconde Page"
              for(let i=0; i < 2; i++){
                listUrlsImageTopMovies.push(dataNext["results"][i]["image_url"]);
              }
              //remplissage de la page d'accueil
              for(let i=0; i < 5; i++){
                fillbtnHomeMovie(listUrlsImageTopMovies[i]);
                const urlDetailsMovie = data["results"][i]["url"];
                
                // Remplissage des modals
                  fetch(urlDetailsMovie)
                    .then(function (response) {
                      return response.json()
                    })
                    .then(function (dataMv) {
                      fillModalItems(dataMv,i);
                    })
              }
              for(let i=0; i < 2; i++){
                const urlDetailsMovieNext = dataNext["results"][i]["url"];
                // rajout des deux derniers film aux items
                fillbtnHomeMovie(listUrlsImageTopMovies[i+5]);
                // Remplissage des modals[next page]
                fetch(urlDetailsMovieNext)
                .then(function (response) {
                  return response.json()
                })
                  .then(function (dataMvNext) {
                    for(let i=5; i < 7; i++){
                      fillModalItems(dataMvNext,i)
                  }
                  slide_next();
                  slide_back();
                  openModal();
                  closeModal();
                })}
            })
            })

    }


  export{chargingBestMovie,chargingTopRatedMovies};