function searchArtists(page)
{
	var searchValue = document.getElementById("search").value;
	$(document).ready(function() {  
		$.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.search&page="+page+"&artist="+searchValue+"&api_key=5b5c81738fd0681fbd3798ffff415939&format=json&callback=?", function(json) {  
			var html = '<table class="list">';
			var pagination = '';
			var totalResults;
			var itemsPerPage;
			var k = 0;
			var urlName = '';
			$.each(json.results, function(j, items){
				if(k == 1){
					totalResults = items;
				}
				if(k == 3){
					itemsPerPage = items;
				}
				k++;
			});
			$.each(json.results.artistmatches.artist, function(i, item) {
				urlName = item.name;
				urlName = urlName.replace(/ /g,"%20");
				html += "<tr class='artists'><td><a href=artist-info.html?name=" + urlName + " target='_blank'><img src='" + item.image[2]["#text"] + "'/></a></td><td><a href=artist-info.html?name=" + urlName + " target='_blank'>" + item.name + "</a></td></tr>";  
			});  
			html += "</table>";
			document.getElementById('result2').innerHTML = html;
			
			var numberOfPages = Math.ceil(totalResults/itemsPerPage);
			var j = 0;
			
			if(page <= 3){
				if((page-1)>0){
					pagination += "<li class='pagination-unactive' onclick='searchArtists("+(page-1)+")'> < </li>";
				}
				for (i=0; i<=(page + 3); i++){
					j=i+1;
					if(j == page){
						pagination += "<li class='active' ";
					}
					else{
						pagination +="<li class='pagination-unactive'";
					}
					pagination += "onclick='searchArtists("+j+")'>"+j+"</li>";
				}
				pagination += "<li class='pagination-unactive' onclick='searchArtists("+(page+1)+")'> > </li>";
				if( (page+10) < numberOfPages){
					pagination += "<li class='pagination-unactive' onclick='searchArtists("+(page+10)+")'> >> </li>";
				}
			}
			else if((page + 3) >= numberOfPages){
				pagination += "<li class='pagination-unactive' onclick='searchArtists("+(page-1)+")'> < </li>";
				if((page-10) > 0){
					pagination += "<li class='pagination-unactive' onclick='searchArtists("+(page-10)+")'> << </li>";
				}
				for (i=(page - 3); i<=(page + 3); i++){
					j=i+1;
					if(j == page){
						pagination += "<li class='active' ";
					}
					else{
						pagination +="<li class='pagination-unactive'";
					}
					pagination += "onclick='searchArtists("+j+")'>"+j+"</li>";
				}
			}
			else{
				pagination += "<li class='pagination-unactive' onclick='searchArtists("+(page-1)+")'> < </li>";
				if((page-10) > 0){
					pagination += "<li class='pagination-unactive' onclick='searchArtists("+(page-10)+")'> << </li>";
				}
				for (i=(page - 3); i<=(page + 3); i++){
					j=i+1;
					if(j == page){
						pagination += "<li class='active' ";
					}
					else{
						pagination +="<li class='pagination-unactive'";
					}
					pagination += "onclick='searchArtists("+j+")'>"+j+"</li>";
				}
				pagination += "<li class='pagination-unactive' onclick='searchArtists("+(page+1)+")'> > </li>";
				if( (page+10) < numberOfPages){
					pagination += "<li class='pagination-unactive' onclick='searchArtists("+(page+10)+")'> >> </li>";
				}
			}
			
		document.getElementById('pagination').innerHTML = pagination;
		});  
	});
}		