package com.example.demo.controller;

import com.example.demo.entity.General;
import com.example.demo.entity.Product;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.ProductService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;

/**
 * @author hui
 * @date 2022/8/19 16:42
 */
@Slf4j
@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    ProductService productService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("产品设置") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Product> getList = productService.getList();
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
    public ResultInfo queryList(String query,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("产品设置") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Product> getList = productService.queryList(query);
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
    @RequestMapping("/getSelect")
    public ResultInfo geSelect(HttpSession session) {
        try {
            List<Product> getList = productService.getList();
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
    @RequestMapping("/getListByProduct")
    public ResultInfo getListByProduct(HttpSession session) {
        try {
            List<Product> getList = productService.getListByProduct();
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
        if (!powerUtil.isAdd("产品设置") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            Product product = GsonUtil.toEntity(gsonUtil.get("addInfo"), Product.class);
            product = productService.add(product);
            if (StringUtils.isNotNull(product)) {
                return ResultInfo.success("添加成功", product);
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
     * 修改
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResultInfo update(@RequestBody String updateJson,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("产品设置") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        Product product = null;
        try {
            product = DecodeUtil.decodeToJson(updateJson, Product.class);
            if (productService.update(product)) {
                return ResultInfo.success("修改成功", product);
            } else {
                return ResultInfo.success("修改失败", product);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", product);
            return ResultInfo.error("修改失败");
        }
    }

    /**
     * 删除
     *
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isDelete("产品设置") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (productService.delete(idList)) {
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
        try {
            FileInputStream fis = new FileInputStream(StringUtils.base64ToFile(excel));
            Workbook wb = null;
            //创建2007版本Excel工作簿对象
            wb = new XSSFWorkbook(fis);
            //获取基本信息工作表
            Sheet sheet = wb.getSheet("产品设置");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Product product = new Product();
                //获取第i行
                Row row = sheet.getRow(i);
                //产品名称
                Cell productName = row.getCell(0);
                if (productName != null) {
                    productName.setCellType(CellType.STRING);
                    product.setProductName(productName.getStringCellValue());
                }
                //规格
                Cell spec = row.getCell(1);
                if (spec != null) {
                    spec.setCellType(CellType.STRING);
                    product.setSpec(spec.getStringCellValue());
                }
                //单位
                Cell unit = row.getCell(2);
                if (unit != null) {
                    unit.setCellType(CellType.STRING);
                    product.setUnit(unit.getStringCellValue());
                }
                //零售价
                Cell price = row.getCell(3);
                if (price != null) {
                    price.setCellType(CellType.STRING);
                    product.setPrice(price.getStringCellValue());
                }
                //拼音
                Cell pinyin = row.getCell(4);
                if (pinyin != null) {
                    pinyin.setCellType(CellType.STRING);
                    product.setPinyin(pinyin.getStringCellValue());
                }
                //品号
                Cell pinhao = row.getCell(5);
                if (pinhao != null) {
                    pinhao.setCellType(CellType.STRING);
                    product.setPinhao(pinhao.getStringCellValue());
                }
                //产品属性
                Cell attribute = row.getCell(6);
                if (attribute != null) {
                    attribute.setCellType(CellType.STRING);
                    product.setAttribute(attribute.getStringCellValue());
                }
                //整箱量
                Cell container = row.getCell(7);
                if (container != null) {
                    container.setCellType(CellType.STRING);
                    product.setContainer(container.getStringCellValue());
                }
                //保存到数据库
                productService.add(product);
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
