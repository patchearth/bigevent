$(function () {
    getUserinfo();
    $('#logout').on('click', function () {
        layer.confirm('确定退出登录', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        });
    })
})

function getUserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status == 1) {
                return layer.msg(res.message)
            }
            render(res.data)
        }
    })
}

function render(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic) {
        $('.layui-nav-img').prop('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name.slice(0, 1).toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide()
    }
}