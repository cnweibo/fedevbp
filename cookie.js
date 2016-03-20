/**
 * get cookie
 * @param  {string} c_name cookie name
 * @return {string}        cookie value
 */
function getCookie(c_name){
	if (document.cookie.length>0){
　　　　c_start=document.cookie.indexOf(c_name + "=")　　
　　　　if (c_start!=-1){ 
			c_start=c_start + c_name.length+1　　
　　　　　　c_end=document.cookie.indexOf(";",c_start)　　
　　　　　　if (c_end==-1) c_end=document.cookie.length　
　　　　　　　return unescape(document.cookie.substring(c_start,c_end))
		}
　　}
　　　　return ""
}
/**
 * set the cookie
 * @param {string} c_name     cookie name
 * @param {string} value      cookie value
 * To add: domain=domain;path=path
 * @param {num} expiredhours    cookie expire in hours
 */
function setCookie(c_name, value, expiredhours){
	var exdate=new Date();
	exdate.setHours(exdate.getHours() + expiredhours);
	document.cookie=c_name+ "=" + escape(value) + ((expiredhours==null) ? "" : ";expires="+exdate.toGMTString());
}