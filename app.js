fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        console.log(trierProduits(data));

        //je créer toutes les cartes
        creerCartes(data);

        //je récupére les données trié par catégorie
        let resultTrie = trierProduits(data)

        //je cible tous mes boutons catégories
        let btnMen = document.getElementById("menBtn")
        let btnWoman = document.getElementById("womanBtn")
        let btnElectronics = document.getElementById("elecBtn")
        let btnJewelry = document.getElementById("jewelBtn")
        let btnAll = document.getElementById("allBtn")

        //le click de mon bouton "all" -> retire la classe selected des autres boutons, affiche toute els carte, ajoute la classe selected sur le bouton all
        btnAll.addEventListener("click", (e) => { retirerClasseSelected(); creerCartes(data); btnAll.classList.toggle("btn-selected"); })
        //trie et affiche les carte en fonction du bouton cliqué / togle la classe selected
        btnMen.addEventListener("click", (e) => { afficheCarteTrier(btnMen, resultTrie.men) })
        btnWoman.addEventListener("click", (e) => { afficheCarteTrier(btnWoman, resultTrie.woman) })
        btnElectronics.addEventListener("click", (e) => { afficheCarteTrier(btnElectronics, resultTrie.electronics) })
        btnJewelry.addEventListener("click", (e) => { afficheCarteTrier(btnJewelry, resultTrie.jewelery) })

        //fonction pour ma barre de recherche
        recherche(data)

        let cards = document.querySelectorAll(".card")
        cards.forEach(card => {
            card.addEventListener("click", (e) => {
                const id = card.dataset.id;
                creerModal(id, data);
            });
        });


    });

function creerCartes(tableauDeproduit) {
    viderSection()
    tableauDeproduit.forEach(produit => {

        document.getElementById("cards-container").innerHTML +=
            `

            <div class="card w48 flex space-between" data-id="${produit.id}">

                <img src="${produit.image}" alt="" class="w20">


                <div class="flex space-between align-center w70">
                    <div class="w70">
                        <h3>${produit.title}</h3>
                        <p>${produit.category}</p>
                        <div>★★★★</div>
                    </div>

                    <div>

                    </div>
                    <p class="prix w20">${produit.price}€</p>
                </div>
            </div>


        `;
    });
}

//role : tri les produits et créer des tableaux pour les 4 categories
//parametre: tableau de produits
//return : 4 tableaux 1 par catégorie
function trierProduits(tableauDeproduit) {

    let arrayMen = [];
    let arrayWoman = [];
    let arrayJewelery = [];
    let arrayElectronics = [];

    tableauDeproduit.forEach(produit => {
        if (produit.category === "men's clothing") {
            //ranger dans table men
            arrayMen.push(produit)

        }
        else if (produit.category === "jewelery") {
            //ranger dans table jewelry
            arrayJewelery.push(produit)
        } else if (produit.category === "electronics") {
            //ranger dans table electronics
            arrayElectronics.push(produit)
        } else {
            //ranger dans table woman
            arrayWoman.push(produit)
        }
    });


    return {
        men: arrayMen,
        woman: arrayWoman,
        jewelery: arrayJewelery,
        electronics: arrayElectronics
    };



}

//role : retirer la classe selected des boutons catégories
//parametre: rien
//return : rien
function retirerClasseSelected() {
    let btns = document.querySelectorAll(".btn-category");

    btns.forEach(btn => {
        btn.classList.remove("btn-selected");
    });

}

//role : supprime les cartes qui se trouve dans la section 
//parametre: rien
//return : rien
function viderSection() {
    let sectionProduits = document.getElementById("cards-container")
    sectionProduits.innerHTML = ""
}

//role : Vide la section + Affiche les cartes trier + retire la classe selected et là met sur le bouton qui viens d'êtres cliqué
//parametre: tableau de produits
//return : 4 tableaux 1 par catégorie
function afficheCarteTrier(btn, tableauTrie) {
    viderSection()
    retirerClasseSelected()
    console.log("ok")
    btn.classList.toggle("btn-selected");
    creerCartes(tableauTrie)
}

//role : afficher les carte si le mot tapé dans la barre de recherche sont présent dans le titre des produits
// paramtere : le tableau de produit 
//return : rien
function recherche(tableauDeproduit) {
    let searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", (e) => {
        let searchValue = e.target.value.toLowerCase();

        let results = tableauDeproduit.filter(produit =>
            produit.title.toLowerCase().includes(searchValue)
        );
        console.log(results)

        retirerClasseSelected();
        creerCartes(results);

    });
}

//role : créer une modal en absolute 

/*function creerModal(leProduitClique){

   
    document.querySelector("body").innerHTML += `
    
    <div class="modal">

        <div class="modal-content">
        <span class="close-btn">&times;</span>
            <p> hello </p>
        </div>
       
    </div>
    `

    // Cibler le bouton fermer
let closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
    document.querySelector(".modal").remove();
});
}*/

function creerModal(idProduitClique, tableauDeproduit) {

    console.log(idProduitClique)


    tableauDeproduit.forEach(produit => {
        console.log(produit.id)

        if (produit.id === Number(idProduitClique)) {

            console.log("yo")


            // Créer un élément modal
            let modal = document.createElement("div");
            modal.classList.add("modal");

            modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <image src="${produit.image}">
            <p>Hello</p>
        </div>
    `;

            // Ajouter au DOM
            document.body.appendChild(modal);

            // Cibler la croix
            let closeBtn = modal.querySelector(".close-btn");

            closeBtn.addEventListener("click", () => {
                modal.remove();
            });


        } else { }


    });


}
