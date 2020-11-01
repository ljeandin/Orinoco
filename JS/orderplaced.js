let url ="http://localhost:3000/api/cameras";

fetch(url).then(function(reponse){
	reponse.json().then(function(data){
		createConfirmation(data);
    })
})

.catch(function(err) {
console.log('Fetch Error :-S', err);
})

function createConfirmation(data){
	//récupération des éléments du localStorage
	let order = JSON.parse(localStorage.getItem("order"));
	let panier = JSON.parse(localStorage.getItem("panier"));

	//calcul du coût total	
	let sum = 0 ;

	for(let i = 0; i < panier.length; i++){
		sum += (panier[i].price * panier[i].quantity);
	}

	//affichage de l'id de la commande
	document.getElementById("orderId").innerHTML = "n°" + order.orderId;

	//affichage du coût total
	document.getElementById("orderSum").innerHTML = sum / 100 + "$";

	//au clic sur le bouton "retour au shopping"
	document.getElementById("orderPlacedBtn").addEventListener("click", function(){
		//retour à la page d'accueil
		document.location = "index.html";
		//destruction du localStorage
		localStorage.clear();
	})

	//destruction du header au clic sur le logo
	document.getElementById("headerLogo").addEventListener("click", function(){
		localStorage.clear();
	})
}
