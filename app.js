fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {

    console.log(data);
    creerCartes(data);
  });

function creerCartes(tableauDeproduit){
    tableauDeproduit.forEach(produit => {

        document.getElementById("sec-card").innerHTML += 
        `

            <div class="card w48 flex space-between">
                <img src="${produit.image}" alt="" class="w20">


                <div class="flex space-between align-center w70">
                    <div class="w70">
                        <h3>${produit.title}</h3>
                        <p>${produit.category}</p>
                        <div>★★★★</div>
                    </div>
                    <p class="prix w20">${produit.price}€</p>
                </div>
            </div>


        `;
    });
}

//role : afficher les cartes lorsqu'on clique sur une catégorie
// : tableau de produits, le bouton cliqué 
//return : rien 

function filtrerCartes(tableauDeproduit){

    document.querySelectorAll(".btn-category").addEventListener("click", (e)=>{
        if(e === "men's clothing"){
            //function créer carte men
        }
        else if(e === "jewelery"){
            //fucntion créer carte jewelery
        }else if(e === "electronics"){

        }else{
            //function women
        }
    })
}


/* categories : 
men's clothing
jewelery
electronics
women's clothing


*/ 