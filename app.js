//var apiKey= "1231536b76ed409a9707dde28b99c895";
var apiKey = "d8b22c9de9d943168629cca1d606a4f8";
//var apiKey ="313500df82964807a20cb6a5ad64de19";
var Application = {
	initApplication : function() {		
		var page;
		var country, category;
		var pageContext;
		var chosenTheme;
		$(window).load('pageinit', '#page-one', function() {
			page = 1;
			pageContext = "headline";
			country = "id";
			Application.initShowBerita(country, page);	
		  })
		$('#country').change(function (){
			page = 1;
			pageContext = "headline";
			country = $("#country :selected").val();			
            Application.initShowBerita(country, page);
		  })
		$('#category').change(function (){
			page = 1;
			pageContext = "showCat";
			category = $("#category :selected").val();
			country = $("#country :selected").val();
            Application.initShowCatResult(country,category,page);
      	  })
		$(document).on('click', '#btnSearch', function (){
			page = 1;
			pageContext = "search";
            var query = $("#boxSearch").val();
            var sort = $("#sort :selected").val();
            Application.initShowSearchResult(query,sort,page);
		  })
		$(document).on('click', '#btnViewMode', function (){
			chosenTheme = $("#btnViewMode :selected").val();
			//alert(chosenTheme);
            Application.changeTheme(chosenTheme);
		  })
		window.onscroll = function() {
			var body = document.body,html = document.documentElement;
			if ((window.innerHeight + window.scrollY + 130) >= Math.max(body.scrollHeight, body.offsetHeight, 
				html.clientHeight, html.scrollHeight,html.offsetHeight)) {
				page = page+1;

				if(pageContext == "headline"){
					Application.initShowBerita(country,page);
				}else if (pageContext == "showCat"){				
					Application.initShowCatResult(country,category,page);
				}else if (pageContext =="search"){
					Application.initShowSearchResult(country,sort,page);
				}else if (pageContext =="MyList"){
					//Do Nothing..
				}
			}
		}
		$(document).on('click', '.readLater', function (){
			var link = $(this).attr('link');
			var gambar = $(this).attr('gambar');
			var judul = $(this).attr('judul');
			Application.saveBerita(link,gambar,judul);
		})
		$(document).on('click', '#btnMyList', function (){
			pageContext = "MyList";
			Application.getMyList();
		})
		$(document).ready(function(){								//Tombol Go to Top
			$("#top").click(function(){
				$('html, body').animate({scrollTop : 0},800);				
			});
		});
	},

	getMyList : function(){
		$.ajax({
			url: 'getList.php',
			type: 'GET',
			success: function(dataObject){
				var konten = $("#list-berita");
				if(konten.children().length != 0){
					konten.empty();
				}				
					for(var i=0; i<dataObject.length; i++){
						var appendList = '<div class="batasKonten"></div><div class="LightStyle article rowKonten"><a href="'+ dataObject[i].link +
						'"><div class="LightStyle"><img class="ui-corner-all ui-overlay-shadow img-thumbnail img-fluid img-berita " src="'+
						dataObject[i].gambar +
					    '"></div><div></a><p><b>'+ 
						dataObject[i].judul+
						'</b></p></div></div><div class="batasKonten"></div>';
						$('#list-berita').append(appendList);						
						//ajax
					}
				
				$(".img-berita").on("error",function(){				//Memberi gambar default untuk berita tanpa gambar
					$(this).attr('src','image/news-default.jpeg');
				});
			}
		 }); 

	},
	
	saveBerita : function(link, gambar, judul){
		$.ajax({
			url: 'insert.php',
			type: 'POST',
			data: 'judul=' + judul + '&link=' + link + '&gambar=' + gambar,

			success: function(data){
				alert("Berita tersimpan di My List");
			}
		 }); 

	},

	changeTheme : function(chosenTheme){					//Mengganti Tema
		if(chosenTheme == "LightStyle"){
			var x = document.querySelectorAll(".LightStyle");  
			for (var i = 0; i<x.length;i++ ){
				x[i].style.backgroundColor = "white";
				x[i].style.color = "black"; 
			}
		} if (chosenTheme == "DarkStyle"){
			var x = document.querySelectorAll(".LightStyle");  
			for (var i = 0; i<x.length;i++ ){
				x[i].style.backgroundColor = "black";
				x[i].style.color = "white"; 
			}
		}
		//document.querySelector(".LightStyle").style;
		/*
		var header = document.getElementById("header");
		var kontainerBerita = document.getElementById("list-berita");
		var rowBerita = document.getElementsByClassName(oldTheme);		
		
		header.classList.replace(oldTheme,chosenTheme);
		kontainerBerita.classList.replace(oldTheme,chosenTheme);
		for (var i = 0;i < rowBerita.length; i++){
			rowBerita[i].classList.replace(oldTheme,chosenTheme);
		}
		*/
	},

	initShowBerita : function(country, page) {						//Show Top Headline Negara tertentu
		$.ajax({
			url: 'https://newsapi.org/v2/top-headlines?' +
				'country='+country+'&' +
				'page='+page+'&' +
				'apiKey='+apiKey,
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show', {
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				var konten = $("#list-berita");

				if(konten.children().length != 0 && page == 1){
					konten.empty();
				}
				
					for(var i=0; i<dataObject.articles.length; i++){
						if(dataObject.articles[i].description == null || dataObject.articles[i].description == "null" ){
							dataObject.articles[i].description = "";
						} 
						var appendList = '<div class="batasKonten"></div><div class="LightStyle article rowKonten"><a href="'+ dataObject.articles[i].url +
						'"><div class="LightStyle"><img class="ui-corner-all ui-overlay-shadow img-thumbnail img-fluid img-berita " src="'+
						dataObject.articles[i].urlToImage +
					    '"></div><div><h2>'+dataObject.articles[i].source.name+
						'</h2></a><p><b>'+ 
						dataObject.articles[i].title+
						'</b></p><p>'+dataObject.articles[i].description+'</p></div><button class="btn btn-primary readLater" link="'+dataObject.articles[i].url+'" judul="'+dataObject.articles[i].title+'" gambar="'+dataObject.articles[i].urlToImage+'"  type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-save">Read Later</span></button></div><div class="batasKonten"></div>';
						$('#list-berita').append(appendList);
						
						//ajax
					}
				
				$(".img-berita").on("error",function(){				//Memberi gambar default untuk berita tanpa gambar
					$(this).attr('src','image/news-default.jpeg');
				});
			},
			complete : function() {
				var chosenTheme = $("#btnViewMode :selected").val();
				Application.changeTheme(chosenTheme);
				$.mobile.loading('hide');
			}
		});
	},

	initShowCatResult : function(country,category,page) {
		$.ajax({
			url: 'https://newsapi.org/v2/top-headlines?' +
				'country='+country+'&' +
				'category='+category+'&' +
				'page='+page+'&' +
				'apiKey='+apiKey,
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show', {
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				

				var konten = $("#list-berita");
				if(konten.children().length != 0 && page == 1){
					konten.empty();
				}
					for(var i=0; i<dataObject.articles.length; i++){
						if(dataObject.articles[i].description == null){
							dataObject.articles[i].description = "";
						}

						var appendList = '<div class="batasKonten"></div><div class="LightStyle article rowKonten"><a href="'+ dataObject.articles[i].url +
						'"><div class="LightStyle"><img class="ui-corner-all ui-overlay-shadow img-thumbnail img-fluid img-berita" src="'+
						dataObject.articles[i].urlToImage +
					    '"></div><div><h2>'+dataObject.articles[i].source.name+
						'</h2></a><p><b>'+ 
						dataObject.articles[i].title+
						'</b></p><p>'+dataObject.articles[i].description+'</p></div><button class="readLater" link="'+dataObject.articles[i].url+'" judul="'+dataObject.articles[i].title+'" gambar="'+dataObject.articles[i].urlToImage+'"  type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-save">Read Later</span></button></div><div class="batasKonten"></div>';
						$('#list-berita').append(appendList);
					}
				$(".img-berita").on("error",function(){
					$(this).attr('src','image/news-default.jpeg');
				});
			},
			complete : function() {
				var chosenTheme = $("#btnViewMode :selected").val();
				Application.changeTheme(chosenTheme);
				$.mobile.loading('hide');
			}
		});
	},

	initShowSearchResult : function(query,sort,page) {
		$.ajax({
			url: 'https://newsapi.org/v2/everything?' +
				'q='+query+'&' +
				'sortBy='+sort+'&' +
				'page='+page+'&' +
				'apiKey='+apiKey,
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show', {
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				var konten = $("#list-berita");
				if(konten.children().length != 0 && page == 1){
					konten.empty();
				}				
					for(var i=0; i<dataObject.articles.length; i++){
						
						if(dataObject.articles[i].description == null || dataObject.articles[i].description == "null" ){
							dataObject.articles[i].description = "";
						}

						var appendList = '<div class="batasKonten"></div><div class="LightStyle article rowKonten"><a href="'+ dataObject.articles[i].url +
						'"><div class="LightStyle col-md-5"><img class="ui-corner-all ui-overlay-shadow img-thumbnail img-fluid img-berita" src="'+
						dataObject.articles[i].urlToImage +
					    '"></div><div class="LightStyle col-md-7"><h2>'+dataObject.articles[i].source.name+
						'</h2></a><p><b>'+ 
						dataObject.articles[i].title+
						'</b></p><p>'+dataObject.articles[i].description+'</p></div><button class="readLater" link="'+dataObject.articles[i].url+'" judul="'+dataObject.articles[i].title+'" gambar="'+dataObject.articles[i].urlToImage+'"  type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-save">Read Later</span></button></div><div class="batasKonten"></div>';
						$('#list-berita').append(appendList);						
					}				
				$(".img-berita").on("error",function(){
					$(this).attr('src','image/news-default.jpeg');
				});
			},
			complete : function() {
				var chosenTheme = $("#btnViewMode :selected").val();
				Application.changeTheme(chosenTheme);
				$.mobile.loading('hide');
			}
		});
	}

};


