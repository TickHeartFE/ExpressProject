// 维护对应的变量
var category = new Array("电影", "电视剧", "动漫");
var videoPic = [[], [], []];
var videoName = [[], [], []];

var videoLoc = [[], [], []];

var time = new Array();

var commentsText = new Array();

// 维护一个登录状态的变量
var isLogin = false;

function $(id) {
  return document.getElementById(id);
}

function ShowError(strError) {
  $("error_display").style.display = "block";
  $("error_display").innerHTML = strError;
}

function generate_video_box(id) {
  for (var i = 0; i < category.length; i++) {
    div1 = document.createElement("div");
    div1.className = "row";

    div2 = document.createElement("div");
    div2.className = "col-12";

    text = document.createElement("h2");
    text.id = "category_text" + i;
    text.className = "tm-page-title mb-4";
    text.innerHTML = category[i];
    div2.appendChild(text);
    div1.appendChild(div2);
    $(id).appendChild(div1);

    generate_category_icon(id, i);
  }
}

function test() {
  addViedeoItem(0, "img/tn-07.jpg", "ABC", "/assets/video/02.mp4");
}

//动态增加视频
function addViedeoItem(cat, picLocation, vName, videoLocation) {
  videoPic[cat].push(picLocation);
  videoName[cat].push(vName);
  videoLoc[cat].push(videoLocation);
  generate_video_icon(cat, videoName.length);
}

function generate_category_icon(id, Index) {
  div1 = document.createElement("div");
  div1.className = "row main-category-list";
  div1.id = "category" + Index;
  $(id).appendChild(div1);
  for (var i = 0; i < videoPic[Index].length; i++) {
    generate_video_icon(Index, i);
  }
}

function generate_video_icon(Index, i) {
  div2 = document.createElement("div");
  div2.className = "col-lg-4  main-category-item";
  $("category" + Index).appendChild(div2);

  div3_1 = document.createElement("div");
  div3_1.className = "position-relative main-category-container";
  div2.appendChild(div3_1);

  img = document.createElement("img");
  img.className = "img-fluid";
  img.src = videoPic[Index][i];
  div3_1.appendChild(img);

  hyper = document.createElement("a");
  hyper.className = "position-absolute img-overflow";
  hyper.href = "javascript:sendRequest(" + Index + "," + i + ");";
  div3_1.appendChild(hyper);

  inclined = document.createElement("i");
  inclined.className = "fas fa-play overflow-icon";
  hyper.appendChild(inclined);

  div3_2 = document.createElement("div");
  div3_2.className = "p-4 tm-bg-gray main-category-item-description";
  div2.appendChild(div3_2);

  h3 = document.createElement("h3");
  h3.className = "tm-text-primary mb-3 main-category-item-title";
  h3.innerHTML = videoName[Index][i];
  div3_2.appendChild(h3);
}

// 传递对应的query参数
function sendRequest(idex, jdex) {
  var index = 0;
  for (var i = 0; i < idex; i++) {
    index += videoPic[i].length;
  }
  index += jdex;
  // 跳转对应的页面
  window.location.href = "video-page.html?index=" + index;
}

var idex, jdex;

// 获取对应的url 参数 传入对应需要的值即可
function getQueryVariable(variable) {
  // 首先对应定义好query参数的部分
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

// 封装好的ajax请求
function sendAjax(url, searchIndex) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://172.30.232.122:3000/api/" + url + "?" + searchIndex);
  xhr.send();
  var params;
  xhr.onload = function () {
    // 然后对页面动态渲染
    params = JSON.parse(xhr.responseText);
    // 拿到对应的地址
    // 更新对应的地址状态
    findVideo(params[0]["VideoSrc"]);
  };
}

// 对应添加评论的ajax请求
function sendAjax2(url, searchIndex) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://172.30.232.122:3000/api/" + url + "?" + searchIndex);
  xhr.send();
  var params;
  xhr.onload = function () {
    // 请求后的回调函数
    params = JSON.parse(xhr.responseText);
    console.log(params);
  };
}

// 对应评论的ajax请求
function sendAjax3(url, searchIndex) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://172.30.232.122:3000/api/" + url + "?" + searchIndex);
  xhr.send();
  var params;
  xhr.onload = function () {
    // 获得对应的返回值并进行对象化
    params = JSON.parse(xhr.responseText);
    // 先获得对应的所有的长度
    var len = params.length;
    // 获得所有的评论然后遍历填充
    for (var i = 0; i < len; ++i) {
      // 更新对应的评论区
      commentsText.push(params[i]["VedioComment"]);
    }
    // 填充后生成对应的评论
    generateComments("comments");
  };
}

// 刷新主页面的ajax请求
function sendAjax4(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://172.30.232.122:3000/api/" + url);
  xhr.send();
  var params;
  xhr.onload = function () {
    params = JSON.parse(xhr.responseText);
    // 将对应的params数值覆盖对应的数组
    var len = params.length;
    console.log(len);
    for (var i = 0; i < len; i++) {
      // // 遍历得到的数据对相关的数据进行维护 根据对应的类别进行维护即可
      videoPic[params[i]["VideoSet"]].push(params[i]["VideoImage"]);
      videoName[params[i]["VideoSet"]].push(params[i]["VideoName"]);
      videoLoc[params[i]["VideoSet"]].push(params[i]["VideoSrc"]);
    }
    // 对应渲染对应的视频
    generate_video_box("generate");
  };
}

// 获取密码的Ajax请求 将对应的userName 和 passWord进行传输 并对密码和账号进行验证
function sendAjax5(url, userName, passWord) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "get",
    "http://172.30.232.122:3000/api/" +
      url +
      "?userName=" +
      userName +
      "&passWord=" +
      passWord
  );
  // 对应的发送请求
  // 发送请求
  xhr.send();
  var params;
  xhr.onload = function () {
    // 接受返回的数据
    params = JSON.parse(xhr.responseText);
    console.log(params);
    // 返回的是true or flase
    if (params["isAbleLogin"] == true) {
      alert("登录成功");
      window.location.href = "./index.html?userName=" + userName;
    } else {
      alert("您的账号或者密码存在问题");
    }
  };
}

// 发送检查登录状态的ajax请求 发送请求接受对应的状态 返回此时的登录状态 检查登录状态
function sendAjax6(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://172.30.232.122:3000/api/" + url);
  // 发送请求 接受参数
  xhr.send();
  var params;
  xhr.onload = function () {
    // 接受返回的数据
    params = JSON.parse(xhr.responseText);
    console.log(params);
    // 如果是空 或者 是 false的话则进行提示回login页
    if (JSON.stringify(params) == "{}" || params["loginCheck"] == false) {
      alert("您还未登录,请进行登录操作");
      window.location.href = "./login.html";
    }
  };
}

// 发送注册的ajax请求
function sendAjax7(url, userName, passWord) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "get",
    "http://172.30.232.122:3000/api/" +
      url +
      "?userName=" +
      userName +
      "&passWord=" +
      passWord
  );
  // 发送请求 接受参数
  xhr.send();
  var params;
  xhr.onload = function () {
    // 接受返回的数据
    params = JSON.parse(xhr.responseText);
    if (params["Register"] == true) {
      // 注册成功
      alert("注册成功");
      window.location.href = "./login.html";
    } else {
      alert("注册失败 该用户已经存在");
    }
  };
}

// 发送登出的ajax请求
function sendAjax8(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://172.30.232.122:3000/api/" + url);
  xhr.send();
  xhr.onload = function () {
    // 接受返回的数据
    params = JSON.parse(xhr.responseText);
    console.log(params);
  };
}

function findVideo(srcP) {
  console.log("对应的地址如下:");
  console.log(srcP);
  // 改变对应video标签的src值
  $("mp4Icon").src = srcP;
}

function navClick(id) {
  for (var i = 0; i < category.length; i++) {
    $("nav" + i).className = "nav-item";
  }

  $("nav" + id).className = "nav-item active";

  $("category_text" + id).scrollIntoView();
}

function generateNav(id) {
  for (var i = 0; i < category.length; i++) {
    li = document.createElement("li");
    li.className = "nav-item";
    li.id = "nav" + i;

    hyper = document.createElement("a");
    hyper.className = "nav-link tm-nav-link";
    hyper.href = "javascript:navClick(" + i + ");";
    hyper.innerHTML = category[i];

    li.appendChild(hyper);
    $(id).appendChild(li);
  }
}

function generateComments(id) {
  for (var i = 0; i < commentsText.length; i++) {
    addCommentsNode(id, i);
  }
}

function addCommentsNode(id, i) {
  div1 = document.createElement("div");
  div1.className = "comment-wrap";
  $(id).appendChild(div1);

  div2 = document.createElement("div");
  div2.className = "comment-block";
  div1.appendChild(div2);

  pragraph = document.createElement("p");
  pragraph.className = "comment-text";
  pragraph.innerHTML = commentsText[i];
  div2.appendChild(pragraph);

  div3 = document.createElement("div");
  div3.className = "bottom-comment";
  div2.appendChild(div3);

  // 对应的评论时间渲染
  // div4 = document.createElement("div");
  // div4.className = "comment-date";
  // div4.innerHTML = time[i];
  // div3.appendChild(div4);

  ul = document.createElement("ul");
  ul.className = "comment-actions";
  div3.appendChild(ul);

  li1 = document.createElement("li");
  li1.className = "complain";
  li1.innerHTML = "Complain";
  ul.appendChild(li1);

  li2 = document.createElement("li");
  li2.className = "reply";
  li2.innerHTML = "Reply";
  ul.appendChild(li2);
}

// 提交评论的函数 往数据库中进行数据的插入
function submitComment() {
  text = $("comment-texting").value;
  commentsText.push(text);
  var date = new Date();
  time.push(date.getDate() + "." + date.getMonth() + " " + date.getFullYear());
  addCommentsNode("comments", commentsText.length - 1);

  // 请求接口模板

  // 首先拿到对应的query参数 注意还要传入需要添加的评论
  var searchIndex = getQueryVariable("index");

  // 拼接上对应的评论 将两个参数进行发送
  searchIndex += "&" + text;
  console.log(searchIndex);

  // 用对应的query参数进行ajax请求 封装好的ajax请求
  sendAjax2("addComment", searchIndex);

  // ajax结束后进行成功的提醒
  alert("插入成功!");
}
