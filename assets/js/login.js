$(function () {
    $('#login').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show()
    })
    $('#reg').on('click', function () {
        $('.login_box').show();
        $('.reg_box').hide()
    })
    var layer = layui.layer
    var form = layui.form;
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '用户名不能有特殊字符';
                }
                if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if (/^\d+\d+\d$/.test(value)) {
                    return '用户名不能全为数字';
                }
            }

            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            ,
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        confirmPwd: function (value) {
            if (value != $('#reg_pwd').val()) {
                return '密码不一致'
            }
        }

    });

    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post({
            url: '/api/reguser',
            data: {
                username: $('#reg_username').val(),
                password: $('#reg_pwd').val(),
            },
            success: function (res) {
                if (res.status == 1) return layer.msg(res.message)
                layer.msg('注册成功，请登录')
                $('#reg').triggerHandler('click')
                $('#login_username').val($('#reg_username').val())
                $('#form_reg')[0].reset();
            }
        })
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.post({
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status == 1) return layer.msg(res.message)
                layer.msg('登陆成功');
                console.log(res.token);
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})