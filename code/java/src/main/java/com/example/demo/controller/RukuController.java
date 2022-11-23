package com.example.demo.controller;

import com.example.demo.entity.Assay;
import com.example.demo.entity.Product;
import com.example.demo.entity.Ruku;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.AssayService;
import com.example.demo.service.ProductService;
import com.example.demo.service.RukuService;
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
 * @date 2022/8/30 16:07
 */
@Slf4j
@RestController
@RequestMapping("/ruku")
public class RukuController {
    @Autowired
    RukuService rukuService;
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
        if (!powerUtil.isSelect("入库") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Ruku> getList = rukuService.getList(userInfo.getName(), userInfo.getPower());
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
    @RequestMapping("/getList_kanban")
    public ResultInfo getList_kanban(HttpSession session,String riqi,String salesman,String type) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("入库") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            List<Ruku> getList = rukuService.getList_kanban(riqi,salesman,type);
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
        if (!powerUtil.isSelect("入库") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Ruku> getList = rukuService.getList_shenhezhong(userInfo.getName(), userInfo.getPower());
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
        if (!powerUtil.isSelect("入库") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Ruku> getList = rukuService.getList_tongguo(userInfo.getName(), userInfo.getPower());
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
        if (!powerUtil.isSelect("入库") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Ruku> getList = rukuService.getList_weitongguo(userInfo.getName(), userInfo.getPower());
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
    public ResultInfo queryList(String ks, String js, String product, String pihao, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("入库") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        if (ks.equals("")) {
            ks = "1900/1/1";
        }
        if (js.equals("")) {
            js = "2200/1/1";
        }
        try {
            List<Ruku> getList = rukuService.queryList(ks, js, product, pihao, userInfo.getName(), userInfo.getPower());
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
        if (!powerUtil.isAdd("入库") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            Ruku ruku = GsonUtil.toEntity(gsonUtil.get("addInfo"), Ruku.class);
            ruku.setStaff(userInfo.getName());
            ruku.setState("审核中");
            ruku = rukuService.add(ruku);
            if (StringUtils.isNotNull(ruku)) {
                return ResultInfo.success("添加成功", ruku);
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
    public ResultInfo insert(String warehouse, String productDate, String productId, String pihao, String num, String remarks,String validity, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("入库") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            Date date = new Date();
            SimpleDateFormat spd = new SimpleDateFormat("yyyy-MM-dd");

            Ruku ruku = new Ruku();
            ruku.setWarehouse(warehouse);
            ruku.setProductDate(productDate);
            ruku.setProductId(productId);
            ruku.setPihao(pihao);
            ruku.setNum(num);
            ruku.setRemarks(remarks);
            ruku.setValidity(validity);
            ruku.setStaff(userInfo.getName());
            ruku.setState("审核中");
            ruku.setRiqi(spd.format(date));
            ruku = rukuService.add(ruku);
            if (StringUtils.isNotNull(ruku)) {
                return ResultInfo.success("添加成功", ruku);
            } else {
                return ResultInfo.success("添加失败", null);
            }
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
        Ruku ruku = null;
        try {
            ruku = DecodeUtil.decodeToJson(updateJson, Ruku.class);
            UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
            PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
            if (ruku.getState().equals("审核通过") && !userInfo.getPower().equals("管理员")) {
                if (!userInfo.getStateUpd().equals("是")) {
                    return ResultInfo.error(401, "审核已通过，无修改权限");
                }
            } else {
                if (!powerUtil.isUpdate("入库") && !userInfo.getPower().equals("管理员")) {
                    return ResultInfo.error(401, "无权限");
                }
            }

            ruku.setState("审核中");
            if (rukuService.update(ruku)) {
                return ResultInfo.success("修改成功", ruku);
            } else {
                return ResultInfo.success("修改失败", ruku);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", ruku);
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
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        List<String> shenhe = GsonUtil.toList(gsonUtil.get("shenhe"), String.class);

        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);

        if (!userInfo.getStateUpd().equals("是") && shenhe.contains("审核通过") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "选择的数据中有审核通过的数据，请重新选择！");
        } else if (!powerUtil.isDelete("入库") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            if (rukuService.delete(idList)) {
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
    public ResultInfo updateState(String state, int id, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        if (userInfo.getPower().equals("其他")) {
            return ResultInfo.success("无权限");
        }
        try {
            if (rukuService.updateState(state, id)) {
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
        try {
            FileInputStream fis = new FileInputStream(StringUtils.base64ToFile(excel));
            Workbook wb = null;
            //创建2007版本Excel工作簿对象
            wb = new XSSFWorkbook(fis);
            //获取基本信息工作表
            Sheet sheet = wb.getSheet("入库");
            //循环Excel文件的i=1行开始
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Ruku ruku = new Ruku();
                //获取第i行
                Row row = sheet.getRow(i);
                //日期
                Cell riqi = row.getCell(0);
                if (riqi != null) {
                    riqi.setCellType(CellType.STRING);
                    ruku.setRiqi(riqi.getStringCellValue());
                }
                //仓库
                Cell warehouse = row.getCell(1);
                if (warehouse != null) {
                    warehouse.setCellType(CellType.STRING);
                    ruku.setWarehouse(warehouse.getStringCellValue());
                }
                //入库员
                Cell staff = row.getCell(2);
                if (staff != null) {
                    staff.setCellType(CellType.STRING);
                    ruku.setStaff(staff.getStringCellValue());
                }
                //生产日期
                Cell productDate = row.getCell(3);
                if (productDate != null) {
                    productDate.setCellType(CellType.STRING);
                    ruku.setProductDate(productDate.getStringCellValue());
                }
                //生产日期
                Cell validity = row.getCell(4);
                if (validity != null) {
                    validity.setCellType(CellType.STRING);
                    ruku.setValidity(validity.getStringCellValue());
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
                //批号
                Cell pihao = row.getCell(7);
                if (pihao != null) {
                    pihao.setCellType(CellType.STRING);
                    ruku.setPihao(pihao.getStringCellValue());
                }
                //数量
                Cell num = row.getCell(8);
                if (num != null) {
                    num.setCellType(CellType.STRING);
                    ruku.setNum(num.getStringCellValue());
                }
                //单位
                Cell unit = row.getCell(9);
                if (unit != null) {
                    unit.setCellType(CellType.STRING);
                    productUnit = unit.getStringCellValue();
                }
                //备注
                Cell remarks = row.getCell(10);
                if (remarks != null) {
                    remarks.setCellType(CellType.STRING);
                    ruku.setRemarks(remarks.getStringCellValue());
                }
                ruku.setState("审核中");
                //查询商品id
                List<Product> list = productService.getListByProductSpecUnit(product, productSpec, productUnit);
                //保存
                if (list.size() > 0) {
                    ruku.setProductId(list.get(0).getId().toString());
                    rukuService.add(ruku);
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
