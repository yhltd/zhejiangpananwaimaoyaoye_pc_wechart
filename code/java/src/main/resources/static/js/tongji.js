function getList(){
    var nian="";
    var customer="";
    $ajax({
        type: 'post',
        url: '/tongji/getList',
        data: {
            nian:nian,
            customer: customer,
        }
    }, true, '', function (res) {
        if (res.code == 200) {
            setTable(res.data);
            $("#tongjiTable").colResizable({
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
        var customer = $('#customer').val();
        $ajax({
            type: 'post',
            url: '/tongji/getList',
            data: {
                nian:nian,
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
        var nian= "";
        var customer = "";
        $ajax({
            type: 'post',
            url: '/tongji/getList',
            data: {
                nian:nian,
                customer: customer,
            }
        }, true, '', function (res) {
            if (res.code == 200) {
                setTable(res.data);
            }
        })
    });
});

function setTable(data) {
    if ($('#tongjiTable').html != '') {
        $('#tongjiTable').bootstrapTable('load', data);
    }

    $('#tongjiTable').bootstrapTable({
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
                field: 'customer',
                title: '客户',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'customerNum',
                title: '客户号',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'area',
                title: '区域',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'leibie',
                title: '类别',
                align: 'center',
                sortable: true,
                width: 100,
            },{
                field: 'xswqye',
                title: '往期余额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'xs',
                title: '本期购货',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'th',
                title: '本期退货',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'fankuan',
                title: '返款金额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'fukuan',
                title: '付款金额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'zhekou',
                title: '折扣金额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'yue',
                title: '余额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'zswqye',
                title: '往期赠送余额',
                align: 'center',
                sortable: true,
                width: 150,
            }, {
                field: 'zengsong',
                title: '赠送金额',
                align: 'center',
                sortable: true,
                width: 150,
            }
        ],
    })
}


function toExcel() {

    var nian= $('#nian').val();
    var customer = $('#customer').val();
    $ajax({
        type: 'post',
        url: '/tongji/getList',
        data: {
            nian:nian,
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
                    customer: array[i].customer,
                    customerNum:array[i].customerNum,
                    area: array[i].area,
                    leibie: array[i].leibie,
                    xswqye: array[i].xswqye,
                    xs: array[i].xs,
                    th: array[i].th,
                    fankuan: array[i].fankuan,
                    fukuan: array[i].fukuan,
                    zhekou: array[i].zhekou,
                    yue: array[i].yue,
                    zswqye: array[i].zswqye,
                    zengsong: array[i].zengsong,
                }
                header.push(body)
            }
            console.log(header)
            title = ['客户名称','客户号', '区域', '类别', '往期余额', '本期购货', '本期退货', '返款金额','付款金额','折扣金额','余额', '往期赠送余额','赠送金额']
            JSONToExcelConvertor(header, "销售额统计", title)

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