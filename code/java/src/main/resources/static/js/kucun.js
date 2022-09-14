function getList() {
    $('#ks').val("");
    $('#js').val("");
    $('#product').val("");
    $ajax({
        type: 'post',
        url: '/kucun/getList',
    }, false, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#kucunTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
        }
    })
}

$(function () {
    getList();
    //刷新
    $("#refresh-btn").click(function () {
        getList();
    });

    $('#select-btn').click(function () {
        var ks = $('#ks').val();
        var js = $('#js').val();
        var product = $('#product').val();
        $ajax({
            type: 'post',
            url: '/kucun/queryList',
            data: {
                ks: ks,
                js: js,
                product: product,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });
});

function setTable(data) {
    if ($('#kucunTable').html != '') {
        $('#kucunTable').bootstrapTable('load', data);
    }

    $('#kucunTable').bootstrapTable({
        data: data,
        sortStable: true,
        classes: 'table table-hover text-nowrap table table-bordered',
        idField: 'id',
        pagination: true,
        pageSize: 15,//单页记录数
        clickToSelect: true,
        locale: 'zh-CN',
        toolbar: '#table-toolbar',
        toolbarAlign: 'left',
        theadClasses: "thead-light",//这里设置表头样式
        style:'table-layout:fixed',
        columns: [
            {
                field: '',
                title: '序号',
                align: 'center',
                width: 50,
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                field: 'productName',
                title: '产品名称',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'spec',
                title: '规格',
                align: 'center',
                sortable: true,
                width: 200,
            }, {
                field: 'unit',
                title: '单位',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'price',
                title: '单价',
                align: 'center',
                sortable: true,
                width: 120,
            }, {
                field: 'num',
                title: '数量',
                align: 'center',
                sortable: true,
                width: 120,
            }
        ],
        onClickRow: function (row, el) {
            let isSelect = $(el).hasClass('selected')
            if (isSelect) {
                $(el).removeClass('selected')
            } else {
                $(el).addClass('selected')
            }
        }
    })
}

