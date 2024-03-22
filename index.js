
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
		console.error(`Fetch problem: ${err.message}`);
	})
	// function to display the data fetched by API

	function initialize(obj){
		let searchterm = document.querySelector("#search");
		let srcbtn = document.querySelector("#srbtn");
		let category = document.querySelector("select");
		
		

		let lastcategory = category.value;

		let lastsearch='';

		let categorygroup;
		let finalgroup;

		finalgroup = obj['results'];
		updatedisplay(finalgroup);

		
		finalgroup = [];
		
		srcbtn.addEventListener('click', selectobj);

		function selectobj(){
			finalgroup = [];

			if(searchterm.value.trim() === ''){
				finalgroup = obj;
			}else {
				let lowercasesearchterm = searchterm.value.trim().toLowerCase();
				if(category.value.toLowerCase() === 'title'){
					finalgroup = obj["results"].filter(book => book.title.toLowerCase().includes(lowercasesearchterm));
				}
				if(category.value.toLowerCase() === 'authors'){
					finalgroup = obj["results"].filter(book => book.authors[0].toLowerCase().includes(lowercasesearchterm));
				}
			}
			updatedisplay(finalgroup);
		} 

		function updatedisplay(finalgroup){
			while(division.firstChild){
				division.removeChild(division.firstChild);
			}

			
			for (let i=0;i < 25 ; i++){
			//creating elements where we can store data

			const block = document.createElement("div"); //creating division so to show in grid
			const booktitle = document.createElement("h2");
			const bookauthor = document.createElement("h3");
			const seriesname = document.createElement("h3");
			const booktype = document.createElement("h3");
			const categories = document.createElement("h3");
			const language = document.createElement("h3");
			const favbutton = document.createElement("button");
			const summary = document.createElement("button");
			const cover = document.createElement("img");
			
			//Adding data to the elements
			booktitle.textContent = finalgroup[i]["title"];
			bookauthor.textContent = `Author: ${finalgroup[i]["authors"]}`;
			seriesname.textContent = `Series: ${finalgroup[i]["series_name"]}`;
			booktype.textContent = `Book Type: ${finalgroup[i]["book_type"]}`;
			language.textContent = `Language: ${finalgroup[i]["language"]}`;
			favbutton.textContent = "Add to Favourites";
			summary.textContent = "View Summary";
			cover.src = finalgroup[i]['published_works'][0]['cover_art_url'];

			favbutton.classList.add("favbtn");
			summary.classList.add("summary");
			block.classList.add("block");
			cover.classList.add("cover");

			//Adding elements to the division we created to show them in grid
			block.appendChild(cover);
			block.appendChild(booktitle);
			block.appendChild(seriesname);
			block.appendChild(bookauthor);
			block.appendChild(booktype);
			block.appendChild(language);
			block.appendChild(favbutton);
			block.appendChild(summary);

			//Adding the division we created in one division which will contain all the inner divisions and show them in grid display
			division.appendChild(block);					
				}
			}
		
	}






		
	

	


