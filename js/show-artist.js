function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'block')
	  e.style.display = 'none';
   else
	  e.style.display = 'block';
}

var artistName = getUrlVars()["name"];

$(document).ready(function() {  
	$.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+artistName+"&api_key=5b5c81738fd0681fbd3798ffff415939&format=json&callback=?", function(json) {  
		var html = '';
			html += "<h1 class='artist-name'>"+json.artist.name+"</h1><br/>";
			html += "<div class='image'><img class='image' src='"+json.artist.image[4]["#text"]+"'/></div>";
			html += "<div class='biografia'><p class='bio'>"+json.artist.bio.summary+"</p></div>"; 
		document.getElementById('result').innerHTML = html;
	}); 
});

$(document).ready(function() {  
	$.getJSON("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+artistName+"&api_key=5b5c81738fd0681fbd3798ffff415939&format=json&callback=?", function(json) { 	
		var albumList = '<table id="list">';
		$.each(json.topalbums.album, function(i, item) {
			albumList += '<tr><td class="albums" onclick="toggle_visibility(\''+item.name+'\');getInfo(\''+item.name+'\');">';
			albumList += item.name;
			albumList += "</td>";
			albumList += '<td id=\''+item.name+'\' style="display: none;" class="albumInfo">';
		});
		albumList += "</td></tr>";
		albumList += "</table>";
		document.getElementById('list').innerHTML = albumList;
	});
});

function getInfo(albumName){
	var trackList = '';
	$.getJSON("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist="+artistName+"&album="+albumName+"&api_key=5b5c81738fd0681fbd3798ffff415939&format=json&callback=?", function(result) { 	
		trackList += "<h3>"+result.album.name+"</h3>";
		trackList += "<p>Release date: "+result.album.wiki.published+"</p>";
		trackList += "<p> Tracks: <br/>";
		$.each(result.album.tracks.track, function(k, el) {
			trackList += (k+1)+". "+el.name+"<br/>";
		});
		trackList += "</p>";
		document.getElementById(albumName).innerHTML = trackList;
	});
	
}