var animateFunc = function() {
    var hotcourses = getElementsByClassName('hotcourses')[0];
    window.hotcourseRemainingNodes = [];
    hotcourses.style.height = getComputedStyle(hotcourses).height;
    insertHotCourse(hotcourses,hotlistdata[10]); //todo: module dependency方案引入解决加载顺序依赖问题
    window.hotcourseRemainingItems = hotlistdata.slice(11);
		for (var i = 0; i < hotcourseRemainingItems.length; i++) {
		    var item = document.createElement('div');
		    item.setAttribute('class','m-hostcourseitem');
		    var innerhtml = ' <img src="'+window.hotcourseRemainingItems[i].middlePhotoUrl+'" alt=""><div class="info"><h4>'+window.hotcourseRemainingItems[i].name+'</h4><div class="studentnum">'+window.hotcourseRemainingItems[i].learnerCount+'</div></div>';
		    item.innerHTML = innerhtml;
		    hotcourseRemainingNodes.push(item);
		};
    var first = $('.hotlist .m-hostcourseitem:first')[0];
    var heightParent = window.getComputedStyle(first.parentNode);
    first.parentNode.style.cssText.height = heightParent;
	var timer = window.setInterval(function() {

            var first = $('.hotlist .m-hostcourseitem:first')[0];
            var heightParent = parseInt(window.getComputedStyle(first.parentNode).height);
            var margintop = window.getComputedStyle(first).marginTop;
            var done = function(){
                return function(){
                    first.parentNode.removeChild(first);
                    first.style.marginTop = margintop;
                    $('.hotlist .m-hostcourseitem:first')[0].parentNode.appendChild(hotcourseRemainingNodes.pop());
                    //first.style.cssText = "margin-top: "+ margintop ;

                    hotcourseRemainingNodes.push(first);
                }
            }()

            $(first).animate({
                marginTop: -1*parseInt(window.getComputedStyle( $('.hotlist .m-hostcourseitem:first')[0]).height)
            }, 500,done);
	},2000);

}