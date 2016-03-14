(function(){
    function addEvent(el,event,handler) {
        if (el.addEventListener){
            el.addEventListener(event,handler,false);
        }
        else{
            el.attachEvent("on"+event, handler);
        }
    }
    function getElementsByClassName(className,root,tagName) {   
        if(root){
            root=typeof root=="string" ? document.getElementById(root) : root;   
        }else{
            root=document.body;
        }
        tagName=tagName||"*";                                    
        if (document.getElementsByClassName) {                   
            return root.getElementsByClassName(className);
        }else { 
            var tag= root.getElementsByTagName(tagName);   
            var tagAll = [];                                    
            for (var i = 0; i < tag.length; i++) {                
                for(var j=0,n=tag[i].className.split(' ');j<n.length;j++){    
                    if(n[j]==className){
                        tagAll.push(tag[i]);
                        break;
                    }
                }
            }
            return tagAll;
        }
    }
    var search = document.querySelector('li .search');
    addEvent(search,'mouseenter',function(ev){
        search.setAttribute('src','images/searchhover.png');
    });
    addEvent(search,'mouseleave',function(ev){
        search.setAttribute('src','images/search.png');
    });
    var course = getElementsByClassName('course col1-4');
    for (var i = 0; i < course.length; i++) {
    	addEvent(course[i],'mouseenter', function(e) {
    		var that = this;
    		var detail = that.querySelectorAll('div.detail')[0];
    		if (detail.className.indexOf('j-hidden')) {
	    		detail.classList.remove('j-hidden');
                detail.classList.add('j-coursehovered');
	    		// detail.className +=' j-coursehovered';
	    	}
    	});
		addEvent(course[i],'mouseleave', function(e) {
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