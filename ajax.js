var ajax = (function() {
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

	function get(url, parameter, success) {
	   var req = createXMLHTTPObject();
	   if(!req) return;
	   req.onreadystatechange = function() {
	       if (req.readyState != 4) return;
	       if (req.status != 200 && req.status != 304) {
	           alert('HTTP error ' + req.status);
	           return;
	       }
	       success(JSON.parse(req.responseText));
	   }
	   req.open('GET', url, true);
	   if (req.readyState == 4) return;
	   req.send(parameter);
	}
	return {
		get: get
	}
})();