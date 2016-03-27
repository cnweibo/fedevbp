
;(function(u){


  function Slider( opt ){

    u.extend(this, opt);

    // 容器节点 以及 样式设置
    this.container = this.container || getElementsByClassName('slidercontainer')[0];
    this.pageNum = this.images.length;
    this.activeImage = getElementsByClassName('active',this.container)[0];
    this.imgs = getElementsByClassName('banner');
    this.activeIndex = 0;
    this.navpoints = getElementsByClassName('navpoint');
    this.previousnav = 0;
    this.timer5s = null;
  }

  u.extend( Slider.prototype, eventer );

  u.extend( Slider.prototype, {

    // 直接跳转到指定页
    nav: function( pageIndex ){

      this.activeImage.src = this.images[pageIndex];
      this.activeIndex = pageIndex%3;
      this.navpoints[this.previousnav].classList.remove('active');
      this.navpoints[this.activeIndex].classList.add('active');
      this.previousnav = this.activeIndex;

    },
    pause: function() {
      clearInterval(this.timer5s);
    },
    carasel: function() {
      var bannerIdx = 0;
      var that = this;
      // start a banner 5s timer
      var animateTimer5s = setInterval(stepBanner, 5000);
      that.timer5s = animateTimer5s;
      function stepBanner() {
          bannerIdx = that.activeIndex;
          that.activeImage.style.opacity = 0;
          that.nav(++bannerIdx%3);
          var animateTimer = setInterval(step, 20);
          var alpha = 0;
          function step() {
              alpha = alpha +  4;
              that.activeImage.style.opacity = alpha/100;
              if (alpha >=100){
                  that.activeImage.style.opacity =1;
                  clearTimeout(animateTimer);
              }
          }   
      }
    }
  })


  window.Slider = Slider;



})(util);

