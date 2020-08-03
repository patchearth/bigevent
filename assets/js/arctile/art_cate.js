$(function () {
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status == 1) return layui.layer.msg('res.message')
                var html = template('tpl', {
                    data: res.data
                })
                $('tbody').html(html)
            }
        })
    }
    initArtCateList()
    var indexAdd = null
    $('#addCate').on('click', function () {
        indexAdd = layui.layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#add').html(),
            area: ['500px', '250px']
        });
    })
    $('body').on('submit', '#add_form', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.stauts == 1) return layui.layer.msg('res.message')
                layui.layer.msg(res.message);
                initArtCateList();
                layui.layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
    $('tbody').on('click', '.edit', function () {
        indexEdit = layui.layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#edit').html(),
            area: ['500px', '250px']
        });
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status == 1) return layui.layer.msg(res.message)
                layui.form.val('edit_form', res.data);
            }
        })
        $('body').on('submit', '#edit_form', function (e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status == 1) return layui.layer.msg('res.message')
                    layui.layer.close(indexEdit);
                    initArtCateList()
                }
            })
        })
    })
    $('tbody').on('click', '.btn_delete', function (e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        layer.confirm('确认删除', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status == 1) return layui.layer.msg(res.message)
                    layui.layer.msg(res.message);
                    layer.close(index);
                    initArtCateList()
                }
            })
        });

    })
})