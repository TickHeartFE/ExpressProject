var g_bPasswordAvailable = false;


function ShowError(strError) {
    $("error_display").style.display = "block";
    $("error_display").innerHTML = strError;
}

function checkregister() {

    var errorString = '';

    var rgBadFields = {
        email: false,
        reenter_email: false,
        accountname: false,
        password: false,
        reenter_password: false
    }

    var email = $('email').value;
    var email_regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,24}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    if (email == '' || !email_regex.test(email)) {
        errorString += '请输入有效的电子邮件地址。<br/>';
        rgBadFields.email = true;
        rgBadFields.reenter_email = true;
    }

    var reenter_email = $('reenter_email').value;
    if (reenter_email == '') {
        errorString += '请填写“确认电子邮件地址”字段。<br/>';
        rgBadFields.reenter_email = true;
    } else if (email != reenter_email) {
        errorString += '请在两个电子邮件地址字段中输入相同的地址。<br/>';
        rgBadFields.reenter_email = true;
    }


    var accountname = $('accountname').value;
    if (accountname.length < 8 || accountname.length > 20) {
        errorString += '请输入帐户名称（长度为 8-20个字符，且仅使用 a-z、A-Z、0-9 或 _ 字符）。<br/>';
        rgBadFields.accountname = true;
    } else {
        var bNameOK = true;
        for (var i = 0; i < accountname.length; ++i) {
            if (accountname.charAt(i) >= 'a' && accountname.charAt(i) <= 'z')
                continue;
            if (accountname.charAt(i) >= 'A' && accountname.charAt(i) <= 'Z')
                continue;
            if (accountname.charAt(i) >= '0' && accountname.charAt(i) <= '9')
                continue;
            if (accountname.charAt(i) == '_')
                continue;
            bNameOK = false;
        }
        if (!bNameOK) {
            errorString += '请输入帐户名称（长度为 8-20 个字符，且仅使用 a-z、A-Z、0-9 或 _ 字符）。<br/>';
            rgBadFields.accountname = true;
        }
    }



    var password = $('password').value;
    if (password.length > 20) {
        errorString += '请输入长度不超过 20 个字符的密码。<br/>';
        rgBadFields.password = true;
        rgBadFields.reenter_password = true;
    }

    if (password.length < 8) {
        errorString += '您输入的密码不符合要求。请选择一个不同的密码，不少于 8 个字符。<br/>';
        rgBadFields.password = true;
        rgBadFields.reenter_password = true;
    }

    var reenter_password = $('reenter_password').value;
    if (reenter_password == '') {
        errorString += '请填写“重新输入密码”字段。<br/>';
        rgBadFields.reenter_password = true;
    } else if (password != reenter_password) {
        errorString += '请在两个密码字段中输入相同的密码。<br/>';
        rgBadFields.reenter_password = true;
    }

    for (var key in rgBadFields) {
        if (rgBadFields[key]) {
            $(key).style.borderColor = '#FF0000';
        } else
            $(key).style.borderColor = '#00CC00';
    }

    if (errorString != '') {
        ShowError(errorString);
        return false;
    } else {
        return true;
    }

}