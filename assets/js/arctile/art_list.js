$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    function padZeor(n) {
        var n = n + ''
        return n.padStart(2, 0)
    }
    template.defaults.imports.dataFormat = function (data) {
        var dt = new Date(data)
        var year = dt.getFullYear();
        var month = padZeor(dt.getMonth() + 1);
        var day = padZeor(dt.getDate());
        var hour = padZeor(dt.getHours());
        var min = padZeor(dt.getMinutes());
        var second = padZeor(dt.getSeconds())
        return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second
    }

    function initList() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status == 1) return layui.layer.msg(res.message)
                var html = template('tpl', {
                    data: res.data
                })
                $('tbody').html(html);
                rederPage(res.total)
            }
        })
    }

    function getCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status == 1) return layui.layer.msg(res.message)
                var html = template('tpl_cate', {
                    data: res.data
                })
                $('[name=cate_id]').html(html);
                layui.form.render()
            }
        })
    }
    initList()
    getCate()
    $('#search').on('submit', function (e) {
        e.preventDefault();
        console.log($('[name=cate_id]').val());
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initList()
    })

    function rederPage(total) {
        layui.laypage.render({
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            limits: [2, 3, 4, 5],
            curr: q.pagenum,
            jump: function (obj, first) {
                q.pagesize = obj.limit;
                q.pagenum = obj.curr;
                if (!first) initList()
            }
        })
    }
    $('tbody').on('click', '.btn_delete', function () {
        var len = $('.btn_delete').length
        var id = $(this).attr('data-id')
        layer.confirm('确认删除', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status == 1) return leyui.layer.msg(res.message)
                    layui.layer.msg(res.message)
                    layer.close(index);
                    if (len == 1) {
                        q.pagenum = q.pagenum == 1 ? q.pagenum : q.pagenum - 1
                    }
                    initList();
                }
            })
        })
    })
})