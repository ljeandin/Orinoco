let url ="http://localhost:3000/api/cameras";

fetch(url).then(function(reponse){
	reponse.json().then(function(data){
		data.forEach(element=>{
		createListProduct(element);
		})
	})
})
.catch(function(err) {
console.log('Fetch Error :-S', err);
});

function createListProduct(element){
	//body
  	let body = document.getElementById("mainhomepage");
	
	//card produit	
	let product = document.createElement("div");
	product.classList.add("product");
	
	//nom du produit	
	let name = document.createElement("a");
	name.innerHTML = element.name;
	name.href = "product_detail.html?id="+element._id;

	//image
	let img = document.createElement("img");
	img.src = element.imageUrl;
	img.style.cursor = "pointer";
	
	//ouverture de la page au clic sur l'image		
	img.onclick = function(){
		window.location.href = name.href;
	}
	
	//prix	
	let price = document.createElement("p");
	price.innerHTML = element.price/100+"$";
	
	//ajout des éléments dans chaque card produit	
	product.appendChild(img);
	product.appendChild(name);
	product.appendChild(price);
	//ajout des cards au body
	body.appendChild(product);
}