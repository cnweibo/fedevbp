
    // String.trim IE兼容处理
    String.prototype.trim = function ()  
    {  
        return this.replace(/(^\s*)|(\s*$)/g, "");  
    } 
    // addEvent兼容处理
    function addEvent(el,event,handler) {
        if (el.addEventListener){
            el.addEventListener(event,handler,false);
        }
        else{
            el.attachEvent("on"+event, handler);
        }
    }
    // getComputedStyle兼容处理 
    if( !window.getComputedStyle) {
        window.getComputedStyle = function(e) {return e.currentStyle};
    }
    // getElementsByClassName兼容处理函数
    function getElementsByClassName(className,root) {    
        // helper函数，判断a数组是否是b数组的子集
        function isAinB(a,b) {
            for (var i = 0; i < a.length; i++) { 
                // 对a[i]判断
                for (var j = 0; j < b.length; j++) {
                    if (a[i].trim() == b[j].trim()){
                        // a[i] in b 则继续判断下一个a[i++]是否属于b
                        break;
                    }
                };
                if (j == b.length){
                    // a[i] not in b
                    return false;
                }
            };
            return true;
        }
        if(root){
            root=typeof root=="string" ? document.getElementById(root) : root;   
        }else{
            root=document.body;
        }
        var tagName=tagName||"*";                                    
        if (document.getElementsByClassName) {                    //如果浏览器支持getElementsByClassName，就直接的用
            return root.getElementsByClassName(className);
        }else { 
            var tag= root.getElementsByTagName(tagName);    //获取指定元素
            var tagAll = [];                                    //用于存储符合条件的元素
            for (var i = 0; i < tag.length; i++) {                //遍历获得的元素
                var childelemClasses = tag[i].className.split(' ');//childelemClasses包含了待查元素的class集合数组,
                        //需要判断classnames数组是childelemClasses数组的子集
                var classnames = className.split(' ');
                if (isAinB(classnames,childelemClasses)){
                    tagAll.push(tag[i]);
                }
            }
            return tagAll;
        }
    }
    // querySelectorAll兼容处理
    if (!document.querySelectorAll) {
        document.querySelectorAll = function (selectors) {
            var style = document.createElement('style'), elements = [], element;
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];

            style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);

            while (document._qsa.length) {
                element = document._qsa.shift();
                element.style.removeAttribute('x-qsa');
                elements.push(element);
            }
            document._qsa = null;
            return elements;
        };
    }
    // querySelector兼容处理
    if (!document.querySelector) {
        document.querySelector = function (selectors) {
            var elements = document.querySelectorAll(selectors);
            return (elements.length) ? elements[0] : null;
        };
    }
    // 用于在IE6和IE7浏览器中，支持Element.querySelectorAll方法
    var qsaWorker = (function () {
        var idAllocator = 10000;

        function qsaWorkerShim(element, selector) {
            var needsID = element.id === "";
            if (needsID) {
                ++idAllocator;
                element.id = "__qsa" + idAllocator;
            }
            try {
                return document.querySelectorAll("#" + element.id + " " + selector);
            }
            finally {
                if (needsID) {
                    element.id = "";
                }
            }
        }

        function qsaWorkerWrap(element, selector) {
            return element.querySelectorAll(selector);
        }

        // Return the one this browser wants to use
        return document.createElement('div').querySelectorAll ? qsaWorkerWrap : qsaWorkerShim;
    })();
    // IE8 function.bind兼容
    if (!Function.prototype.bind) { 
        Function.prototype.bind = function (oThis) { 
        if (typeof this !== "function") { 
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable"); 
        } 
        var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {}, 
        fBound = function () { 
        return fToBind.apply(this instanceof fNOP && oThis 
        ? this
        : oThis, 
        aArgs.concat(Array.prototype.slice.call(arguments))); 
        }; 
        fNOP.prototype = this.prototype; 
        fBound.prototype = new fNOP(); 
        return fBound; 
        }; 
    } 
    
    // search icon hover handling
    var search = document.querySelector('li .search');
    addEvent(search,'mouseenter',function(ev){
        search.setAttribute('src','images/searchhover.png');
    });
    addEvent(search,'mouseleave',function(ev){
        search.setAttribute('src','images/search.png');
    });
    
// helper functions
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


// customEvent事件系统
    var eventer = {
      // 注册事件
      on: function(event, fn) {
        var handles = this._handles || (this._handles = {}),
          calls = handles[event] || (handles[event] = []);

        // 找到对应名字的栈
        calls.push(fn);

        return this;
      },
      // 解绑事件
      off: function(event, fn) {
        if(!event || !this._handles) this._handles = {};
        if(!this._handles) return;

        var handles = this._handles , calls;

        if (calls = handles[event]) {
          if (!fn) {
            handles[event] = [];
            return this;
          }
          // 找到栈内对应listener 并移除
          for (var i = 0, len = calls.length; i < len; i++) {
            if (fn === calls[i]) {
              calls.splice(i, 1);
              return this;
            }
          }
        }
        return this;
      },
      // 触发事件
      emit: function(event){
        var args = [].slice.call(arguments, 1),
          handles = this._handles, calls;

        if (!handles || !(calls = handles[event])) return this;
        // 触发所有对应名字的listeners
        for (var i = 0, len = calls.length; i < len; i++) {
          calls[i].apply(this, args)
        }
        return this;
      }
    }
    function insertHotCourse(p,data){
        var item = document.createElement('div');
        item.setAttribute('class','m-hostcourseitem');
        var innerhtml = ' <img src="'+data.middlePhotoUrl+'" alt=""><div class="info"><h4>'+data.name+'</h4><div class="studentnum">'+data.learnerCount+'</div></div>';
        item.innerHTML = innerhtml;
        p.appendChild(item);
    }
// hotList class constructor function
function hotList(configuration) {
    // configuration layout{container: '',url:''}
    configuration = configuration || {container: getElementsByClassName('hotlist')[0],url:'/hotcourselist.json'};
    extend(this,configuration);
    extend(this,eventer);
}
hotList.prototype.ajaxsucc = function(data) {
    window.hotlistdata = data;
    var parent = getElementsByClassName('hotcourses')[0];
    for (var i = 0; i < 10; i++) {
        insertHotCourse(parent,data[i]);
    }
    this.emit('populated');
}
hotList.prototype.populate = function() {
    var that = this; // cache hotList this pointer
    // ajax handling
    
    ajax.get('http://study.163.com/webDev/hotcouresByCategory.htm','',that.ajaxsucc.bind(that));
    
}

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
