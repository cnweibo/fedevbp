function followus() {
	ajax.get('http://study.163.com/webDev/attention.htm','',function(data) {
	    if (data==1){
	        setCookie('followSuc','followed',1);
	    }
	    getElementsByClassName('followus')[0].classList.add('j-followed');
	})
}
function unfollowus() {
	ajax.get('http://study.163.com/webDev/attention.htm','',function(data) {
	    if (data==1){
	        // 实际环境中，应该通过这个后台接口来实现unfollow,例子中我们直接
	        // 清除followSeuc cookie
	    }
	});
	setCookie('followSuc','',-1);
    getElementsByClassName('followus')[0].classList.remove('j-followed');
	
}