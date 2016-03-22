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

// getComputedStyle for IE8
// getComputedStyle
!('getComputedStyle' in this) && (this.getComputedStyle = (function () {
    function getPixelSize(element, style, property, fontSize) {
        var
        sizeWithSuffix = style[property],
        size = parseFloat(sizeWithSuffix),
        suffix = sizeWithSuffix.split(/\d/)[0],
        rootSize;

        fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
        rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

        return (suffix == 'em') ? size * fontSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
    }

    function setShortStyleProperty(style, property) {
        var
        borderSuffix = property == 'border' ? 'Width' : '',
        t = property + 'Top' + borderSuffix,
        r = property + 'Right' + borderSuffix,
        b = property + 'Bottom' + borderSuffix,
        l = property + 'Left' + borderSuffix;

        style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
        : style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
        : style[l] == style[r] ? [style[t], style[r], style[b]]
        : [style[t], style[r], style[b], style[l]]).join(' ');
    }

    function CSSStyleDeclaration(element) {
        var
        currentStyle = element.currentStyle,
        style = this,
        fontSize = getPixelSize(element, currentStyle, 'fontSize', null);

        for (property in currentStyle) {
            if (/width|height|margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
                style[property] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
            } else if (property === 'styleFloat') {
                style['float'] = currentStyle[property];
            } else {
                style[property] = currentStyle[property];
            }
        }

        setShortStyleProperty(style, 'margin');
        setShortStyleProperty(style, 'padding');
        setShortStyleProperty(style, 'border');

        style.fontSize = fontSize + 'px';

        return style;
    }

    CSSStyleDeclaration.prototype = {
        constructor: CSSStyleDeclaration,
        getPropertyPriority: function () {},
        getPropertyValue: function ( prop ) {
            return this[prop] || '';
        },
        item: function () {},
        removeProperty: function () {},
        setProperty: function () {},
        getPropertyCSSValue: function () {}
    };

    function getComputedStyle(element) {
        return new CSSStyleDeclaration(element);
    }

    return getComputedStyle;
})(this));