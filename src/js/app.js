// Added firebase sdk

firebase.initializeApp({
    apiKey: 'AIzaSyCmHERLZVfa81k0C7pALmUJ-DPJad1GVN4',
    authDomain: 'moviesapp-5a144.firebaseapp.com',
    projectId: 'moviesapp-5a144'
  });
  
  let db = firebase.firestore();


  // Build what function initialize the Application

  const formMovies = document.getElementById('form-movies').addEventListener('submit', saveMovies);

  function saveMovies(event) {
    // Date of DOM
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const genro = document.getElementById('genro').value;
    const year = document.getElementById('year').value;

    // Creating a collection with DB firebase
    db.collection('movies').add({
      name: name,
      description: description,
      genro: genro,
      year: year
    })
      .then(function(movie) {
        console.log('La pelicula fue guardada con el ID: ', movie.id);
      })
       .catch(function(error) {
        console.log('Error al crear la pelicula ', error);  
      });

      console.log(name, description, genro, year);

    event.preventDefault();
  }

  
  // collection for show movies
  const showAllMovies = document.getElementById('show-all-movies');

  db.collection('movies').get().then((queryForMovies) => {
    showAllMovies.innerHTML = '';

    queryForMovies.forEach((showMovies) => {
      showAllMovies.innerHTML += `
        <div class="container">
            <div class="row">
              <div class="col s6">
                <div class="card z-depth-3">
                  <div class="card-content">
                    <span class="card-title"><strong>Nombre:</strong> ${showMovies.data().name}</span><br>
                    <p><strong>Descripción:</strong> ${showMovies.data().description}</p><br>
                    <p><strong>Genero:</strong> ${showMovies.data().genro}</p><br>
                    <p><strong>Año:</strong> ${showMovies.data().year}</p>
                  </div>
                  <div class="card-action">
                    <a href="#" class="btn red darken-4" onclick="deleteMovies('${showMovies.data().name}'">Eliminar</a>
                    <a href="#" class="btn blue darken-3" id ="button" onclick="editMovies('${showMovies.data().name}', '${showMovies.data().description}', '${showMovies.data().genro}', '${showMovies.data().year}')">Editar</a>
                  </div>
                </div>
              </div>
            </div>
        </div>
      `;
    });
  });


  // Function for editing movies
  function editMovies(name, description, genro, year) {
    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    document.getElementById('genro').value = genro;
    document.getElementById('year').value = year;


    let button = document.getElementById('button');
    button.innerHTML = 'Editar usuario';

    button.onclick = function() {
      let updateMovies = db.collection('movies').doc(name);

      return updateMovies.update({ 
        name: name,
        description: description,
        genro: genro,
        year: year
      })
        .then(function() {
          console.log('Pelicula actualizada exitosamente');
        })
        .catch(function(error) {
          console.log('Error al actualizar la pelicula ', error);
        });

    }

  }


  // Function for deliting movies
  function deleteMovies(name) {
    db.collection("movies").doc(name).delete(name).then(function() {
      console.log(`La pelicula ${showMovies.data().name} fue eliminada satisfactoriamente`);
    }).catch(function(error) {
      console.log(`${error} al tratar de elimianr la pelicula ${showMovies.data().name}`);
    });
  }