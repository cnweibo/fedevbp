(function(){
    var search = document.querySelector('li .search');
    search.addEventListener('mouseenter',function(ev){
        search.setAttribute('src','images/searchhover.png');
    });
    search.addEventListener('mouseleave',function(ev){
        search.setAttribute('src','images/search.png');
    });
    var course = document.getElementsByClassName('course col1-4');
    for (var i = 0; i < course.length; i++) {
    	course[i].addEventListener('mouseenter', function(e) {
    		var that = this;
    		var detail = that.querySelectorAll('div.detail')[0];
    		if (detail.className.indexOf('j-hidden')) {
	    		detail.classList.remove('j-hidden');
                detail.classList.add('j-coursehovered');
	    		// detail.className +=' j-coursehovered';
	    	}
    	});
		course[i].addEventListener('mouseleave', function(e) {
			var that = this;
			var detail = that.querySelectorAll('div.detail')[0];
			if (detail.className.indexOf('j-hidden')==-1) {
	    		detail.classList.add('j-hidden');
                detail.classList.remove('j-coursehovered');
	    		// detail.className +=' j-coursehovered';
	    	}
		});
    }
}())