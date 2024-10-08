function set_type_function(event) {
    let q1 = document.getElementsByClassName('params__list-item');
    let q2 = document.getElementsByClassName('container__functions-item');
    let s = '';
    if ((event.target.classList[0] == 'function__block') || (event.target.classList[0] == 'text__function-block')) {
        s = event.target.parentElement;
    }
    else {
        s=event.target;
    }
    for (let i = 0; i < q1.length; i++) {
        if (q1[i] != s) {
            q1[i].classList.remove('params__item-active');
            q2[i].classList.remove('functions-item-active');
        }
        else {
            q1[i].classList.add('params__item-active');
            q2[i].classList.add('functions-item-active');
        }
    }
}
function get_value() {
    $.ajax({
        url: 'http://127.0.0.1:5000/getname',         /* Куда пойдет запрос */
        method: 'get',             /* Метод передачи (post или get) */
        dataType: 'json',          /* Тип данных в ответе (xml, json, script, html). */
        success: function (data) {   /* функция которая будет выполнена после успешного запроса.  */
            alert(data.myname);            /* В переменной data содержится ответ от index.php. */
        }
    });
}
function truth(object) {
    if (object.length > 0) {
        return 1;
    }
    else {
        return 0;
    }
}
function class_check(s) {
    if (document.getElementsByClassName(s).length > 0) {
        return 1;
    }
    else {
        return 0;
    }
}


function set_value_tables(row, value) {
    let value_item = document.createElement('td');
    value_item.innerText = value;
    row.appendChild(value_item);
}
/*function del_but(value,classs,type_bt) {
    let bt = document.createElement('button');
    bt.innerText = value;
    bt.setAttribute('class', classs);
    if (type_bt==1) {
        bt.addEventListener('click', del_user);
    }
    else {
        bt.addEventListener('click', del_but_group);
    }
    return bt;
}*/
var REST_URL = 'http://127.0.0.1:5000';

function set_start() {
    $.ajax({
        type: 'POST',
        url: document.location.origin + "/startstoppars/",
        data: {
            startstop: '1',
            form_admin_type: 'startpars',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        success: function (json) {
            alert(JSON.stringify(json));
        },
        error: function (xhr, errmsg, err) {
            alert(xhr.responseText);
        }
    });
}
function user_del(event) {
    
    let del_data = event.target.parentElement.parentElement.parentElement;
    let login = del_data.childNodes[7].childNodes[0].textContent;
    let pass = del_data.childNodes[9].childNodes[0].textContent;
    $.ajax({
        type: 'POST',
        url: document.location.origin + "/deluser/",
        data: {
            deluser_login: del_data.childNodes[7].childNodes[0].textContent,
            deluser_password: del_data.childNodes[9].childNodes[0].textContent,
            form_admin_type: 'del_user',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        success: function (json) {
            let answer = json.message;
            if (answer == 'exit') {
                document.location.href = document.location.origin;
            }
            else {
                del_data.remove();
            }
        },
        error: function (xhr, errmsg, err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert(xhr.responseText);
        }
    });
}

function del_but_group(event) {

}

function clear_elements(data, elem) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].tagName != elem) {
            data[i].remove();
        }
    }
    return data;
}

function get_user_count() {
    $.ajax({
        type: 'POST',
        url: document.location.origin + "/getuserscount/",
        data: {
            form_admin_type: 'getuserscount',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        success: function (json) {
            let data_json = JSON.parse(JSON.stringify(json))['count_user'];
            console.log(data_json);

            let table_group = document.getElementById('groups').childNodes;
            table_group=clear_elements(table_group,'tr');
            
            for (let i = 0; i < data_json.length; i++) {
                let dar = table_group[i].childNodes;
                dar = clear_elements(dar, 'td');
                dar[2].textContent = data_json[i];
            }
        },
        error: function (xhr, errmsg, err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert(xhr.responseText);
        }
    });
}

function logoutuser() {
    $.ajax({
        type: 'POST',
        url: document.location.origin + "/logoutuser/",
        data: {
            form_admin_type: 'logoutusers',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        success: function (json) {
            let mess = json.message;
            alert(mess);
            document.location.href = document.location.origin;
        },
    });
}
function add_user_form(event) {
    let modal = document.getElementById('usadd');
    modal.style.display = "block";
  
}

function hide_modal(event) {
    if (event.target == document.getElementById('usadd')) {
        document.getElementById('usadd').style.display = "none";
    }
}
function removs() {
    let text_el = document.getElementsByTagName('body')[0].childNodes;
    for (let i = 0; i < text_el.length; i++) {
        if (text_el[i].nodeName == '#text') {
            console.log(text_el[i].remove());
        }
    }
}
function save_change_users(event) {

    console.log(event.target.parentElement.parentElement.parentElement);
    document.getElementsByClassName('edit_tb')[0].value
    
  
}
function clear_users() {
    let td_table = document.getElementsByTagName('td');
    for (let i = 0; i < td_table.length; i++) {
        if (td_table[i].getAttribute('editable') == 'users') {
            if (td_table[i] != event.target) {
                td_table[i].childNodes[0].removeAttribute('style');
                td_table[i].childNodes[1].removeAttribute('style');
                td_table[i].parentElement.childNodes[17].childNodes[3].removeAttribute('style');
            }
        }
    }
}
function save_change_groups() {

}
function edit_table(event) {
    let tb_change = '';
    if (event.target.tagName == 'SPAN') {
        tb_change = event.target.parentElement;
    }
    else {
        tb_change = event.target;
    }
   if (event.target.tagName!='INPUT') {
       clear_users();
    }
    if (tb_change.getAttribute('editable') == 'users') {
        tb_change.childNodes[0].style.display = 'none';
        tb_change.childNodes[1].style.display = 'block';
        tb_change.childNodes[1].focus();
        tb_change.parentElement.childNodes[17].childNodes[3].style.display = 'inherit';
    }
}
function edit_no(event) {
    if ((event.target.tagName != 'TD')&& (event.target.classList[0] !='value_edit')) {
        clear_users();
    }
    //console.log(event.target.tagName);
}
function change_user_type_form(event) {
    console.log("Changed to: " + event.target.value);
}

document.addEventListener("DOMContentLoaded", () => {
    removs();
    let edits = document.getElementsByTagName('td');
    for (let i = 0; i < edits.length; i++) {
        if (edits[i].hasAttribute('editable') == true) {
            edits[i].addEventListener('click', edit_table);
        }
    }
    if (class_check('delbtnuser') != 0) {
        let delus = document.getElementsByClassName('delbtnuser');
        for (let i = 0; i < delus.length; i++) {
            delus[i].addEventListener('click', user_del);
        }
    }
    if (class_check('changeuser') != 0) {
        let chsave_user = document.getElementsByClassName('changeuser');
        for (let i = 0; i < chsave_user.length; i++) {
            chsave_user[i].addEventListener('click', save_change_users);
        }
    }
    document.addEventListener('click', edit_no);
    
    if (document.getElementById('adduser_type') != null) {
        let check_type_user = document.getElementById('adduser_type');
        check_type_user.addEventListener('change',change_user_type_form);
    }

    if (class_check('addbtnuser') != 0) {
        let addus = document.getElementsByClassName('addbtnuser');
        for (let i = 0; i < addus.length; i++) {
            addus[i].addEventListener('click', add_user_form);
        }
    }

    if (class_check('modal1') != 0) {
        document.addEventListener('click', hide_modal);
    }
    
    let s = document.getElementsByClassName('params__list-item');
    for (let i = 0; i < s.length; i++) {
        s[i].addEventListener('click', set_type_function);
    }
    if (class_check('send_but') != 0) {
        let sb = document.getElementsByClassName('send_but')[0];
        sb.addEventListener('click', get_value);
    }
    if (class_check('login') != 0) {
        
        $(document).on('submit', '#login_form', function (e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: document.location.origin + "/loginuser/",
                data: {
                    log_name: $('#log_name').val(),
                    log_pass: $('#log_pass').val(),
                    form_admin_type: 'loginusers',
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                    action: 'post',
                },
                success: function (json) {
                    let type = json.message;
                    if (type == 1) {
                        document.location.href=document.location.origin+json.url;
                    }
                    else {
                        alert(json.logerror);
                    }
                }
            });
        });
    }
    if (class_check('logoutbtn') != 0) {
        let butlgout = document.getElementsByClassName('logoutbtn')[0];
        butlgout.addEventListener('click',logoutuser);
    }


    if (class_check('group_form') != 0) {
        get_user_count();
        $(document).on('submit', '#add_group', function (e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: document.location.origin + "/addgroup/",
                data: {
                    group_name: $('#group_name').val(),
                    group_status: $('#group_status').val(),
                    form_admin_type:'add_group',
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                    action: 'post',
                },
                success: function (json) {
                    alert(JSON.stringify(json));
                    document.location.reload();
                },
                error: function (xhr, errmsg, err) {
                    console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                    alert(xhr.responseText);
                }
            });
        });
    }
    if (class_check('adduser_form') != 0) {
       
        
        $(document).on('submit', '#add_user', function (e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: document.location.origin + "/adduser/",
                data: {
                    form_admin_type: 'add_user',
                    adduser_surname: $('#adduser_surname').val(),
                    adduser_name: $('#adduser_name').val(),
                    adduser_lastname: $('#adduser_lastname').val(),
                    adduser_login: $('#adduser_login').val(),
                    adduser_password: $('#adduser_password').val(),
                    adduser_type: document.getElementById("adduser_type").options[document.getElementById("adduser_type").selectedIndex].text,
                    adduser_groupses: document.getElementById("adduser_groupses").options[document.getElementById("adduser_groupses").selectedIndex].text,
                    adduser_status: document.getElementById("adduser_status").options[document.getElementById("adduser_status").selectedIndex].text,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                    action: 'post',
                },
                success: function (json) {
                    
                    if (json.message == 1) {
                        alert(json.message_error);
                    }
                    else {
                        
                        alert(json.message);
                        //document.location.reload();
                    }
                },
                error: function (xhr, errmsg, err) {
                    console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                    alert(xhr.responseText);
                }
            });
        });
    }
    set_start();
});