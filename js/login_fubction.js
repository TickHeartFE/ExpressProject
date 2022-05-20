var g_bPasswordAvailable = false;
var testflag = 0;

function ShowError(strError) {
    $("error_display").style.display = "block";
    $("error_display").innerHTML = strError;
}

function test(){
    //一、定义了一个获取元素的方法
    function getEle(selector){
        return document.querySelector(selector);
    }
    //二、获取到需要用到的DOM元素
    var box = getEle("#box"),//容器
        bgColor = getEle(".bgColor"),//背景色
        txt = getEle(".txt"),//文本
        slider = getEle(".slider"),//滑块
        icon = getEle(".slider>i"),
        successMoveDistance = box.offsetWidth- slider.offsetWidth,//解锁需要滑动的距离
        downX,//用于存放鼠标按下时的位置
        isSuccess = false;//是否解锁成功的标志，默认不成功

    //三、给滑块添加鼠标按下事件
    slider.onmousedown = mousedownHandler;

    //3.1鼠标按下事件的方法实现
    function mousedownHandler(e){
        bgColor.style.transition = "";
        slider.style.transition = "";
        var e = e || window.event || e.which;
        downX = e.clientX;
        //在鼠标按下时，分别给鼠标添加移动和松开事件
        document.onmousemove = mousemoveHandler;
        document.onmouseup = mouseupHandler;
    };

    //四、定义一个获取鼠标当前需要移动多少距离的方法
    function getOffsetX(offset,min,max){
        if(offset < min){
            offset = min;
        }else if(offset > max){
            offset = max;
        }
        return offset;
    }

    //3.1.1鼠标移动事件的方法实现
    function mousemoveHandler(e){
        var e = e || window.event || e.which;
        var moveX = e.clientX;
        var offsetX = getOffsetX(moveX - downX,0,successMoveDistance);
        bgColor.style.width = offsetX + "px";
        slider.style.left = offsetX + "px";

        if(offsetX == successMoveDistance){
            success();
        }
        //如果不设置滑块滑动时会出现问题（目前还不知道为什么）
        e.preventDefault();
    };

    //3.1.2鼠标松开事件的方法实现
    function mouseupHandler(e){
        if(!isSuccess){
            bgColor.style.width = 0 + "px";
            slider.style.left = 0 + "px";
            bgColor.style.transition = "width 0.8s linear";
            slider.style.transition = "left 0.8s linear";
        }
        document.onmousemove = null;
        document.onmouseup = null;
    };

    //五、定义一个滑块解锁成功的方法
    function success(){
        isSuccess = true;
        txt.innerHTML = "验证成功";
        testflag = 1;
        bgColor.style.backgroundColor ="lightgreen";
        slider.className = "slider active";
        icon.className = "iconfont icon-xuanzhong";
        //滑动成功时，移除鼠标按下事件和鼠标移动事件
        slider.onmousedown = null;
        document.onmousemove = null;
    };
}

function checklogin() {

    var errorString = '';
    var rgBadFields = {
        userName: false,
        passWord: false
    }

    

    var userName = $('userName').value;
    if(userName.length == 0){
        errorString += '帐户名称不能为空，请检查重新输入！<br/>';
        rgBadFields.userName = true;
    }

    else if (userName.length < 8 || userName.length > 20) {
        errorString += '帐户名称长度为 8-20个字符，请检查重新输入！<br/>';
        rgBadFields.userName = true;
    } 
    else {
        var bNameOK = true;
        for (var i = 0; i < userName.length; ++i) {
            if (userName.charAt(i) >= 'a' && userName.charAt(i) <= 'z')
                continue;
            if (userName.charAt(i) >= 'A' && userName.charAt(i) <= 'Z')
                continue;
            if (userName.charAt(i) >= '0' && userName.charAt(i) <= '9')
                continue;
            if (userName.charAt(i) == '_')
                continue;
            bNameOK = false;
        }
        if (!bNameOK) {
            errorString += '帐户名称中只能包含a-z、A-Z、0-9 或 _ 字符，请检查重新输入！<br/>';
            rgBadFields.userName = true;
        }
    }



    var passWord = $('passWord').value;
    if (passWord.length > 20) {
        errorString += '密码长度不能超过 20 个字符，请检查重新输入！<br/>';
        rgBadFields.passWord = true;
        
    }
    if (passWord.length ==0) {
        errorString += '密码长度不能为空，请检查重新输入！<br/>';
        rgBadFields.passWord = true;
        
    }

    if (passWord.length < 8 && passWord.length!=0 ) {
        errorString += '密码长度不能少于 8 个字符，请检查重新输入！<br/>';
        rgBadFields.passWord = true;
        
    }
    
    if(testflag == 0){
        errorString += '请点击滑块拖动进行验证！<br/>';
    }

    if (errorString != '') 
    {
        ShowError(errorString);
        return false;
    } 
    else 
    {
        return true;
    }
}
