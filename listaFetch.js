    
    function creaLista() {
        const ul = document.getElementById('oggetti'); // Get the list where we will place our authors
        const url = 'https://randomuser.me/api/?results=10'; // Get 10 random users        
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
                // Here you get the data to modify as you please
                let authors = data.results; // Get the results
                return authors.map(function(author, index) { // Map through the results and for each run the code below
                    let li = document.createElement('li'); //  Create the elements we need
                    let img = document.createElement('img');
                    let h5 = document.createElement('h5');
                    img.src = author.picture.medium;  // Add the source of the image to be the src of the img element
                    //img.id = index;
                    //span.innerHTML = `${author.name.first} ${author.name.last}`; // Make the HTML of our span to be the first and last name of our author
                    h5.innerText = author.name.first + " "+ author.name.last;
                    // Append all our elements
                    li.appendChild(img);
                    li.appendChild(h5);
                    ul.appendChild(li);
                })
            })
            .catch( error => console.error(error) );// If there is any error you will catch them here

            const bottone = document.getElementById('creaListaBottone');
            bottone.innerHTML="caricane altri 10";
            //bottone.style.visibility = "hidden" ;
    }

