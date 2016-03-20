

!function(){
  // 帮助函数
  // ----------

  // 将HTML转换为节点
  function html2node(str){
    var container = document.createElement('div');
    container.innerHTML = str;
    return container.children[0];
  }

  // 赋值属性
  // extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
  function extend(o1, o2){
    for(var i in o2) if(typeof o1[i] === 'undefined'){
      o1[i] = o2[i]
    } 
    return o1
  }




  // loginModal
  // -------

  var template = 
  '<div class="modallogin">\
    <div class="modalalign"></div>\
     <div class="modalbody">\
      <form action="" name="login" class="loginform">\
          <span class="close">x</span>\
          <h2 class="title">登录网易云课堂</h2>\
          <p class="username"><input placeholder="账号" type="text"/></p>\
          <p class="password"><input placeholder="密码" type="password"/></p>\
          <p class="validinfo"></p>\
          <button class="login">登录</button>\
      </form>\
     </div>\
  </div>\
  ';





  function loginModal(options){
    options = options || {};
    // 即 div.m-modal 节点
    this.container = this._layout.cloneNode(true);
    // 将options 复制到 组件实例上
    extend(this, options);


    this._initEvent();

  }



  extend(loginModal.prototype, {

    _layout: html2node(template),

    // 显示弹窗
    show: function(content){
      
      if(content) this.setContent(content);

      document.body.appendChild(this.container);

    },

    hide: function(){

      var container = this.container;
        document.body.removeChild(container);
    },
    username: function() {
      return getElementsByClassName('username',this.container)[0].children[0].value;
    },
    password: function() {
      return getElementsByClassName('password',this.container)[0].children[0].value;
    },
    resetForm: function() {
      var err = getElementsByClassName('validinfo',this.container)[0];
      err.classList.remove('error');
      getElementsByClassName('loginform',this.container)[0].reset();
      getElementsByClassName('username',this.container)[0].classList.remove('error');
      getElementsByClassName('password',this.container)[0].classList.remove('error');
    },
    loginError: function() {
      var err = getElementsByClassName('validinfo',this.container)[0];
        err.classList.add('error');
        err.innerHTML = "<p>用户名或者密码不匹配！</p>";
    },
    // 初始化事件
    _initEvent: function(){

      addEvent(getElementsByClassName('login',this.container)[0],'click',this._onLogin.bind(this));
      addEvent(getElementsByClassName('close',this.container)[0],'click',this._onClose.bind(this));

    },
    _onLogin: function(){
      var err = getElementsByClassName('validinfo',this.container)[0];
      // 表单验证: username/password min:max 6~20 chars 
      if (this.username().length<6 || this.username().length>20){
        err.classList.add('error');
        err.innerHTML = "<p>用户名字段长度必须在6和20个字符之间！</p>";
        getElementsByClassName('username',this.container)[0].classList.add('error');
      }else if (this.password().length<6 || this.password().length>20){
        err.classList.add('error');
        err.innerHTML = "<p>密码字段长度必须在6和20个字符之间！</p>";
        getElementsByClassName('password',this.container)[0].classList.add('error');
      }else {
        this.emit('login'); //only emit the login event outwards if form check ok
      }
    },
    _onClose: function(){
      this.emit('close');
      this.resetForm();
      this.hide();
    }
  })


  // 使用混入Mixin的方式使得Slider具有事件发射器功能
  extend(loginModal.prototype, eventer);
  //          5.Exports
  // ----------------------------------------------------------------------
  // 暴露API:  Amd || Commonjs  || Global 
  // 支持commonjs
  if (typeof exports === 'object') {
    module.exports = loginModal;
    // 支持amd
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return loginModal
    });
  } else {
    // 直接暴露到全局
    window.loginModal = loginModal;
  }

}()

