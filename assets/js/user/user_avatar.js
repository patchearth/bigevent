$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#btnImg').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        var url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        $image
            .cropper('destroy')
            .attr('src', url)
            .cropper(options)
    })
    $('#btnupload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status == 1) return layui.layer.msg('上传头像失败')
                layui.layer.msg('上传头像成功')
                window.parent.getUserinfo();
            }
        })
    })
})