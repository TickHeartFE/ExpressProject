var time = new Array("23.5 2014", "22.2 2014", "21.2 2017", "30.12 2021");
var commentsText = new Array("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto temporibus iste nostrum dolorem natus recusandae incidunt voluptatum. Eligendi voluptatum ducimus architecto tempore, quaerat explicabo veniam fuga corporis totam reprehenderit quasi sapiente modi tempora at perspiciatis mollitia, dolores voluptate. Cumque, corrupti?",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto temporibus iste nostrum dolorem natus recusandae incidunt voluptatum. Eligendi voluptatum ducimus architecto tempore, quaerat explicabo veniam fuga corporis totam.",
    "This is a new Comment",
    "Web寄中寄！");



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

    div4 = document.createElement("div");
    div4.className = "comment-date";
    div4.innerHTML = time[i];
    div3.appendChild(div4);

    ul = document.createElement("ul");
    ul.className = "comment-actions";
    div3.appendChild(ul);

    li1 = document.createElement("li");
    li1.className = ("complain");
    li1.innerHTML = "Complain";
    ul.appendChild(li1);

    li2 = document.createElement("li");
    li2.className = "reply";
    li2.innerHTML = "Reply";
    ul.appendChild(li2);
}

function submitComment() {
    text = $("comment-texting").value;
    commentsText.push(text);
    var date = new Date();
    time.push(date.getDate() + "." + date.getMonth() + " " + date.getFullYear());
    addCommentsNode("comments", commentsText.length - 1);
}