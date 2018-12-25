var Application = {
	initApplication : function() {
		$(window).load('pageinit', '#page-one', function() {
			Application.initShowMhs();
		})
		$(document).on('click', '#detail-mhs', function (){
            var nim = $(this).data('nimmhs');
            var index = $(this).data('indexmhs');
            Application.initShowDetailMhs(nim,index);
      	})
	},

	initShowMhs : function() {
		$.ajax({
			url: 'http://192.168.1.11/PPK/prak7/web_service.php',
			type: 'get',
			beforeSend : function(){
				$.mobile.loading('show', {
					text : 'Please wait while retrieving data...',
					textVisible : true
				});
			},
			success : function(dataObject){
				for(var i=0; i<dataObject.length; i++){
					var appendList = '<li><a href="#page-two?id='+
					dataObject[i].NIM+'" target="_self" id="detail-mhs" data-nimmhs="'+
					dataObject[i].NIM+'" data-indexmhs="'+i+'"><h2>'+dataObject[i].Nama+'</h2><p>'+dataObject[i].NIM+
					'</p><p><b>'+dataObject[i].Fakultas+'</b></p></a></li>';
					$('#list-mhs').append(appendList);
					$('#list-mhs').listview('refresh');
				}
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
