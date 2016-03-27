    (function(u) {
        
        // hotList class constructor function
        function hotList(configuration) {
            // configuration layout{container: '',url:''}
            configuration = configuration || {container: getElementsByClassName('hotlist')[0],url:'/hotcourselist.json'};
            u.extend(this,configuration);
            u.extend(this,eventer);
        }
        hotList.prototype.ajaxsucc = function(data) {
            window.hotlistdata = data;
            var parent = getElementsByClassName('hotcourses')[0];
            for (var i = 0; i < 10; i++) {
                u.insertHotCourse(parent,data[i]);
            }
            this.emit('populated');
        }
        hotList.prototype.populate = function() {
            var that = this; // cache hotList this pointer
            // ajax handling
            
            ajax.get('http://study.163.com/webDev/hotcouresByCategory.htm','',that.ajaxsucc.bind(that));
            
        }
        // export hotList class
        window.hotList = hotList;
    })(util);
