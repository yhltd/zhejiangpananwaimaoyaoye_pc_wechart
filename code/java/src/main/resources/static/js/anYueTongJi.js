function getList() {
    var nian = "";
    $ajax({
        type: 'post',
        url: '/tongji/getList2',
        data: {
            nian: nian,
            customer:'',
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
        var nian = $('#nian').val();
        var customer = $('#customer').val();
        $ajax({
            type: 'post',
            url: '/tongji/getList2',
            data: {
                nian: nian,
                customer: customer,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });

    $('#refresh-btn').click(function () {
        $('#nian').val("");
        $('#customer').val("");
        var nian = "";
        $ajax({
            type: 'post',
            url: '/tongji/getList2',
            data: {
                nian: nian,
                customer: '',
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
        height: document.body.clientHeight * 0.87,
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


function toExcel() {

    var nian = $('#nian').val();
    var customer = $('#customer').val();
    $ajax({
        type: 'post',
        url: '/tongji/getList2',
        data: {
            nian: nian,
            customer: customer,
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            console.log(res.data)
            var array = res.data
            var header = []
            for (var i = 0; i < array.length; i++) {
                var body = {
                    type: array[i].type,
                    yue1: array[i].yue1,
                    yue2:array[i].yue2,
                    yue3: array[i].yue3,
                    yue4: array[i].yue4,
                    yue5: array[i].yue5,
                    yue6: array[i].yue6,
                    yue7: array[i].yue,
                    yue8: array[i].yue8,
                    yue9: array[i].yue9,
                    yue10: array[i].yue10,
                    yue11: array[i].yue11,
                    yue12: array[i].yue12,
                }
                header.push(body)
            }
            console.log(header)
            title = ['类型','1月','2月', '3月', '4月', '5月', '6月', '7月', '8月','9月','10月','11月', '12月']
            JSONToExcelConvertor(header, "按月统计", title)

        }
    })

}


function JSONToExcelConvertor(JSONData, FileName, title, filter) {
    if (!JSONData)
        return;
    //转化json为object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var excel = "<table>";

    //设置表头
    var row = "<tr>";

    if (title) {
        //使用标题项
        for (var i in title) {
            row += "<th align='center'>" + title[i] + '</th>';
        }

    }
    else {
        //不使用标题项
        for (var i in arrData[0]) {
            row += "<th align='center'>" + i + '</th>';
        }
    }

    excel += row + "</tr>";

    //设置数据
    for (var i = 0; i < arrData.length; i++) {
        var row = "<tr>";

        for (var index in arrData[i]) {
            //判断是否有过滤行
            if (filter) {
                if (filter.indexOf(index) == -1) {
                    var value = arrData[i][index] == null ? "" : arrData[i][index];
                    row += '<td>' + value + '</td>';
                }
            }
            else {
                var value = arrData[i][index] == null ? "" : arrData[i][index];
                row += "<td align='center'>" + value + "</td>";
            }
        }

        excel += row + "</tr>";
    }

    excel += "</table>";

    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";


    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

    var link = document.createElement("a");
    link.href = uri;

    link.style = "visibility:hidden";
    link.download = FileName + ".xls";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}