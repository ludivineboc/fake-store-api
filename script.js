

fetch('https://fakestoreapi.com/products')
.then(response => response.json())
.then(data => {

    console.log(data)
    // appeller afficherProduits
    afficherProduits(data)

})



//rolle : Afficher dans la page web les cartes des produit 
// parametre : des produits -> tableau d'objets
//return : rien
function afficherProduits(tableaudeproduits){

    //afficher tous les titres des produits 
    //prendre les produit 1 par 1 -> forech 

    tableaudeproduits.forEach(produit => {

        let titre = produit.title
      

        
        console.log(titre)
        
    });



}