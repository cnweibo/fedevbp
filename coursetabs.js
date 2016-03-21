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
                url: 'http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=10',
                title: '产品设计',
                data: []
            },
            {
                url: 'http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=20',
                title: '编程语言',
                data: []
            },

        ];
        this.parent = getElementsByClassName('coursecontainer')[0];

    }
    u.extend(coursetabs.prototype,{
        poptab: function(tabidx) { // populate all the data in this tab 
            var that = this; // cache the coursetabs object
            ajax.get(this.tabs[tabidx].url,'',function(data) {
                var tabcontainer ='<div class="maincontent m-tabs">\
                        <div class="tab">\
                            <div class="active">产品设计</div>\
                            <div class="inactive">编程语言</div>\
                        </div>\
                        <div class="content">\
                            <!-- paginator here -->\
                        </div>  <!-- $content -->\
                    </div>\
                ' ;
                that.parent.insertAdjacentElement('afterbegin',u.html2node(tabcontainer));
                var contentcontainer = getElementsByClassName('content',that.parent)[0];
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
                                    <h5 class="category">音频帮</h5>\
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
                                        <p class="detailtext">'+data.list[i].description+'</p>\
                                    </div>\
                                </div>\
                            </div> <!-- course -->\
                    ' ;
                    rownode.appendChild(u.html2node(_tpl));
                }
                        


            });
        },
        navtotab: function(tabidx) {
            
        }
    })
    window.coursetabs = coursetabs;

})(util);