package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.CustomerInfoService;
import com.example.demo.service.ProductService;
import com.example.demo.service.SaleService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.FileInputStream;
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
@RequestMapping("/sale")
public class SaleController {
    @Autowired
    SaleService saleService;
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
            List<Sale> getList = saleService.getList(userInfo.getName(), userInfo.getPower());
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
            List<Sale> getList = saleService.getList_shenhezhong(userInfo.getName(), userInfo.getPower());
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
            List<Sale> getList = saleService.getList_tongguo(userInfo.getName(), userInfo.getPower());
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
            List<Sale> getList = saleService.getList_weitongguo(userInfo.getName(), userInfo.getPower());
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
            List<Sale> getList = saleService.queryList(ks, js, customer, product, pihao, saleType, userInfo.getName(), userInfo.getPower());
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
    @RequestMapping("/add")
    public ResultInfo add(@RequestBody HashMap map, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("销售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            Sale sale = GsonUtil.toEntity(gsonUtil.get("addInfo"), Sale.class);
            sale = saleService.add(sale);
            if (StringUtils.isNotNull(sale)) {
                return ResultInfo.success("添加成功", sale);
            } else {
                return ResultInfo.success("添加失败", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            log.error("参数：{}", map);
            return ResultInfo.error("添加失败");
        }
    }

    /**
     * 添加
     */
    @RequestMapping("/insert")
    public ResultInfo insert(String riqi, Integer customerId, String shStaff, String pick, String type, Integer productId, String saleType, String price, String num, String remarks, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("銷售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            Sale sale = new Sale();
            sale.setRiqi(riqi);
            sale.setCustomerId(customerId);
            sale.setShStaff(shStaff);
            sale.setPick(pick);
            sale.setNum(num);
            sale.setRemarks(remarks);
            sale.setType(type);
            sale.setProductId(productId);
            sale.setSaleType(saleType);
            sale.setPrice(price);
            sale.setSaleState("审核中");
            sale.setXiaoji((Double.parseDouble(num) * Double.parseDouble(price)) + "");
            sale = saleService.add(sale);
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
        if (!powerUtil.isUpdate("销售") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        Sale sale = null;
        try {
            sale = DecodeUtil.decodeToJson(updateJson, Sale.class);
            if (saleService.update(sale)) {
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
            if (saleService.delete(idList)) {
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
     * 上传excel
     *
     * @param excel excel
     * @return ResultInfo
     */
    @PostMapping("/upload")
    public ResultInfo upload(String excel) {
        String product = null;
        String productSpec = null;
        String productUnit = null;
        String c = null;
        try {
            FileInputStream fis = new FileInputStream(StringUtils.base64ToFile(excel));
            Workbook wb = null;
            //创建2007版本Excel工作簿对象
            wb = new XSSFWorkbook(fis);
            //获取基本信息工作表
            Sheet sheet = wb.getSheet("销售");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Sale sale = new Sale();
                //获取第i行
                Row row = sheet.getRow(i);
                //日期
                Cell riqi = row.getCell(0);
                if (riqi != null) {
                    riqi.setCellType(CellType.STRING);
                    sale.setRiqi(riqi.getStringCellValue());
                }
                //客户
                Cell customer = row.getCell(1);
                if (customer != null) {
                    customer.setCellType(CellType.STRING);
                    c = customer.getStringCellValue();
                }
                //收获人员
                Cell shStaff = row.getCell(2);
                if (shStaff != null) {
                    shStaff.setCellType(CellType.STRING);
                    sale.setShStaff(shStaff.getStringCellValue());
                }
                //拿货方式
                Cell pick = row.getCell(3);
                if (pick != null) {
                    pick.setCellType(CellType.STRING);
                    sale.setPick(pick.getStringCellValue());
                }
                //发货类型
                Cell saleType = row.getCell(4);
                if (saleType != null) {
                    saleType.setCellType(CellType.STRING);
                    sale.setSaleType(saleType.getStringCellValue());
                }
                //产品名称
                Cell productName = row.getCell(5);
                if (productName != null) {
                    productName.setCellType(CellType.STRING);
                    product = productName.getStringCellValue();
                }
                //规格
                Cell spec = row.getCell(6);
                if (spec != null) {
                    spec.setCellType(CellType.STRING);
                    productSpec = spec.getStringCellValue();
                }
                //单位
                Cell unit = row.getCell(7);
                if (unit != null) {
                    unit.setCellType(CellType.STRING);
                    productUnit = unit.getStringCellValue();
                }
                //单价
                Cell price = row.getCell(6);
                if (price != null) {
                    price.setCellType(CellType.STRING);
                    sale.setPrice(price.getStringCellValue());
                }
                //数量
                Cell num = row.getCell(7);
                if (num != null) {
                    num.setCellType(CellType.STRING);
                    sale.setNum(num.getStringCellValue());
                }
                if (num != null && price != null) {
                    sale.setXiaoji((Double.parseDouble(sale.getNum()) * Double.parseDouble(sale.getPrice())) + "");
                }
                //备注
                Cell remarks = row.getCell(9);
                if (remarks != null) {
                    remarks.setCellType(CellType.STRING);
                    sale.setRemarks(remarks.getStringCellValue());
                }
                //类型
                Cell type = row.getCell(9);
                if (type != null) {
                    type.setCellType(CellType.STRING);
                    sale.setType(type.getStringCellValue());
                }
                sale.setSaleState("审核中");
                //查询商品id和客户id
                List<Product> list = productService.getListByProductSpecUnit(product, productSpec, productUnit);
                List<CustomerInfo> list2 = customerInfoService.getListByCustomer(c);
                //保存
                if (list.size() > 0 && list2.size() > 0) {
                    sale.setProductId(list.get(0).getId());
                    sale.setCustomerId(list.get(0).getId());
                    saleService.add(sale);
                }
            }
            return ResultInfo.success("上传成功");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败，请查看数据是否正确：{}", e.getMessage());
            log.error("参数：{}", excel);
            return ResultInfo.error("上传失败，请查看数据是否正确");
        }
    }
}
