let url ="http://localhost:3000/api/cameras";

fetch(url).then(function(reponse){
	reponse.json().then(function(data){
		createBagComponents(data);
	})
})

.catch(function(err) {
	console.log('Fetch Error :-S', err);
})	

//création du panier
function createBagComponents(data){
	//création des éléments de base
	let bag = document.getElementById("bag");
		
	let productblock = document.getElementById("productblock");

	let totalblock = document.getElementById("totalblock");

	let sum = 0;

	let sumQty = 0;

	//retour à la page précédente au clic sur le bouton "Retour" qui apparaît quand le panier est vide
	document.getElementById("emptybasket--btn").onclick = function(){
 		history.back(-1);
	}

	//récupération du localStorage
	let panier = JSON.parse(localStorage.getItem("panier"));

	//création des produits du panier et assignation des valeurs enregistrées dans le localStorage
	for(let i = 0; i < panier.length; i++){
		//si le panier contient 1 élément ou plus, le message de panier vide disparaît, le formulaire de commande apparait 
		document.getElementById("emptybasket").style.display = "none";
		document.getElementById("checkoutform").style.display = "block";
			
		//image
		let image = document.createElement("img");
		image.src = panier[i].image;
		image.style.cursor = "pointer";

		//nom
		let itemName = document.createElement("p");
		itemName.classList.add("item__name");
		itemName.innerHTML = panier[i].name;
		itemName.style.cursor = "pointer";

		//ajout du lien sur l'image et le nom du produit
		let link = "product_detail.html?id=" + panier[i].id;
			
		image.onclick = function(){
			window.location.href = link;
		}

		itemName.onclick = function(){
			window.location.href = link;
		}

		//lentille
		let itemLens = document.createElement("p");
		itemLens.classList.add("item__lens");
		itemLens.innerHTML = "Lentille&nbsp: " + panier[i].lense;

		//quantité de chaque produit
		let itemQuantity = document.createElement("p");
		itemQuantity.classList.add("item__quantity");
		itemQuantity.innerHTML = panier[i].price / 100 + "$ &nbsp x " + panier[i].quantity;
		
		//prix de chaque produit
		let itemPrice = document.createElement("p");
		itemPrice.classList.add("item__price");
		let priceValue = panier[i].price * panier[i].quantity / 100 + "$" ;
		itemPrice.innerHTML = priceValue ;

		//bouton "poubelle"
		let trash = document.createElement("span");
		trash.classList.add("material-icons-sharp");
		trash.innerHTML = "delete";
		trash.style.cursor = "pointer";

		//fonction de suppression du bouton "poubelle"
		trash.onclick = function(){
				
			if (panier[i].quantity === 1 ){
				panier.splice([i], 1);
			}

			else {
			panier[i].quantity--;
	       	}

	       	localStorage.setItem('panier', JSON.stringify(panier));
	       	
	       	if (panier.length === 0){
	       		localStorage.clear();
	       	}

	       	location.reload();
		}

		//bloc produit
		let product = document.createElement("div");
		product.classList.add("item");

		//ajout des éléments dans le bloc produit
		product.appendChild(image);
		product.appendChild(itemName);
		product.appendChild(itemLens);
		product.appendChild(itemQuantity);
		product.appendChild(itemPrice);
		product.appendChild(trash);
		productblock.appendChild(product);

		//calcul du prix total
		sum += (panier[i].price * panier[i].quantity);
		//calcul de la quantité totale
		sumQty += panier[i].quantity;
	}
	
	//création de la ligne des totaux

	//titre
	let totalTitle = document.createElement("p");
	totalTitle.classList.add("total__title");
	totalTitle.innerHTML = "Total&nbsp:";

	//coût d'envoi
	let totalShipping = document.createElement("p");
	totalShipping.classList.add("item__name");
	totalShipping.classList.add("total__shipping");
	totalShipping.innerHTML = "<b>Envoi : </b>Les frais de port sont offerts :)";

	//quantité totale
	let totalQuantity = document.createElement("p");
	totalQuantity.classList.add("total__quantity");
	totalQuantity.innerHTML = sumQty + " articles";

	//prix total
	let totalPrice = document.createElement("p") ;
	totalPrice.classList.add("total__price");
	totalPrice.innerHTML = sum / 100 + "$";

	//ajout de tous les éléments dans le bloc des totaux
	totalblock.appendChild(totalTitle);
	totalblock.appendChild(totalShipping);
	totalblock.appendChild(totalQuantity);
	totalblock.appendChild(totalPrice);

	//retour à la page précédente au clic sur le bouton "Retour"
	document.getElementById("bag__btn--back").onclick = function(){
		history.back(-1);
	}

	//création et gestion du formulaire

	//bouton d'envoi
		let submitBtn = document.getElementById("submitcheckout");

	//validation du formulaire
	function formValidation() {
			
		// création des regex
		let checkString = /^[A-Za-z\é\è\ê\ë\ï\à\ö\ô-]+$/;
		let checkAdress = /[0-9].+/;
		let checkEmail = /.+@.+\..+/;
		  	
		// récupération des inputs
		let formLast = document.getElementById("formlastname").value;
	    let formFirst = document.getElementById("formfirstname").value;
	    let formEmail = document.getElementById("formemail").value;
	    let formAdress = document.getElementById("formadress").value;
	    let formCity = document.getElementById("formcity").value;

		// vérification des inputs avec les regex
	  	if (checkString.test(formLast) == false) {
	    	alert("Votre nom doit être indiqué et ne doit pas contenir de chiffres");
	    	return false;
		  	
	  	} else if (checkString.test(formFirst) == false) {
	    	alert("Votre prénom doit être indiqué et ne doit pas contenir de chiffres");
	   	 return false;
		  	
	  	} else if (checkAdress.test(formAdress) == false) {
	  	  alert("Votre adresse doit être indiquée et commencer par votre numéro de voie");
	   	 return false;

	   	} else if (checkString.test(formCity) == false) {
	   	 alert("Le nom de votre ville doit être indiqué et ne doit pas contenir de chiffres");
	    	return false;
		   	
	   	} else if (checkEmail.test(formEmail) == false) {
	   	 alert("Votre e-mail doit être indiqué et doit être au format xxx@yyy.zzz");
	    	return false;
		  	
	  	} else {
	   	 return true;
	  	}
	}
		

	//envoi des données au clic sur le bouton d'envoi
	submitBtn.addEventListener("click", function(e){
		e.preventDefault();
		
		//si le formulaire passe la validation 	
	 	if(formValidation()==true){
			
			//récupération des valeurs du formulaire	
			let formLast = document.getElementById("formlastname").value;
	   		let formFirst = document.getElementById("formfirstname").value;
	   		let formEmail = document.getElementById("formemail").value;
	   		let formAdress = document.getElementById("formadress").value;
	   		let formCity = document.getElementById("formcity").value;

	   		//création de l'array contact
	   		let contact = {
	   			'firstName' : formFirst,
	   			'lastName' : formLast,
	   			'address' : formAdress,
	   			'city' : formCity,
	   			'email' : formEmail,
	   		}
	    	
	    	//création de l'objet products	
	   		let products = [];
	   		for(let i = 0; i < panier.length; i++){
	   			products.push(panier[i].id);
	   		}
			
			//création de l'array contenant contact et products			
			let order = {
				contact, 
				products
			}

			//envoi des données au serveur
			fetch("http://localhost:3000/api/cameras/order",{
	      	 body:JSON.stringify(order),
	      	 method: "post",
	      	 headers: { 'Content-Type': 'application/json;charset=UTF-8' },
	   		}) .then((response)=>{
	   			response.json().then(function(data){
	   				//enregistrement de "order" dans le localSorage
	   				localStorage.setItem("order", JSON.stringify(data));
	   				//ouverture de la page de confirmation
	   				document.location = "orderplaced.html";
	   			})
	   		})
		}
	})
}