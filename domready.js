$(function() {
	var hotcourseRemNodes = [];
	setTimeout(function() {
		for (var i = 0; i < 10; i++) {
		    var item = document.createElement('div');
		    item.setAttribute('class','m-hostcourseitem');
		    var innerhtml = ' <img src="'+window.hotlistdata[i].middlePhotoUrl+'" alt=""><div class="info"><h4>'+window.hotlistdata[i].name+'</h4><div class="studentnum">'+window.hotlistdata[i].learnerCount+'</div></div>';
		    item.innerHTML = innerhtml;
		    hotcourseRemNodes.push(item);
		};	
	});
	
	var timer = window.setInterval(function() {
		var first = $('.hotlist .m-hostcourseitem:first')[0];
		first.animate({
			marginTop: -40
		},500);
		
	},500);

}())