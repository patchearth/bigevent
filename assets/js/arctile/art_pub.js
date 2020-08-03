$(function () {
    $.ajax({
        methos: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status == 1) return layui.layer.msg(res.message)
            var html = template('tpl', {
                data: res.data
            })
            $('select').html(html)
            layui.form.render()
        }
    })
    initEditor()

    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    $('#coverFile').on('change', function (e) {
        var file = e.target.files[0];
        if (!file) return
        var newImgURL = URL.createObjectURL(file)
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    var art_state = '已发布'
    $('#save').on('click', function () {
        art_state = '草稿'
    })
    $('#pub_form').on('submit', function (e) {
        e.preventDefault();
        var fb = new FormData(this)
        fb.set('state', art_state)
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                fb.set('cover_img', blob)
                $.ajax({
                    method: 'post',
                    url: '/my/article/add',
                    contentType: false,
                    processData: false,
                    data: fb,
                    success: function (res) {
                        if (res.status == 1) return layui.layer.msg(res.message)
                        layui.layer.msg(res.message)
                        window.location.href = '/article/art_list.html'
                    }
                })
            })
    })
})