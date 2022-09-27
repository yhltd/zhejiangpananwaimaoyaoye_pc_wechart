package com.example.demo.controller;

import com.example.demo.entity.CustomerInfo;
import com.example.demo.entity.Product;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.CustomerInfoService;
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
 * @date 2022/8/22 16:10
 */
@Slf4j
@RestController
@RequestMapping("/customer")
public class CustomerInfoController {
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
        if (!powerUtil.isSelect("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<CustomerInfo> getList = customerInfoService.getList(userInfo.getName(), userInfo.getPower());
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
    public ResultInfo getSelect(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        try {
            List<CustomerInfo> getList = customerInfoService.getList(userInfo.getName(), userInfo.getPower());
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
    public ResultInfo queryList(String customer,String leibie,String area, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<CustomerInfo> getList = customerInfoService.queryList(customer,leibie, userInfo.getName(), userInfo.getPower(),area);
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
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            Date date = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

            CustomerInfo customerInfo = GsonUtil.toEntity(gsonUtil.get("addInfo"), CustomerInfo.class);
            customerInfo.setRiqi(formatter.format(date));//添加日期
            customerInfo = customerInfoService.add(customerInfo);
            if (StringUtils.isNotNull(customerInfo)) {
                return ResultInfo.success("添加成功", customerInfo);
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
    public ResultInfo update(@RequestBody String updateJson, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        CustomerInfo customerInfo = null;
        try {
            customerInfo = DecodeUtil.decodeToJson(updateJson, CustomerInfo.class);
            if (customerInfoService.update(customerInfo)) {
                return ResultInfo.success("修改成功", customerInfo);
            } else {
                return ResultInfo.success("修改失败", customerInfo);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", customerInfo);
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
        if (!powerUtil.isDelete("客户信息") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (customerInfoService.delete(idList)) {
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
            Sheet sheet = wb.getSheet("客户信息");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                CustomerInfo customerInfo = new CustomerInfo();
                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                customerInfo.setRiqi(formatter.format(date));
                //获取第i行
                Row row = sheet.getRow(i);
                //客户号
                Cell customerNum = row.getCell(0);
                if (customerNum != null) {
                    customerNum.setCellType(CellType.STRING);
                    customerInfo.setCustomerNum(customerNum.getStringCellValue());
                }
                //类别
                Cell leibie = row.getCell(1);
                if (leibie != null) {
                    leibie.setCellType(CellType.STRING);
                    customerInfo.setLeibie(leibie.getStringCellValue());
                }
                //单位
                Cell area = row.getCell(2);
                if (area != null) {
                    area.setCellType(CellType.STRING);
                    customerInfo.setArea(area.getStringCellValue());
                }
                //客户
                Cell customer = row.getCell(3);
                if (customer != null) {
                    customer.setCellType(CellType.STRING);
                    customerInfo.setCustomer(customer.getStringCellValue());
                }
                //拼音
                Cell pinyin = row.getCell(4);
                if (pinyin != null) {
                    pinyin.setCellType(CellType.STRING);
                    customerInfo.setPinyin(pinyin.getStringCellValue());
                }
                //业务员
                Cell salesman = row.getCell(5);
                if (salesman != null) {
                    salesman.setCellType(CellType.STRING);
                    customerInfo.setSalesman(salesman.getStringCellValue());
                }
                //价格
                Cell price = row.getCell(6);
                if (price != null) {
                    price.setCellType(CellType.STRING);
                    customerInfo.setPrice(price.getStringCellValue());
                }
                //联系电话
                Cell phone = row.getCell(7);
                if (phone != null) {
                    phone.setCellType(CellType.STRING);
                    customerInfo.setPhone(phone.getStringCellValue());
                }
                //联系电话
                Cell address = row.getCell(8);
                if (address != null) {
                    address.setCellType(CellType.STRING);
                    customerInfo.setAddress(address.getStringCellValue());
                }
                //往期购货余额
                Cell ghye = row.getCell(9);
                if (ghye != null) {
                    ghye.setCellType(CellType.STRING);
                    customerInfo.setGhye(ghye.getStringCellValue());
                }
                //往期购货余额
                Cell zsye = row.getCell(10);
                if (zsye != null) {
                    zsye.setCellType(CellType.STRING);
                    customerInfo.setZsye(zsye.getStringCellValue());
                }
                //往期购货余额
                Cell remarks = row.getCell(11);
                if (remarks != null) {
                    remarks.setCellType(CellType.STRING);
                    customerInfo.setRemarks(remarks.getStringCellValue());
                }
                //保存到数据库
                customerInfoService.add(customerInfo);
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
