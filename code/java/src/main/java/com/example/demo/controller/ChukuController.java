package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.ChukuService;
import com.example.demo.service.CustomerInfoService;
import com.example.demo.service.ProductService;
import com.example.demo.service.SaleService;
import com.example.demo.util.*;
//import com.jacob.activeX.ActiveXComponent;
//import com.jacob.com.ComThread;
//import com.jacob.com.Dispatch;
//import com.jacob.com.Variant;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;


import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @author hui
 * @date 2022/8/31 11:34
 */
@Slf4j
@RestController
@RequestMapping("/chuku")
public class ChukuController {

    @Autowired
    ChukuService chukuService;
    @Autowired
    ProductService productService;
    @Autowired
    CustomerInfoService customerInfoService;


    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("销售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Sale> getList = chukuService.getList(userInfo.getName(), userInfo.getPower());
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


    /**
     * 查询所有审核中
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList_shenhezhong")
    public ResultInfo getList_shenhezhong(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("销售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Sale> getList = chukuService.getList_shenhezhong(userInfo.getName(), userInfo.getPower());
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


    /**
     * 查询所有审核通过
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList_tongguo")
    public ResultInfo getList_tongguo(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("销售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Sale> getList = chukuService.getList_tongguo(userInfo.getName(), userInfo.getPower());
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 查询所有审核未通过
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList_weitongguo")
    public ResultInfo getList_weitongguo(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("销售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Sale> getList = chukuService.getList_weitongguo(userInfo.getName(), userInfo.getPower());
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList")
    public ResultInfo queryList(String ks, String js, String customer, String product, String pihao, String saleType, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("销售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        if (ks.equals("")) {
            ks = "1900/1/1";
        }
        if (js.equals("")) {
            js = "2200/1/1";
        }
        try {
            List<Sale> getList = chukuService.queryList(ks, js, customer, product, pihao, saleType, userInfo.getName(), userInfo.getPower());
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


    /**
     * 添加
     */
    @RequestMapping("/insert")
    public ResultInfo insert(String riqi, Integer productId, String saleType, String price, String num, String remarks, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("銷售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            Sale sale = new Sale();
            sale.setRiqi(riqi);
            sale.setNum(num);
            sale.setRemarks(remarks);
            sale.setProductId(productId);
            sale.setSaleType(saleType);
            sale.setPrice(price);
            sale.setSaleState("审核通过");
            sale.setChukuState("审核中");
            sale.setChukuInsert("1");
            sale.setXiaoji((Double.parseDouble(num) * Double.parseDouble(price)) + "");
            sale = chukuService.add(sale);
            return ResultInfo.success("添加成功", sale);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            return ResultInfo.error("添加失败");
        }
    }


    /**
     * 修改
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResultInfo update(@RequestBody String updateJson, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        Sale sale = null;
        try {
            sale = DecodeUtil.decodeToJson(updateJson, Sale.class);
            if (sale.getChukuState().equals("审核通过") && !userInfo.getPower().equals("管理员")) {
                if (!userInfo.getStateUpd().equals("是")) {
                    return ResultInfo.error(401, "审核已通过，无修改权限");
                }
            } else {
                if (!powerUtil.isUpdate("销售") && !userInfo.getPower().equals("管理员")) {
                    return ResultInfo.error(401, "无权限");
                }
            }
            if (chukuService.update(sale)) {
                return ResultInfo.success("修改成功", sale);
            } else {
                return ResultInfo.success("修改失败", sale);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", sale);
            return ResultInfo.error("修改失败");
        }
    }

    /**
     * 删除
     *
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isDelete("销售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (chukuService.delete(idList)) {
                return ResultInfo.success("删除成功", idList);
            } else {
                return ResultInfo.success("删除失败", idList);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("删除失败：{}", e.getMessage());
            log.error("参数：{}", idList);
            return ResultInfo.error("删除失败");
        }
    }

    /**
     * 审核
     */
    @RequestMapping("/updateState")
    public ResultInfo updateState(String chukuState, int id, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        if (!userInfo.getPower().equals("管理员")) {
            return ResultInfo.success("无权限");
        }
        try {
            if (chukuService.updateChukuState(chukuState, id)) {
                return ResultInfo.success("审核成功");
            } else {
                return ResultInfo.success("审核失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("审核失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 按指定格式导出excel
     *
     * @return ResultInfo
     */
    @RequestMapping("/export")
    public ResultInfo export(@RequestBody HashMap map, HttpSession session, HttpServletResponse response) {
        try {
            GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
            List<Sale> list = GsonUtil.toList(gsonUtil.get("list"), Sale.class);
            //获得excel路径
            //String path = System.getProperty("user.dir") + "/src/main/resources/static/excel/浙江省磐安外贸药业有限公司发货清单.xlsx";
            String path = "C:\\zhejiang\\浙江省磐安外贸药业有限公司发货清单.xlsx";
            File file = new File(path);
            Workbook workbook = null;
            try {
                BufferedInputStream is = new BufferedInputStream(new FileInputStream(file));
                workbook = WorkbookFactory.create(is);
            } catch (Exception e) {
                e.printStackTrace();
            }
            //查找到指定的sheet
            Sheet sheet = workbook.getSheet("发货清单");
            //sheet.setForceFormulaRecalculation(true);
            for (int i = 0; i < list.size(); i++) {
                Row row = sheet.getRow(i + 7);
                if (row == null) {
                    row = sheet.createRow(i + 7);
                }

                //品名
                Cell cell = row.getCell(2);
                if (list.get(i).getProductName() != null && !list.get(i).getProductName().equals("")) {
                    cell.setCellValue(list.get(i).getProductName());
                } else {
                    cell.setCellValue("-");
                }
                //规格
                cell = row.getCell(3);
                if (list.get(i).getSpec() != null && !list.get(i).getSpec().equals("")) {
                    cell.setCellValue(list.get(i).getSpec());
                } else {
                    cell.setCellValue("-");
                }
                //数量
                cell = row.getCell(8);
                if (list.get(i).getNum() != null && !list.get(i).getNum().equals("")) {
                    cell.setCellValue(list.get(i).getNum());
                } else {
                    cell.setCellValue("-");
                }
                //单位
                cell = row.getCell(9);
                if (list.get(i).getUnit() != null && !list.get(i).getUnit().equals("")) {
                    cell.setCellValue(list.get(i).getUnit());
                } else {
                    cell.setCellValue("-");
                }
                //零售价
                cell = row.getCell(10);
                if (list.get(i).getPrice() != null && !list.get(i).getPrice().equals("")) {
                    cell.setCellValue(list.get(i).getPrice());
                } else {
                    cell.setCellValue("-");
                }
                //批号
                cell = row.getCell(14);
                if (list.get(i).getPihao() != null && !list.get(i).getPihao().equals("")) {
                    cell.setCellValue(list.get(i).getPihao());
                } else {
                    cell.setCellValue("-");
                }
            }
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            try {
                workbook.write(bos);
                byte[] bytes = bos.toByteArray();
                String base64ExlCode = Base64Utils.encodeToString(bytes);
                String excel = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + base64ExlCode;
                return ResultInfo.success("获取成功", excel);
            } catch (IOException e) {
                e.printStackTrace();
                return ResultInfo.error("失败");
            } finally {
                try {
                    if (bos != null) {
                        bos.close();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResultInfo.error("失败");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("失败：{}", e.getMessage());
            return ResultInfo.error("失败");
        }
    }

//    /**
//     * 打印
//     *
//     * @return ResultInfo
//     */
//    @RequestMapping("/print")
//    public ResultInfo print(@RequestBody HashMap map, HttpSession session, HttpServletResponse response) {
//        try {
//            GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
//            List<Sale> list = GsonUtil.toList(gsonUtil.get("list"), Sale.class);
//            //获得excel路径
//            //String path = System.getProperty("user.dir") + "/src/main/resources/static/excel/浙江省磐安外贸药业有限公司发货清单.xlsx";
//            String path = "C:\\zhejiang\\浙江省磐安外贸药业有限公司发货清单.xlsx";
//            File file = new File(path);
//            Workbook workbook = null;
//            try {
//                BufferedInputStream is = new BufferedInputStream(new FileInputStream(file));
//                workbook = WorkbookFactory.create(is);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//            //查找到指定的sheet
//            Sheet sheet = workbook.getSheet("发货清单");
//            //sheet.setForceFormulaRecalculation(true);
//            for (int i = 0; i < list.size(); i++) {
//                Row row = sheet.getRow(i + 7);
//                if (row == null) {
//                    row = sheet.createRow(i + 7);
//                }
//
//                //品名
//                Cell cell = row.getCell(2);
//                if (list.get(i).getProductName() != null && !list.get(i).getProductName().equals("")) {
//                    cell.setCellValue(list.get(i).getProductName());
//                } else {
//                    cell.setCellValue("-");
//                }
//                //规格
//                cell = row.getCell(3);
//                if (list.get(i).getSpec() != null && !list.get(i).getSpec().equals("")) {
//                    cell.setCellValue(list.get(i).getSpec());
//                } else {
//                    cell.setCellValue("-");
//                }
//                //数量
//                cell = row.getCell(8);
//                if (list.get(i).getNum() != null && !list.get(i).getNum().equals("")) {
//                    cell.setCellValue(list.get(i).getNum());
//                } else {
//                    cell.setCellValue("-");
//                }
//                //单位
//                cell = row.getCell(9);
//                if (list.get(i).getUnit() != null && !list.get(i).getUnit().equals("")) {
//                    cell.setCellValue(list.get(i).getUnit());
//                } else {
//                    cell.setCellValue("-");
//                }
//                //零售价
//                cell = row.getCell(10);
//                if (list.get(i).getPrice() != null && !list.get(i).getPrice().equals("")) {
//                    cell.setCellValue(list.get(i).getPrice());
//                } else {
//                    cell.setCellValue("-");
//                }
//                //批号
//                cell = row.getCell(14);
//                if (list.get(i).getPihao() != null && !list.get(i).getPihao().equals("")) {
//                    cell.setCellValue(list.get(i).getPihao());
//                } else {
//                    cell.setCellValue("-");
//                }
//            }
//            Date date = new Date();
//            SimpleDateFormat spd = new SimpleDateFormat("yyyyMMddhhmmss");
//            ByteArrayOutputStream bos = new ByteArrayOutputStream();
//            String filename = "C:\\zhejiang\\浙江省磐安外贸药业有限公司发货清单" + spd.format(date) + ".xlsx";
//            try {
//                workbook.write(bos);
//                File outfile = new File(filename);
//                FileOutputStream fileOutputStream = new FileOutputStream(outfile);
//                fileOutputStream.write(bos.toByteArray());
//                fileOutputStream.flush();
//                fileOutputStream.close();
//
//                if (ChukuController.printOfficeFile(outfile)){
//                    return ResultInfo.success("成功");
//                }else{
//                    return ResultInfo.error("失败");
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//                return ResultInfo.error("失败");
//            } finally {
//                try {
//                    if (bos != null) {
//                        bos.close();
//                    }
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            log.error("失败：{}", e.getMessage());
//            return ResultInfo.error("失败");
//        }
//    }

//    public static boolean printOfficeFile(File f) {
//        ComThread.InitMTA();
//        ActiveXComponent xl = new ActiveXComponent("Excel.Application");
//        try {
//            Dispatch.put(xl, "Visible", new Variant(false));
//            Dispatch workbooks = xl.getProperty("Workbooks").toDispatch();
//            // 打开文档
//            Dispatch excel = Dispatch.call(workbooks, "Open", f.getAbsolutePath()).toDispatch();
//            // 每张表都横向打印
//            Dispatch sheets = Dispatch.get((Dispatch) excel, "Sheets").toDispatch();
//            // 获得几个sheet
//            int count = Dispatch.get(sheets, "Count").getInt();
//            // System.out.println(count);
//            for (int j = 1; j <= count; j++) {
//                Dispatch sheet2 = Dispatch
//                        .invoke(sheets, "Item", Dispatch.Get, new Object[] { new Integer(j) }, new int[1])
//                        .toDispatch();
//                Dispatch pageSetup = Dispatch.get(sheet2, "PageSetup").toDispatch();
//                Dispatch.put(pageSetup, "Orientation", new Variant(2));
//                Dispatch.call(sheet2, "PrintOut");
//            }
//            // 开始打印
//            Dispatch.call(excel, "save");
//            Dispatch.call(excel, "Close", new Variant(true));
//
//            xl.invoke("Quit", new Variant[] {});
//            xl = null;
//            return true;
//        }catch (Exception e){
//            e.printStackTrace();
//            return false;
//        }finally {
//            // 始终释放资源
//            ComThread.Release();
//        }
//    }
//
}

