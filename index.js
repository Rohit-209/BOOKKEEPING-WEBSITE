
const url = 'https://book-finder1.p.rapidapi.com/api/search?series=Wings%20of%20fire&book_type=Fiction&lexile_min=600&lexile_max=800&results_per_page=25&page=1';
const outputElement = document.querySelector(".booklist");
const division = document.querySelector(".books");
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e85b439a27msh703c2f7ce9e6f9dp1416a7jsna4612243778e',
		'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
	}
};


fetch(url,options)
	.then(response => {
		if (!response.ok) {
			if (response.status === 404)  {
				throw new Error ('Data not found');

			}else if (response.status === 500)  {
				throw new Error ('Server Error');
			}else{
				throw new Error('Network response was not ok');
			}
		}
		return response.json();
	})
	.then(json => {
		initialize(json);
	})
	.catch(error => {
		console.error('Error:', error);
	})
	// function to display the data fetched by API
	function initialize(obj){
		//Looping through all the object JSON

		for(let i=0;i<52;i++){
			//creating elements where we can store data

			const block = document.createElement("div"); //creating division so to show in grid
			const booktitle = document.createElement("h2");
			const bookauthor = document.createElement("h3");
			const seriesname = document.createElement("h3");
			const booktype = document.createElement("h3");
			const categories = document.createElement("h3");
			const language = document.createElement("h3");
			const favbutton = document.createElement("button");
			
			//Adding data to the elements
			booktitle.textContent = obj["results"][i]["title"];
			bookauthor.textContent = `Author: ${obj["results"][i]["authors"]}`;
			seriesname.textContent = `Series: ${obj["results"][i]["series_name"]}`;
			booktype.textContent = `Book Type: ${obj["results"][i]["book_type"]}`;
			language.textContent = `Language: ${obj["results"][i]["language"]}`;
			favbutton.textContent = "Add to Favourites";

			favbutton.classList.add("favbtn");
			block.classList.add("block");

			//Adding elements to the division we created to show them in grid
			block.appendChild(booktitle);
			block.appendChild(bookauthor);
			block.appendChild(seriesname);
			block.appendChild(booktype);
			block.appendChild(language);
			block.appendChild(favbutton);

			//Adding the division we created in one division which will contain all the divisions and show them in grid display
			division.appendChild(block);

			document.querySelector(".favbtn").addEventListener("click", function(){
				document.querySelector(".favbtn").textContent = "Remove from favourites";
			})
			
		}
	}
	document.querySelector(".favbtn").addEventListener("click", function(){
		document.querySelector(".books").toggleAttribute;
	})

	



 /*FOR SEARCH FUNCTION I WROTE THIS CODE BUT IT DIDN'T WORK , I SPENT DAYS FIGURING OUT THE ERROR BUT COULDN'T UNDERSTAND WHATS WRONG , 
 I BELIEVE THE LOGIC IS CORRECT AND I MAY HAVE MADE ANY SILLY ERROR. PLEASE HAVE A LOOK AT THE CODE, I TRIED EVERYTHING THAT I COULD HAVE.*/

	/* function initialize(obj){
		const searchterm = document.querySelector("input");
		const srcbtn = document.querySelector("#srbtn");
		const category = document.querySelector("select");
		const division = document.querySelector(".books");
		

		let lastcategory = category.value;

		let lastsearch='';

		let categorygroup;
		let finalgroup;

		finalgroup = obj;
		updatedisplay();

		

		srcbtn.addEventListener('click', selectobj);

		function selectobj(){
			categorygroup= obj["results"];
			finalgroup = [];

			if(searchterm.value.trim() === ''){
				finalgroup = obj;
			}else {
				const lowercasesearchterm = searchterm.value.trim().toLowerCase();
				if(category.value.toLowerCase() === 'title'){
					finalgroup = categorygroup.filter(book => book.title.includes(lowercasesearchterm));
				}
				if(category.value.toLowerCase() === 'authors'){
					finalgroup = categorygroup.filter(book => book.authors.includes(lowercasesearchterm));
				}
			}
			updatedisplay();
		}

		function updatedisplay(){
			while(division.firstChild){
				division.removeChild(division.firstChild);
			}

			
				for (let i=0;i< finalgroup.length ; i++){
					const block = document.createElement("div");
					const booktitle = document.createElement("h2");
					const bookauthor = document.createElement("h3");
					const seriesname = document.createElement("h3");
					const booktype = document.createElement("h3");
					const categories = document.createElement("h3");
					const language = document.createElement("h3");
					const favbutton = document.createElement("button");

					booktitle.textContent = obj["results"][i]["title"];
					bookauthor.textContent = `Author: ${obj["results"][i]["authors"]}`;
					seriesname.textContent = `Series: ${obj["results"][i]["series_name"]}`;
					booktype.textContent = `Book Type: ${obj["results"][i]["book_type"]}`;
					language.textContent = `Language: ${obj["results"][i]["language"]}`;
					favbutton.textContent = "Add to Favourites";

					favbutton.classList.add("favbtn");
					block.classList.add("block");

					block.appendChild(booktitle);
					block.appendChild(bookauthor);
					block.appendChild(seriesname);
					block.appendChild(booktype);
					block.appendChild(language);
					block.appendChild(favbutton);

					division.appendChild(block);
				}
			}
		
	}
	*/






		
	

	


