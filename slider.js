
;(function(_){


  function Slider( opt ){

    extend(this, opt);

    // 容器节点 以及 样式设置
    this.container = this.container || getElementsByClassName('slidercontainer')[0];
    this.pageNum = this.images.length;
    this.activeImage = getElementsByClassName('active')[0];
    this.imgs = getElementsByClassName('banner');
    this.navpoints = getElementsByClassName('navpoint');
  }

  extend( Slider.prototype, eventer );

  extend( Slider.prototype, {

    // 直接跳转到指定页
    nav: function( pageIndex ){

      this.activeImage.src = this.images[pageIndex];

    }  
  })


  window.Slider = Slider;



})();

