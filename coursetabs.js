(function(u) {
    var template =
    '<div class="m-tabs">\
        <div class="tab">\
            <div class="active">产品设计</div>\
            <div class="inactive">编程语言</div>\
        </div>\
        <div class="content">\
            <div class="row row-bgap20">\
                <div class="course col1-4">\
                    <div class="preview"><img src="'+''+'" alt="混音全揭秘，舞曲实战篇，揭秘音乐，揭秘实战"/>\
                        <h4 class="title">混音全揭秘，舞曲实战篇，揭秘音乐，揭秘实战</h4>\
                        <h5 class="category">音频帮</h5>\
                        <p class="studentsnum">510</p>\
                        <p class="price">800.00</p>\
                    </div>\
                    <div class="detail j-hidden">\
                        <div class="row">\
                            <div class="col1-2">\
                                <img src="images/1.png" alt="手绘画系列教程" class="imagedesc"/>\
                            </div>\
                            <div class="col1-2">\
                                <div class="textdesc">\
                                    <h2>手绘画系列教程</h2>\
                                    <p class="studynum"><img src="images/person.png" alt=""/><span>57人在学</span></p>\
                                    <p>发布者：几分钟网</p>\
                                    <p>分类： 手绘设计</p>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="row">\
                            <p class="detailtext">生活中不乏很多美好的画面，何不用画笔记录下来呢？那么就跟几分钟网一起来记录美好画面吧！</p>\
                        </div>\
                    </div>\
                </div> <!-- course -->\
            </div>\
            <div class="m-paginator">\
                <a href="" class="left">&lt;</a>\
                <ol class="paginator">\
                    <li><a href="">1</a></li>\
                    <li><a href="">2</a></li>\
                    <li class="active"><a href="">3</a></li>\
                    <li><a href="">4</a></li>\
                    <li><a href="">5</a></li>\
                    <li><a href="">6</a></li>\
                    <li><a href="">7</a></li>\
                    <li><a href="">8</a></li>\
                </ol>\
                <a href="" class="right">&gt;</a>\
            </div>\
        </div>  <!-- $content -->\
    </div>\
    ';
    // 构造函数
    function coursetabs(options) {
        this.tabs = [
            {
                url: 'http://study.163.com/webDev/couresByCategory.htm',
                querystr: '?pageNo=1&psize=20&type=10',
                title: '产品设计',
                type: 10
            },
            {
                url: 'http://study.163.com/webDev/couresByCategory.htm',
                querystr: '?pageNo=1&psize=20&type=20',
                title: '编程语言',
                type: 20
            },

        ];
        this.parent = getElementsByClassName('coursecontainer')[0];
        this.pdisplaylimit = 8;
        this.pagination = {};
        this.datatype =10;
        this._activetab = 0;
        this.tabcontainer = {};
        this.contentcontainer = {};
    }
    u.extend(coursetabs.prototype,{
        poptab: function(tabidx) { // populate all the data in this tab 
            var that = this; // cache the coursetabs object
            ajax.get(this.tabs[tabidx].url+this.tabs[tabidx].querystr,'',function(data) {
                that.pagination = data.pagination;
                var _tabs = '<div class="tab">\ ';
                for (var i = 0; i < that.tabs.length; i++) {//默认第0个tab为active
                    _tabs += '<div class="tabitem '+(i==that._activetab?"active":"")+'">'+that.tabs[i].title+'</div>\ '
                };
                _tabs+='</div>\ ';
                var tabcontainer ='<div class="maincontent m-tabs">\
                        '+ _tabs +'<div class="content">\
                            <!-- paginator here -->\
                        </div>  <!-- $content -->\
                    </div>\
                ' ;
                that.tabcontainer = u.html2node(tabcontainer);
                that.parent.insertAdjacentElement('afterbegin',that.tabcontainer);
                var contentcontainer = getElementsByClassName('content',that.parent)[0];
                that.contentcontainer = contentcontainer;
                for (var i = 0; i < data.list.length; i++) {
                    if (i%4==0){
                        // insert a row every four course
                        var rowhtml = '<div class="row row-bgap20 row'+(i/4)+' ">\
                            </div>\
                        ';
                        contentcontainer.appendChild(u.html2node(rowhtml));
                        var rownode = getElementsByClassName('row'+(i/4))[0];
                    }
                    var _tpl = '<div class="course col1-4">\
                                <div class="preview"><img src="'+data.list[i].middlePhotoUrl+'" alt="混音全揭秘，舞曲实战篇，揭秘音乐，揭秘实战"/>\
                                    <h4 class="title">'+data.list[i].name+'</h4>\
                                    <h5 class="category">'+data.list[i].provider+'</h5>\
                                    <p class="studentsnum">'+data.list[i].learnerCount+'</p>\
                                    <p class="price">'+data.list[i].price+'</p>\
                                </div>\
                                <div class="detail j-hidden">\
                                    <div class="row">\
                                        <div class="col1-2">\
                                            <img src="'+data.list[i].middlePhotoUrl+'" alt="手绘画系列教程" class="imagedesc"/>\
                                        </div>\
                                        <div class="col1-2">\
                                            <div class="textdesc">\
                                                <h2>手绘画系列教程</h2>\
                                                <p class="studynum"><img src="images/person.png" alt=""/><span>'+data.list[i].learnerCount+'人在学</span></p>\
                                                <p>发布者：'+data.list[i].provider+'</p>\
                                                <p>分类： 手绘设计</p>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="row">\
                                        <div class="btcontainer">\
                                            <p class="detailtext">'+data.list[i].description+'</p>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div> <!-- course -->\
                    ' ;
                    // 由于在绑定事件时可能dom还没有插入，故而应该用事件解耦，后续改进
                    var course = u.html2node(_tpl);
                    rownode.appendChild(course);
                    // course hover detail display triggering
                    (function(){
                        addEvent(course,'mouseenter', function(e) {
                            // IE8兼容性支持
                            var that = e.srcElement || e.target;
                            var detail = getElementsByClassName('detail',that)[0];
                            if (detail.className.indexOf('j-hidden')) {
                                detail.classList.remove('j-hidden');
                                detail.classList.add('j-coursehovered');
                                // detail.className +=' j-coursehovered';
                            }
                        });
                        addEvent(course,'mouseleave', function(e) {
                            var that = e.srcElement || e.target;
                            var detail = getElementsByClassName('detail',that)[0];
                            if (detail.className.indexOf('j-hidden')==-1) {
                                detail.classList.add('j-hidden');
                                detail.classList.remove('j-coursehovered');
                                // detail.className +=' j-coursehovered';
                            }
                        });
                    }());   
                }
                // attach event for tab navigation
                (function() {
                    var tabs = getElementsByClassName('tabitem', that.parent);
                    for (var i = 0; i < tabs.length; i++) {
                        addEvent(tabs[i],'click',function(i) {
                           return function() {
                               that._activetab = i;
                               that.navtotab(i);
                           } 
                        }(i))
                    };
                    
                })();
                // 插入paginator
                var paginator = '<div class="m-paginator">\
                        <a href="'+that.tabs[tabidx].url+''+that.tabs[tabidx].querystr+'" class="left'+((that.pagination.pageIndex-1<=0)?" disabled":"")+'">&lt;</a>\
                        <ol class="paginator">\ ';
                for (var i = 0; i < that.pdisplaylimit; i++) {
                    paginator +='<li'+(((i+1)==that.pagination.pageIndex)?" class='active'":'')+'><a class="pitem" href="'+that.tabs[tabidx].url+'?pageNo='+(i+1)+'&psize='+that.pagination.pageSize+"&type="+that.datatype+'">'+(i+1)+'</a></li>\ ';        
                };
                paginator += '</ol>\
                        <a href="" class="right'+((that.pagination.pageIndex+1>=that.pagination.totlePageCount)?" disabled":"")+'">&gt;</a>\
                    </div>\ ';
                var paginatorNode = html2node(paginator);
                contentcontainer.appendChild(paginatorNode);
                // attach event for left/right nav
                var pleft = getElementsByClassName('left',paginatorNode)[0];
                addEvent(pleft,'click',function(e) {
                    e.preventDefault();
                    if (that.pagination.pageIndex-1 >0) {
                        that.navtopage(that.pagination.pageIndex-1);
                    }
                });
                var pright = getElementsByClassName('right',paginatorNode)[0];
                addEvent(pright,'click',function(e) {
                    e.preventDefault();
                    if (that.pagination.pageIndex+1 <that.pagination.totlePageCount) {
                        that.navtopage(that.pagination.pageIndex+1);
                    }
                });
                var pages = getElementsByClassName('pitem',paginatorNode);
                for (var i = 0; i < pages.length; i++) {
                    // attach event for page navigation
                    addEvent(pages[i],'click',(function(i) {
                        return function(e) {
                            e.preventDefault();
                            that.navtopage(i+1);
                        }
                    })(i))
                };
                
            });
        },
        navtotab: function(tabidx) {
            this.tabcontainer.innerHTML = '';
            console.dir(this.tabcontainer);
            this.tabcontainer.parentNode.removeChild(this.tabcontainer);
            this._activetab = tabidx;
            this.poptab(tabidx);
        },
        navtopage: function(pageidx) {
            var that = this;
            that.parent.classList.remove('j-popped');
            ajax.get(this.tabs[this._activetab].url+'?pageNo='+pageidx+'&psize='+this.pagination.pageSize+'&type='+this.tabs[this._activetab].type,'',function(data){
                that.pagination = data.pagination;
                // empty the contentcontainer
                that.contentcontainer.innerHTML='';
                for (var i = 0; i < data.list.length; i++) {
                    if (i%4==0){
                        // insert a row every four course
                        var rowhtml = '<div class="row row-bgap20 row'+(i/4)+' ">\
                            </div>\
                        ';
                        that.contentcontainer.appendChild(u.html2node(rowhtml));
                        var rownode = getElementsByClassName('row'+(i/4))[0];
                    }
                    var _tpl = '<div class="course col1-4">\
                                <div class="preview"><img src="'+data.list[i].middlePhotoUrl+'" alt="混音全揭秘，舞曲实战篇，揭秘音乐，揭秘实战"/>\
                                    <h4 class="title">'+data.list[i].name+'</h4>\
                                    <h5 class="category">'+data.list[i].provider+'</h5>\
                                    <p class="studentsnum">'+data.list[i].learnerCount+'</p>\
                                    <p class="price">'+data.list[i].price+'</p>\
                                </div>\
                                <div class="detail j-hidden">\
                                    <div class="row">\
                                        <div class="col1-2">\
                                            <img src="'+data.list[i].middlePhotoUrl+'" alt="手绘画系列教程" class="imagedesc"/>\
                                        </div>\
                                        <div class="col1-2">\
                                            <div class="textdesc">\
                                                <h2>手绘画系列教程</h2>\
                                                <p class="studynum"><img src="images/person.png" alt=""/><span>'+data.list[i].learnerCount+'人在学</span></p>\
                                                <p>发布者：'+data.list[i].provider+'</p>\
                                                <p>分类： 手绘设计</p>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="row">\
                                        <div class="btcontainer">\
                                            <p class="detailtext">'+data.list[i].description+'</p>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div> <!-- course -->\
                    ' ;
                    // 由于在绑定事件时可能dom还没有插入，故而应该用事件解耦，后续改进
                    var course = u.html2node(_tpl);
                    rownode.appendChild(course);
                    // course hover detail display triggering
                    (function(){
                        addEvent(course,'mouseenter', function(e) {
                            // IE8兼容性支持
                            var that = e.srcElement || e.target;
                            var detail = getElementsByClassName('detail',that)[0];
                            if (detail.className.indexOf('j-hidden')) {
                                detail.classList.remove('j-hidden');
                                detail.classList.add('j-coursehovered');
                                // detail.className +=' j-coursehovered';
                            }
                        });
                        addEvent(course,'mouseleave', function(e) {
                            var that = e.srcElement || e.target;
                            var detail = getElementsByClassName('detail',that)[0];
                            if (detail.className.indexOf('j-hidden')==-1) {
                                detail.classList.add('j-hidden');
                                detail.classList.remove('j-coursehovered');
                                // detail.className +=' j-coursehovered';
                            }
                        });
                    }());   
                }
                // 插入paginator
                var paginator = '<div class="m-paginator">\
                        <a href="'+that.tabs[that._activetab].url+''+that.tabs[that._activetab].querystr+'" class="left'+((that.pagination.pageIndex-1<=0)?" disabled":"")+'">&lt;</a>\
                        <ol class="paginator">\ ';
                for (var i = 0; i < that.pdisplaylimit; i++) {
                    paginator +='<li'+(((i+1)==that.pagination.pageIndex)?" class='active'":'')+'><a class="pitem" href="'+that.tabs[that._activetab].url+'?pageNo='+(i+1)+'&psize='+that.pagination.pageSize+"&type="+that.datatype+'">'+(i+1)+'</a></li>\ ';        
                };
                paginator += '</ol>\
                        <a href="" class="right'+((that.pagination.pageIndex+1>=that.pagination.totlePageCount)?" disabled":"")+'">&gt;</a>\
                    </div>\ ';
                var paginatorNode = html2node(paginator);
                that.contentcontainer.appendChild(paginatorNode);
                // attach event for left/right nav
                var pleft = getElementsByClassName('left',paginatorNode)[0];
                addEvent(pleft,'click',function(e) {
                    e.preventDefault();
                    if (that.pagination.pageIndex-1 >0) {
                        that.navtopage(that.pagination.pageIndex-1);
                    }
                });
                var pright = getElementsByClassName('right',paginatorNode)[0];
                addEvent(pright,'click',function(e) {
                    e.preventDefault();
                    if (that.pagination.pageIndex+1 <that.pagination.totlePageCount) {
                        that.navtopage(that.pagination.pageIndex+1);
                    }
                });
                var pages = getElementsByClassName('pitem',paginatorNode);
                for (var i = 0; i < pages.length; i++) {
                    // attach event for page navigation
                    addEvent(pages[i],'click',(function(i) {
                        return function(e) {
                            e.preventDefault();
                            that.navtopage(i+1);
                        }
                    })(i))
                };
                // everything is ready, remove the mask via remove .j-popped class on the contentcontainer
                that.parent.classList.add('j-popped');
            });
        }
    });
    // export coursetabs to window global
    window.coursetabs = coursetabs;

})(util);
