$(function() {
	var hotcourseRemainingNodes = [];
	setTimeout(function() {
		for (var i = 0; i < 10; i++) {
		    var item = document.createElement('div');
		    item.setAttribute('class','m-hostcourseitem');
		    var innerhtml = ' <img src="'+window.hotlistdata[i].middlePhotoUrl+'" alt=""><div class="info"><h4>'+window.hotlistdata[i].name+'</h4><div class="studentnum">'+window.hotlistdata[i].learnerCount+'</div></div>';
		    item.innerHTML = innerhtml;
		    hotcourseRemainingNodes.push(item);
		};	
	});
    var first = $('.hotlist .m-hostcourseitem:first')[0];
    var heightParent = window.getComputedStyle(first.parentNode);
    first.parentNode.style.cssText.height = heightParent;
	var timer = window.setInterval(function() {

            var first = $('.hotlist .m-hostcourseitem:first')[0];
            var heightParent = parseInt(window.getComputedStyle(first.parentNode).height);
            var margintop = window.getComputedStyle(first).marginTop;


            $(first).animate({
                marginTop: -1*parseInt(window.getComputedStyle( $('.hotlist .m-hostcourseitem:first')[0]).height)
            }, 500,function() {
                    console.log('animation finished ');
                    var el = $('.hotlist .m-hostcourseitem:first')[0];

                    el.parentNode.removeChild(el);
                    el.style.marginTop = 0;
                    $('.hotlist .m-hostcourseitem:first')[0].parentNode.appendChild(el);
                    //el.style.cssText = "margin-top: "+ margintop ;
                    console.log(el);

                    console.log(window.getComputedStyle(el).marginTop);
                    console.log(el.style.cssText.marginTop);

                    hotcourseRemainingNodes.push(el);

                }
            );
	},2000);

}())