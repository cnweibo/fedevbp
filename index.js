(function(){
    // String.trim IE兼容处理
    String.prototype.trim = function ()  
    {  
        return this.replace(/(^\s*)|(\s*$)/g, "");  
    } 
    // addEvent兼容处理
    function addEvent(el,event,handler) {
        if (el.addEventListener){
            el.addEventListener(event,handler,false);
        }
        else{
            el.attachEvent("on"+event, handler);
        }
    }
    // getElementsByClassName兼容处理函数
    function getElementsByClassName(className,root) {    
        // helper函数，判断a数组是否是b数组的子集
        function isAinB(a,b) {
            for (var i = 0; i < a.length; i++) { 
                // 对a[i]判断
                for (var j = 0; j < b.length; j++) {
                    if (a[i].trim() == b[j].trim()){
                        // a[i] in b 则继续判断下一个a[i++]是否属于b
                        break;
                    }
                };
                if (j == b.length){
                    // a[i] not in b
                    return false;
                }
            };
            return true;
        }
        if(root){
            root=typeof root=="string" ? document.getElementById(root) : root;   
        }else{
            root=document.body;
        }
        var tagName=tagName||"*";                                    
        if (document.getElementsByClassName) {                    //如果浏览器支持getElementsByClassName，就直接的用
            return root.getElementsByClassName(className);
        }else { 
            var tag= root.getElementsByTagName(tagName);    //获取指定元素
            var tagAll = [];                                    //用于存储符合条件的元素
            for (var i = 0; i < tag.length; i++) {                //遍历获得的元素
                var childelemClasses = tag[i].className.split(' ');//childelemClasses包含了待查元素的class集合数组,
                        //需要判断classnames数组是childelemClasses数组的子集
                var classnames = className.split(' ');
                if (isAinB(classnames,childelemClasses)){
                    tagAll.push(tag[i]);
                }
            }
            return tagAll;
        }
    }
    // querySelectorAll兼容处理
    if (!document.querySelectorAll) {
        document.querySelectorAll = function (selectors) {
            var style = document.createElement('style'), elements = [], element;
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];

            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (document._qsa.length) {
                element = document._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            document._qsa = null;
            return elements;
        };
    }
    // querySelector兼容处理
    if (!document.querySelector) {
        document.querySelector = function (selectors) {
            var elements = document.querySelectorAll(selectors);
            return (elements.length) ? elements[0] : null;
        };
    }
    // 用于在IE6和IE7浏览器中，支持Element.querySelectorAll方法
    var qsaWorker = (function () {
        var idAllocator = 10000;

        function qsaWorkerShim(element, selector) {
            var needsID = element.id === "";
            if (needsID) {
                ++idAllocator;
                element.id = "__qsa" + idAllocator;
            }
            try {
                return document.querySelectorAll("#" + element.id + " " + selector);
            }
            finally {
                if (needsID) {
                    element.id = "";
                }
            }
        }

        function qsaWorkerWrap(element, selector) {
            return element.querySelectorAll(selector);
        }

        // Return the one this browser wants to use
        return document.createElement('div').querySelectorAll ? qsaWorkerWrap : qsaWorkerShim;
    })();
    // search icon hover handling
    var search = document.querySelector('li .search');
    addEvent(search,'mouseenter',function(ev){
        search.setAttribute('src','images/searchhover.png');
    });
    addEvent(search,'mouseleave',function(ev){
        search.setAttribute('src','images/search.png');
    });
    // course hover detail display triggering
    var course = getElementsByClassName('course col1-4');
    for (var i = 0; i < course.length; i++) {
    	addEvent(course[i],'mouseenter', function(e) {
            // IE8兼容性支持
            var that = e.srcElement || e.target;
    		var detail = getElementsByClassName('detail',that)[0];
    		if (detail.className.indexOf('j-hidden')) {
	    		detail.classList.remove('j-hidden');
                detail.classList.add('j-coursehovered');
	    		// detail.className +=' j-coursehovered';
	    	}
    	});
		addEvent(course[i],'mouseleave', function(e) {
			var that = e.srcElement || e.target;
			var detail = getElementsByClassName('detail',that)[0];
			if (detail.className.indexOf('j-hidden')==-1) {
	    		detail.classList.add('j-hidden');
                detail.classList.remove('j-coursehovered');
	    		// detail.className +=' j-coursehovered';
	    	}
		});
    }
    // ajax handling
    var XMLHttpFactories = [
       function() {return new XMLHttpRequest()},
       function () {return new ActiveXObject("Msxml2.XMLHTTP")},
       function () {return new ActiveXObject("Msxml3.XMLHTTP")},
       function () {return new ActiveXObject("Microsoft.XMLHTTP")}];
    function createXMLHTTPObject() {
       var xmlhttp = false;
       for(i=0; i<XMLHttpFactories.length; i++) {
           try {
               xmlhttp = XMLHttpFactories[i]();
           }
           catch(e) {
               continue;
           }
           break;
       }
       return xmlhttp;
    }
    function ajaxread(file, postData) {
       var req = createXMLHTTPObject();
       if(!req) return;
       req.onreadystatechange = function() {
           if (req.readyState != 4) return;
           if (req.status != 200 && req.status != 304) {
               alert('HTTP error ' + req.status);
               return;
           }
           var data = window.hotlistdata = JSON.parse(req.responseText);
           var parent = document.getElementsByClassName('hotlist')[0];
           for (var i = 0; i < 10; i++) {
               var item = document.createElement('div');
               item.setAttribute('class','m-hostcourseitem');
               var innerhtml = ' <img src="'+data[i].middlePhotoUrl+'" alt=""><div class="info"><h4>'+data[i].name+'</h4><div class="studentnum">'+data[i].learnerCount+'</div></div>';
               item.innerHTML = innerhtml;
               parent.appendChild(item);
           };
           // updateobj('span', req.responseXML.getElementsByTagName('username')[0].firstChild.nodeValue);
       }
       req.open('GET', file, false);
       if (req.readyState == 4) return;
       req.send(postData);
    }
    function updateobj(obj, data) {
       document.getElementsByTagName(obj)[0].firstChild.nodeValue = data;
    }
    ajaxread('/hotcourselist.json');
}())