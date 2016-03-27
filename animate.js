var animateFunc = function() {
    var hotcourses = getElementsByClassName('hotcourses')[0];
    window.hotcourseRemainingNodes = [];
    hotcourses.style.height = getComputedStyle(hotcourses).height;
    util.insertHotCourse(hotcourses,hotlistdata[10]); //todo: module dependency方案引入解决加载顺序依赖问题
    window.hotcourseRemainingItems = hotlistdata.slice(11);
		for (var i = 0; i < hotcourseRemainingItems.length; i++) {
		    var item = document.createElement('div');
		    item.setAttribute('class','m-hostcourseitem');
		    var innerhtml = ' <img src="'+window.hotcourseRemainingItems[i].middlePhotoUrl+'" alt=""><div class="info"><h4>'+window.hotcourseRemainingItems[i].name+'</h4><div class="studentnum">'+window.hotcourseRemainingItems[i].learnerCount+'</div></div>';
		    item.innerHTML = innerhtml;
		    hotcourseRemainingNodes.push(item);
		};
    var firsttocheck = getElementsByClassName('m-hostcourseitem')[0];
    var heightParent = window.getComputedStyle(firsttocheck.parentNode).height;
    firsttocheck.parentNode.style.cssText.height = heightParent;
	var timer = window.setInterval(function() {
            var height = parseInt(window.getComputedStyle(getElementsByClassName('m-hostcourseitem')[0]).height);
            // 
            // 1.启动10ms timer调用stepHotCourse函数实现first元素动画
            var first = getElementsByClassName('m-hostcourseitem')[0];
            var n =0;
            window.setTimeout(stepHotCourse, 10); //50 times
            function stepHotCourse() {
                n++;
                first.style.marginTop = (-n*height/50)+'px';
                if (n == 50){
                    done();
                }else{
                    window.setTimeout(stepHotCourse, 10);
                }
            }
            // 2.动画结束将first删除，数据归入remaining尾部，将remaining中的头元素创建dom插入active队列尾部
            
            var done = function() {
                
                hotcourseRemainingItems.push(hotlistdata.shift());
                var newdatatoinsert = hotcourseRemainingItems.pop();
                hotlistdata.push(newdatatoinsert);
                var item = document.createElement('div');
                item.setAttribute('class','m-hostcourseitem');
                var innerhtml = ' <img src="'+newdatatoinsert.middlePhotoUrl+'" alt=""><div class="info"><h4>'+newdatatoinsert.name+'</h4><div class="studentnum">'+newdatatoinsert.learnerCount+'</div></div>';
                item.innerHTML = innerhtml;
                first.parentNode.appendChild(item);
                first.parentNode.removeChild(first);
            }
	},5000);

}