package com.example.demo.controller;

import com.example.demo.entity.General;
import com.example.demo.entity.UserInfo;
import com.example.demo.entity.UserPower;
import com.example.demo.service.GeneralService;
import com.example.demo.service.UserInfoService;
import com.example.demo.service.UserPowerService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author hui
 * @date 2022/8/19 10:20
 */
@Slf4j
@RestController
@RequestMapping("/user")
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;
    @Autowired
    private GeneralService generalService;
    @Autowired
    private UserPowerService userPowerService;

    @RequestMapping("/login")
    public ResultInfo login(HttpSession session, String username, String password) {
        try {
            //获取user
            Map<String, Object> map = userInfoService.login(username, password);

            //为Null则查询不到
            if (StringUtils.isEmpty(map)) {
                SessionUtil.remove(session, "token");
                SessionUtil.remove(session, "power");
                return ResultInfo.error(-1, "用户名密码错误");
            } else {
                SessionUtil.setToken(session, map.get("token").toString());
                SessionUtil.setPower(session, StringUtils.cast(map.get("power")));
                return ResultInfo.success("登陆成功", null);
            }
        } catch (Exception e) {
            log.error("登陆失败：{}", e.getMessage());
            log.error("参数：{}", username);
            log.error("参数：{}", password);
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("账号管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<UserInfo> getList = userInfoService.getList();
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
        try {
            List<UserInfo> getList = userInfoService.getList();
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 根据姓名和部门查询
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList")
    public ResultInfo queryList(String name, String department, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("账号管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<UserInfo> list = userInfoService.queryList(name, department);
            return ResultInfo.success("获取成功", list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 获得部门
     */
    @RequestMapping("/getDepartment")
    public ResultInfo getDepartment(HttpSession session) {
        try {
            List<General> list = generalService.getList();
            return ResultInfo.success("获取成功", list);
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
    public ResultInfo add(@RequestBody HashMap map, HttpSession session,String idd) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("账号管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            UserInfo userInfo2 = GsonUtil.toEntity(gsonUtil.get("addInfo"), UserInfo.class);
            userInfo2 = userInfoService.add(userInfo2);
            List<UserInfo> getListid = userInfoService.getListid();

            for(int i=0;i<17;i++){
                UserPower userPower=new UserPower();
                userPower.setUserId(getListid.get(0).getId());
                userPower.setZeng("");
                userPower.setShan("");
                userPower.setGai("");
                userPower.setCha("");
                if(i==0){
                    userPower.setViewName("常规设置");
                }else if(i==1){
                    userPower.setViewName("产品设置");
                }else if(i==2){
                    userPower.setViewName("客户信息");
                }else if(i==3){
                    userPower.setViewName("化验明细");
                }else if(i==4){
                    userPower.setViewName("入库");
                }else if(i==5){
                    userPower.setViewName("销售");
                }else if(i==6){
                    userPower.setViewName("库存");
                }else if(i==7){
                    userPower.setViewName("收付款明细");
                }else if(i==8){
                    userPower.setViewName("发票");
                }else if(i==9){
                    userPower.setViewName("客户往来款看板");
                }else if(i==10){
                    userPower.setViewName("销售额统计");
                }else if(i==11){
                    userPower.setViewName("按月统计");
                }else if(i==12){
                    userPower.setViewName("账号管理");
                }else if(i==13){
                    userPower.setViewName("权限管理");
                }else if(i==14){
                    userPower.setViewName("审核管理");
                }else if(i==15){
                    userPower.setViewName("出库");
                }else if(i==16){
                    userPower.setViewName("打印设置");
                }
                userPowerService.add(userPower);
            }
            return ResultInfo.success("添加成功");
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
    @RequestMapping("/useradd")
    public ResultInfo useradd( HttpSession session, String add_username, String add_password, String add_name, String add_department) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("账号管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }
        try {
            if(userInfoService.useradd(add_username,add_password,add_name,add_department)) {
                return ResultInfo.success("添加成功");
            }else{
                return ResultInfo.error("添加失败");
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
    public ResultInfo update(@RequestBody String updateJson,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("账号管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        UserInfo userInfo2 = null;
        try {
            userInfo2 = DecodeUtil.decodeToJson(updateJson, UserInfo.class);
            if (userInfoService.update(userInfo2)) {
                return ResultInfo.success("修改成功", userInfo2);
            } else {
                return ResultInfo.success("修改失败", userInfo2);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", userInfo);
            return ResultInfo.error("修改失败");
        }
    }

    /**
     * 删除
     *
     * @param map
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isDelete("账号管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);

        try {
            for(int i=0; i<idList.size(); i++){
                int this_id = idList.get(i);
                userPowerService.delete(this_id);
            }
            if (userInfoService.delete(idList)) {
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

}