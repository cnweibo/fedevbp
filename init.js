    // search icon hover handling
    var search = document.querySelector('li .search');
    addEvent(search,'mouseenter',function(ev){
        search.setAttribute('src','images/searchhover.png');
    });
    addEvent(search,'mouseleave',function(ev){
        search.setAttribute('src','images/search.png');
    });
// initialize hotlist course component and populate the course
    var hl = new hotList();
    hl.on('populated',animateFunc);
    hl.populate();
// check the disimissNotifier cookie
    if (getCookie('dismissNotifier')){
        getElementsByClassName('l-topremovable')[0].classList.add('j-hidden');
    }
// change state for the followus visual indication
    if (getCookie('followSuc')){
        getElementsByClassName('followus')[0].classList.add('j-followed');
    }
    // init the login form object
    var loginform = new loginModal();
    loginform.on('login',function() {
        // do login job here
        ajax.get('http://study.163.com/webDev/login.htm?userName='+loginform.username()+'&password='+md5(loginform.password()),'', function (data) {
            if (data == 0){
                loginform.resetForm();
                loginform.hide();
                setCookie('loginSucc','loggedin',1);
                followus();
            }
            else{
                loginform.loginError();
            }
        });
        // console.log(loginform.username() + ' ' +md5(loginform.password()));
    });
    // register the followus click handler:
    addEvent(document.getElementById('follow'),'click',function() {
        // if loginSucc cookie does not exist, show form
        if (getCookie('loginSucc')){
            // has logged into the system  and call the followus api
            followus();                  
        }else{
            loginform.show();
        }
    });
    // register the videothumb click handler
    addEvent(getElementsByClassName('videothumb')[0],'click',function(e) {
        getElementsByClassName('m-videointro')[0].classList.remove('j-hidden');
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    });
    // register the close button for video playing screen
    addEvent(getElementsByClassName('closevedio')[0],'click',function() {
        getElementsByClassName('m-videointro')[0].classList.add('j-hidden');
    })
    addEvent(getElementsByClassName('cancelfollow',document.getElementById('followed'))[0],'click', function() {
        setCookie('followSuc','',-1);
        unfollowus();
    });
    addEvent(getElementsByClassName('dismiss')[0],'click',function() {
        setCookie('dismissNotifier','true',100);
        getElementsByClassName('l-topremovable')[0].classList.add('j-hidden');
    })
    // banner slider初始化
    var slider = new Slider({
        images: [
            'images/banner1.jpg',
            'images/banner2.jpg',
            'images/banner3.jpg'
        ]
    });
    for (var i = 0; i < slider.imgs.length; i++) {
        
        addEvent(slider.navpoints[i],'click',function(i) {
            return function(e) {
                slider.activeImage.style.opacity = 0;
                slider.nav(i);
                var animateTimer = setInterval(step, 20);
                var alpha = 0;
                function step() {
                    alpha = alpha +  4;
                    slider.activeImage.style.opacity = alpha/100;
                    if (alpha >=100){
                        slider.activeImage.style.opacity =1;
                        clearTimeout(animateTimer);
                    }
                }
            }
        }(i));
        addEvent(slider.imgs[i],'mouseenter',function(i) {
            return function() {
                slider.pause();                        
            }
        }(i));
        addEvent(slider.imgs[i],'mouseleave',function(i) {
            return function() {
                slider.carasel();
            }
        }(i));  
    };
    slider.carasel();
    
    addEvent(slider.activeImage,'click',function(e) {
        console.log(e);
    })
    var coursetab = new coursetabs();
    coursetab.poptab(0);