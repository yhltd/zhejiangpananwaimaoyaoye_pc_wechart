function getSelect() {
    $ajax({
        type: 'post',
        url: '/customer/getSelect',
    }, false, '', function (res) {
        if (res.code == 200) {
            var item = "";
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].id != null && res.data[i].id != "") {
                    item = "<option value=\"" + res.data[i].id + "\">" + res.data[i].customer + "</option>"
                    $("#customerId").append(item);
                }
            }
        }
    })
}

function getList(){
    var customerId =0;
    $ajax({
        type: 'post',
        url: '/kanban/getList',
        data: {
            customerId: customerId,
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setXSTable(res.data);
            setZSTable(res.data);
            $("#xsTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
            $("#zsTable").colResizable({
                liveDrag: true,
                gripInnerHtml: "<div class='grip'></div>",
                draggingClass: "dragging",
                resizeMode: 'fit'
            });
        }
    })
}

$(function () {
    getSelect();
    getList();
    $('#select-btn').click(function () {
        var customerId = $('#customerId').val();
        $ajax({
            type: 'post',
            url: '/kanban/getList',
            data: {
                customerId: customerId,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setXSTable(res.data);
                setZSTable(res.data);
            }
        })
    });
});

function setXSTable(data) {
    if ($('#xsTable').html != '') {
        $('#xsTable').bootstrapTable('load', data);
    }

    $('#xsTable').bootstrapTable({
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
                field: 'xs',
                title: '类型',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xswqye',
                title: '往期余额',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'bqgh',
                title: '本期购货',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'bqth',
                title: '本期退货',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'yf',
                title: '已付',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zhekou',
                title: '折扣',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'fkjine',
                title: '返款金额',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'xsyue',
                title: '余额',
                align: 'center',
                sortable: true,
                width: 100,
            }
        ],
    })
}

function setZSTable(data) {
    if ($('#zsTable').html != '') {
        $('#zsTable').bootstrapTable('load', data);
    }

    $('#zsTable').bootstrapTable({
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
                field: 'zs',
                title: '类型',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zswqye',
                title: '往期余额',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'bqzs',
                title: '本期赠送',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'zsyue',
                title: '余额',
                align: 'center',
                sortable: true,
                width: 100,
            }, {
                field: 'kpjine',
                title: '已开票金额',
                align: 'center',
                sortable: true,
                width: 100,
            }
        ],
    })
}