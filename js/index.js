/**
 * @author 刘虎
 * @date 2020/4/7 21:58
 */
$(function(){
    /**
     * 使用getJson方法读取本地的json文件，并将数据显示在界面中
     */
    $.getJSON("data.json",function (data) {
        if(data == null || data.length <= 0){
            alert("读取数据错误！")
        }else{
            var infoList = data.result;
            var str = "";
            for(var i = 0;i < infoList.length; i++){
                str += "<div class=\"information\"><div class=\"information-left\"><p>"+
                        infoList[i].title+"</p><span>"+
                        countTime(infoList[i].time)+"之前发布</span><span>54人已读</span></div><div class=\"information-right\"><img src=\""+
                        infoList[i].img+"\" alt=\"\"></div></div>"
            }
            $(".container-list").append(str);
        }
    })
})

/**
 * 计算文章以及发布多久了
 * @param time 文章发布的时间
 * @returns {string}
 */
function countTime(time) {
    var now = new Date();  //当前时间
    var page_time = new Date(time); //文章发布时间
    page_time.setFullYear(now.getFullYear());
    var timeDiff = now.getTime() - page_time.getTime();
    return getTimeDiff(timeDiff);
}

/**
 * 计算传入的时间戳具体是多长时间（以年、月、周、日、小时、分钟为单位）
 * @param timeDiff
 * @returns {string}
 */
function  getTimeDiff(timeDiff) {
    // 单位换算
    var min = 60 * 1000;
    var hour = min * 60;
    var day = hour * 24;
    var week = day * 7;
    var month = day * 30;
    var year = day * 365;

    // 计算发布时间距离当前时间的年、月、周、天、时、分
    var exceedYear = Math.floor(timeDiff/year);
    var exceedMonth = Math.floor(timeDiff/month);
    var exceedWeek = Math.floor(timeDiff/week);
    var exceedDay = Math.floor(timeDiff/day);
    var exceedHour = Math.floor(timeDiff/hour);
    var exceedMin = Math.floor(timeDiff/min);

    // 最后判断时间差到底是属于哪个区间，然后return
    if(exceedYear > 0){
        return exceedYear+'年';
    }

    if(exceedMonth > 0){
        return exceedMonth+'月';
    }

    if(exceedWeek > 0){
        return exceedWeek+'周';
    }

    if(exceedDay < 7 && exceedDay > 0){
        return exceedDay + '天';
    }

    if(exceedHour < 24 && exceedHour > 0){
        return exceedHour + '小时';
    }

    return exceedMin + '分钟';




}
