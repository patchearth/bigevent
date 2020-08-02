$(function () {
    console.log(window.parent);
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称1~6位'
            }
        }
    })

    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status == 1) return layer.msg('获取用户信息失败')
                layui.form.val('userInfo', res.data);
            }
        })
    }
    getUserInfo()

    $('#resetInfo').on('click', function (e) {
        e.preventDefault();
        getUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status == 1) return layer.msg('更新用户信息失败')
                window.parent.getUserinfo();
            }
        })
    })
})