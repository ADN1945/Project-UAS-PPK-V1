var Application = {
	initApplication : function() {
		$(window).load('pageinit', '#page-one', function() {
			var country = "id";
			Application.initShowBerita(country);
		})
		$('#country').change(function (){
            var country = $("#country :selected").val();
            Application.initShowBerita(country);
      	})
		$(document).on('click', '#btnSearch', function (){
            var query = $("#boxSearch").val();
            var sort = $("#sort :selected").val();
            Application.initShowSearchResult(query,sort);
      	})
	},

	initShowSearchResult : function(query,sort) {
		$.ajax({
			url: 'https://newsapi.org/v2/everything?' +
				'q='+query+'&' +
				'sortBy='+sort+'&' +
				'apiKey=1231536b76ed409a9707dde28b99c895',
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show', {
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				var konten = $("#list-berita");
				if(konten.children().length != 0){
					konten.empty();
				}
				if(konten.children().length == 0){
					for(var i=0; i<dataObject.articles.length; i++){
						if(dataObject.articles[i].description == null){
							dataObject.articles[i].description = "";
						}

						var appendList = '<li><a href="'+ dataObject.articles[i].url +'"><h2>'+dataObject.articles[i].source.name+
						'</h2><p><b>'+
						dataObject.articles[i].title+
						'<div><img class="ui-corner-all ui-overlay-shadow img-thumbnail img-fluid img-berita" src="'+
						 dataObject.articles[i].urlToImage +
						'"></div></b></p><p>'+dataObject.articles[i].description+'</p></li>';
						$('#list-berita').append(appendList);
						$('#list-berita').listview('refresh');
					}
				}
				$(".img-berita").on("error",function(){
					$(this).attr('src','image/news-default.jpeg');
				});
			},
			complete : function() {
				$.mobile.loading('hide');
			}
		});
	},

	initShowBerita : function(country) {
		$.ajax({
			url: 'https://newsapi.org/v2/top-headlines?' +
				'country='+country+'&' +
				'apiKey=1231536b76ed409a9707dde28b99c895',
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show', {
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				var konten = $("#list-berita");
				if(konten.children().length != 0){
					konten.empty();
				}
				if(konten.children().length == 0){
					for(var i=0; i<dataObject.articles.length; i++){
						if(dataObject.articles[i].description == null){
							dataObject.articles[i].description = "";
						}

						var appendList = '<li><a href="'+ dataObject.articles[i].url +'"><h2>'+dataObject.articles[i].source.name+
						'</h2><p><b>'+
						dataObject.articles[i].title+
						'<div><img class="ui-corner-all ui-overlay-shadow img-thumbnail img-fluid img-berita" src="'+
						 dataObject.articles[i].urlToImage +
						'"></div></b></p><p>'+dataObject.articles[i].description+'</p></li>';
						$('#list-berita').append(appendList);
						$('#list-berita').listview('refresh');
					}
				}
				$(".img-berita").on("error",function(){
					$(this).attr('src','image/news-default.jpeg');
				});
			},
			complete : function() {
				$.mobile.loading('hide');
			}
		});
	},

	initShowDetailMhs : function(nim,index){
		$.ajax({
			url : 'http://192.168.1.11/PPK/prak7/web_service.php',
			type : 'get',
			beforeSend : function() {
				$.mobile.loading('show', {
					text : 'Please wait while retrievsdasdas..',
					textVisible : true
					
				});
			},
			success : function(dataObject) {
						$('#p-nim,#p-nama,#p-jurusan,#p-fakultas,#p-alamat,#p-nohp').empty();
						$('#p-nim').append('<b>NIM: </b>'+dataObject[index].NIM);
						$('#p-nama').append('<b>Nama: </b>'+dataObject[index].Nama);
						$('#p-jurusan').append('<b>Jurusan: </b>'+dataObject[index].Jurusan);
						$('#p-alamat').append('<b>Alamat: </b>'+dataObject[index].Alamat);
						$('#p-nohp').append('<b>No. HP: </b>'+dataObject[index].NoHp);
			},
			complete : function() {
				$.mobile.loading('hide');
			}
		});
	}
};
