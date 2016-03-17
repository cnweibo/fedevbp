var animateFunc = function() {
	var hotcourseRemainingNodes = [];
    var hotcourses = document.getElementsByClassName('hotcourses')[0];
    hotcourses.style.height = getComputedStyle(hotcourses).height;
    insertHotCourse(hotcourses,hotlistdata[11]); //todo: module dependency方案引入解决加载顺序依赖问题
	//setTimeout(function() {
	//	for (var i = 0; i < 10; i++) {
	//	    var item = document.createElement('div');
	//	    item.setAttribute('class','m-hostcourseitem');
	//	    var innerhtml = ' <img src="'+window.hotlistdata[i].middlePhotoUrl+'" alt=""><div class="info"><h4>'+window.hotlistdata[i].name+'</h4><div class="studentnum">'+window.hotlistdata[i].learnerCount+'</div></div>';
	//	    item.innerHTML = innerhtml;
	//	    hotcourseRemainingNodes.push(item);
	//	};
	//});
    var first = $('.hotlist .m-hostcourseitem:first')[0];
    var heightParent = window.getComputedStyle(first.parentNode);
    first.parentNode.style.cssText.height = heightParent;
	var timer = window.setInterval(function() {

            var first = $('.hotlist .m-hostcourseitem:first')[0];
            var heightParent = parseInt(window.getComputedStyle(first.parentNode).height);
            var margintop = window.getComputedStyle(first).marginTop;
            function done(){
                console.log('animation finished ');
                first.parentNode.removeChild(first);
                first.style.marginTop = margintop;
                $('.hotlist .m-hostcourseitem:first')[0].parentNode.appendChild(first);
                //first.style.cssText = "margin-top: "+ margintop ;
                console.log(first);

                hotcourseRemainingNodes.push(first);
            }

            $(first).animate({
                marginTop: -1*parseInt(window.getComputedStyle( $('.hotlist .m-hostcourseitem:first')[0]).height)
            }, 500,done);
	},2000);

}