function getList(){
    var nian="";
    $ajax({
        type: 'post',
        url: '/tongji/getList2',
        data: {
            nian:nian,
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#anYueTongJiTable").colResizable({
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
    $('#select-btn').click(function () {
        var nian= $('#nian').val();
        $ajax({
            type: 'post',
            url: '/tongji/getList2',
            data: {
                nian:nian,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });

    $('#refresh-btn').click(function () {
        $('#nian').val("");
        var nian= "";
        $ajax({
            type: 'post',
            url: '/tongji/getList2',
            data: {
                nian:nian,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });
});

function setTable(data) {
    if ($('#anYueTongJiTable').html != '') {
        $('#anYueTongJiTable').bootstrapTable('load', data);
    }

    $('#anYueTongJiTable').bootstrapTable({
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
        style: 'table-layout:fixed',
        columns: [
            {
                field: 'type',
                title: '类型',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue1',
                title: '1月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue2',
                title: '2月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue3',
                title: '3月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue4',
                title: '4月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue5',
                title: '5月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue6',
                title: '6月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue7',
                title: '7月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue8',
                title: '8月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue9',
                title: '9月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue10',
                title: '10月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue11',
                title: '11月',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue12',
                title: '12月',
                align: 'center',
                sortable: true,
                width: 150,
            }
        ],
    })
}