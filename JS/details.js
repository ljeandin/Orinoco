let queryString = window.location.search;
let id = new URLSearchParams(queryString).get('id');
let url =  "http://localhost:3000/api/cameras/"+id;

fetch(url).then(function(reponse){
	reponse.json().then(function(data){
		createDetailElements(data);
	})
})

.catch(function(err) {
	console.log('Fetch Error :-S', err);
})

function createDetailElements(data){
	//body
	let body = document.getElementById("bodydetail");

	//div pour l'image	
	let imageContainer = document.createElement("div");
	imageContainer.classList.add("aside");

	//image	
	let image = document.createElement("img");
	image.src = data.imageUrl;

	//insertion de l'image dans la div	
	imageContainer.appendChild(image);
		
	//bloc pour description, nom et prix du produit 	
	let main = document.createElement("main");
	main.classList.add("detail");
	
	//nom du produit	
	let title = document.createElement("p");
	title.classList.add("detail__name");
	title.innerHTML= data.name;
	
	//prix	
	let price = document.createElement("p");
	price.classList.add("detail__price");
	price.innerHTML= data.price/100+"$";
	
	//texte de description	
	let description = document.createElement("p");
	description.classList.add("detail__description");
	description.innerHTML= data.description;
	
	//insertion des éléments dans le main
	main.appendChild(title);
	main.appendChild(price);
	main.appendChild(description);
	
	//insertion du main et de l'image dans la page
	body.appendChild(imageContainer);
	body.appendChild(main);

	//création du dropdown pour sélectionner la lentille
	for (let i = 0; i < data.lenses.length; i++) {
		let option = document.createElement("option");
		option.value = data.lenses[i];
		option.innerHTML = data.lenses[i];
		document.getElementById("dropdown").appendChild(option);
	}

	//au clic sur le bouton "ajouter au panier"
	document.getElementById("submitLens").addEventListener("click",function(e){
		e.preventDefault();
		//récupération de la lentille
		let lense = document.getElementById("dropdown").value;
		
		//création du panier
		let panier = [];
		let isExist = false;
		
		//si le produit et la lentille sont déjà dans le panier, augmenter la quantité
		if (localStorage.getItem("panier")){
			panier = JSON.parse(localStorage.getItem("panier"));
			panier.forEach(element=>{
				if (element.id==id && element.lense==lense){
					element.quantity++;
					isExist=true;
				}
			})
		}
		
		//sinon, créer un nouveau produit
		if (isExist==false){
			let product= {
			'id' : id ,
			'name' : data.name,
			'price': data.price,
			'image': data.imageUrl,
			'lense' : lense,
			'quantity': 1,
			}
		
			//ajouter le produit dans le panier
			panier.push(product);
		}
		
		//enregistrer le panier dans le localStorage	
		localStorage.setItem("panier", JSON.stringify(panier));

		//alerter l'utilisateur de l'ajout du produit
		alert("Produit ajout\u00e9 au panier ! :)");
	})
}

