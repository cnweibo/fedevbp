(function(){
    var search = document.querySelector('li .search');
    search.addEventListener('mouseenter',function(ev){
        search.setAttribute('src','images/searchhover.png');
    });
    search.addEventListener('mouseleave',function(ev){
        search.setAttribute('src','images/search.png');
    });
}())