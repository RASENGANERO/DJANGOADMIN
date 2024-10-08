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
function del_but(value,classs,type_bt) {
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
}
function del_user(event) {
    //console.log(event.target.id);
    //console.log(event.target.parentElement);
    let del_data = event.target.parentElement;
    //console.log(del_data.childNodes[0].textContent.trim());
    $.ajax({
        type: 'POST',
        url: document.location.origin + "/deluser/",
        data: {
            deluser_name: del_data.childNodes[0].textContent.trim(),
            deluser_pass: del_data.childNodes[1].textContent.trim(),
            deluser_type: del_data.childNodes[2].textContent.trim(),
            form_admin_type: 'del_user',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        success: function (json) {
            let answer = JSON.parse(JSON.stringify(json))['del'];
            alert(answer);
            document.location.reload();
        },
        error: function (xhr, errmsg, err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert(xhr.responseText);
        }
    });
}

function del_but_group(event) {

}

function set_users_in_html() {
    $.ajax({
        type: 'POST',
        url: document.location.origin + "/getallusers/",
        data: {
            form_admin_type: 'get_all_users',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        success: function (json) {
            let data_json = JSON.parse(JSON.stringify(json))['allusers'];
            let name_valdel = JSON.parse(JSON.stringify(json))['del'];
            let name_valchange = JSON.parse(JSON.stringify(json))['change'];

            let users_table = document.getElementById('users');
            for (let i = 0; i < data_json.length; i++) {
                let item = document.createElement('tr');
                set_value_tables(item,data_json[i]['username']);
                set_value_tables(item,data_json[i]['password']);
                set_value_tables(item, data_json[i]['user_type']);
                item.appendChild(del_but(name_valdel, 'btn_del_user',1));
                users_table.appendChild(item);
            }
        },
        error: function (xhr, errmsg, err) {
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            alert(xhr.responseText);
        }
    });
}
function set_groups_in_html() {
    $.ajax({
        type: 'POST',
        url: document.location.origin + "/getallgroups/",
        data: {
            form_admin_type: 'get_all_groups',
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            action: 'post',
        },
        success: function (json) {
            let data_json = JSON.parse(JSON.stringify(json))['allgroups'];
            let name_valdel = JSON.parse(JSON.stringify(json))['del'];
            let name_valchange = JSON.parse(JSON.stringify(json))['change'];

            let users_table = document.getElementById('groups');
            for (let i = 0; i < data_json.length; i++) {
                let item = document.createElement('tr');
                set_value_tables(item, data_json[i]['groupname']);
                set_value_tables(item, data_json[i]['statusgroup']);
                item.appendChild(del_but(name_valdel,'btn_del_group',2));
                users_table.appendChild(item);
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
document.addEventListener("DOMContentLoaded", () => {
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
        set_groups_in_html();
        $(document).on('submit', '#add_group', function (e) {
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
        set_users_in_html();
        
        $(document).on('submit', '#add_user', function (e) {
            $.ajax({
                type: 'POST',
                url: document.location.origin + "/adduser/",
                data: {
                    form_admin_type: 'add_user',
                    adduser_name: $('#adduser_name').val(),
                    adduser_pass: $('#adduser_pass').val(),
                    adduser_type: document.getElementById("adduser_type").options[document.getElementById("adduser_type").selectedIndex].text,
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
});