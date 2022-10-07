package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.ChukuService;
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
            if (sale.getSaleState().equals("审核通过") && !userInfo.getPower().equals("管理员")) {
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
}
