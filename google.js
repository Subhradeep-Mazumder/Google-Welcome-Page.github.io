var searcheditems = [];
function search() {
    var input = document.getElementById('text');
    var searched = input.value;
    if (searched !== null && searched !== "") {
        (searcheditems.length <= 10) ? searcheditems.push(searched) : add();
        var url = "https://www.google.com/search?hl=en&sxsrf=ALeKk02JERweK5uzl8aLql4wYsv2sBVhpw%3A1585637270109&ei=lueCXvW0BvCD4-EPl6CCoAE&q=" + searched + "&oq=" + searched + "&gs_lcp=CgZwc3ktYWIQDDIECCMQJzIECCMQJzIECCMQJzIECAAQQzIECAAQQzIECAAQQzIECAAQQzIECAAQQzIECAAQQzIECAAQQzoECAAQR1CTwQFY9tQBYPPsAWgAcAJ4AIABtweIAe0RkgEHNC0xLjAuMpgBAKABAaoBB2d3cy13aXo&sclient=psy-ab&ved=0ahUKEwj11-iRj8ToAhXwwTgGHReQABQQ4dUDCAs";
        window.location.href = url;
        localStorage.setItem("history", JSON.stringify(searcheditems));
        input.value = "";
    }
}
function add() {
    delete searcheditems[0];
    searcheditems.push(searched);
}
function historydisplay() {
    if (searcheditems.length !== 0) {
        document.getElementById('history').style.display = "block"
        document.getElementById('inputtext').style.borderBottomLeftRadius = 0;
        document.getElementById('inputtext').style.borderBottomRightRadius = 0;
    }
    else {
        document.getElementById('history').style.display = "none";
        document.getElementById('inputtext').style.borderRadius = "24px";
    }
}
function historyout(ea) {
           var e = ea.target;
        var element = document.getElementById("search")
        if (e.value == "") {
            document.getElementById('history').style.display = "none";
            document.getElementById('inputtext').style.borderRadius = "24px";
       }
        else return;
    
}
function entercheck(event) {
    if (event.keyCode === 13) { return search(); }
    if(document.getElementById("text").value=="")
    {
        if (searcheditems.length !== 0) {
            document.getElementById('history').style.display = "block"
            document.getElementById('inputtext').style.borderBottomLeftRadius = 0;
            document.getElementById('inputtext').style.borderBottomRightRadius = 0;
        }
    }
}

/*}
*/
function remove(a) {
    searcheditems.splice(a, 1);
    localStorage.removeItem("history");
    localStorage.clear("remove");
    localStorage.setItem("history", JSON.stringify(searcheditems));
    localStorage.setItem("remove", 1);

    var list = document.getElementById("list");
    var items = Array.from(list.children);  
    var newItems = items.filter((item, index) => {
        return index !== a;
    })

    list.innerHTML = "";
    for(var i=0; i<newItems.length; i++) {
        list.appendChild(newItems[i])
    }
    document.getElementById('history').style.display = "block"
    document.getElementById('inputtext').style.borderBottomLeftRadius = 0;
    document.getElementById('inputtext').style.borderBottomRightRadius = 0;
   
}

function onDocClick(e) {
    let target = e.target;

    if(target.className == "removebutton") {
        return;
    }

    // let input = document.getElementById("text");
    let history = document.getElementById("history");

    if (target.id !== "text" && history.contains(target)!==true) {
        // if (!history.contains(target)) {
            history.style.display = "none";
            document.getElementById('inputtext').style.borderRadius = "24px";
        // }
       
    } else {
        document.getElementById('history').style.display = "block"
        document.getElementById('inputtext').style.borderBottomLeftRadius = 0;
        document.getElementById('inputtext').style.borderBottomRightRadius = 0;
    }

    
}

function main() {
    // document.getElementById("history").addEventListener("click", onHistoryClick);
    document.addEventListener("click", onDocClick);
    var a = [];
    var his = localStorage.getItem("history");
    a = (his) ? JSON.parse(his) : [];
    for (var I = 0; I <= a.length; I++) {
        if (a[I] !== null && a[I] !== "" && a[I] !== undefined) {
            searcheditems.push(a[I]);
        }
    }
    for (var I = 0; I <= searcheditems.length; I++) {
        if (searcheditems[I] !== null && searcheditems[I] !== "" && searcheditems[I] !== undefined) {
            document.getElementById("historylist").children[1].innerHTML += '<li class="searched" role="presentation">'
                + '<div class="containerlist">'
                + '<div class="icontimer"></div>'
                + '<div class="historytext" role="option">'
                + '<div class="historyinside">'
                + '<span>' + searcheditems[I] + '</span>'
                + '</div>'
                + '</div>'
                + '<div class="remove">'
                + '<div class="removebutton" onclick="remove(' + I + ')">remove</div>'
                + '</div>'
                + '</div>'
                + '</li>';
        }
    }
    var check = localStorage.getItem("remove");
    if (check == 1) {
        localStorage.setItem("remove", 0);
        document.getElementById('history').style.display = "block"
        document.getElementById('inputtext').style.borderBottomLeftRadius = 0;
        document.getElementById('inputtext').style.borderBottomRightRadius = 0;
    }
}
