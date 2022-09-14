package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.AnYueTongJiService;
import com.example.demo.service.CustomerInfoService;
import com.example.demo.service.TongJiService;
import com.example.demo.util.GsonUtil;
import com.example.demo.util.PowerUtil;
import com.example.demo.util.ResultInfo;
import com.example.demo.util.SessionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 13:58
 */
@Slf4j
@RestController
@RequestMapping("/tongji")
public class TongJiController {
    @Autowired
    TongJiService tongJiService;
    @Autowired
    CustomerInfoService customerInfoService;
    @Autowired
    AnYueTongJiService anYueTongJiService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(String nian, String customer, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("销售额统计") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        if(nian.equals("")){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
            Date date = new Date();
            nian=sdf.format(date);
        }
        String ks=nian+"/1/1";
        String js=nian+"/12/31";
        try {
            List<TongJi> getList = tongJiService.getList(ks, js, customer, userInfo.getName(), userInfo.getPower());
            List<CustomerInfo> clist=customerInfoService.getList(userInfo.getName(), userInfo.getPower());

            for (TongJi tongJi : getList) {
                for (CustomerInfo customerInfo : clist) {
                    if (tongJi.getId().equals(customerInfo.getId())) {
                        tongJi.setXswqye(customerInfo.getGhye());
                        tongJi.setZswqye(customerInfo.getZsye());
                    }
                }
                if (tongJi.getXswqye() == null || tongJi.getXswqye().equals("")) {
                    tongJi.setYue(0 - tongJi.getXs() + tongJi.getTh() - tongJi.getFankuan() + tongJi.getFukuan() + tongJi.getZhekou());
                } else {
                    tongJi.setYue(Double.parseDouble(tongJi.getXswqye()) - tongJi.getXs() + tongJi.getTh() - tongJi.getFankuan() + tongJi.getFukuan() + tongJi.getZhekou());
                }
            }
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    @RequestMapping("/getList2")
    public ResultInfo getList2(String nian,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("按月统计") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            if(nian.equals("")){
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
                Date date = new Date();
                nian=sdf.format(date);
            }
            String ks1=nian+"/1/1";
            String js1=nian+"/1/31";
            String ks2=nian+"/2/1";
            String js2=nian+"/2/28";
            String ks3=nian+"/3/1";
            String js3=nian+"/3/31";
            String ks4=nian+"/4/1";
            String js4=nian+"/4/30";
            String ks5=nian+"/5/1";
            String js5=nian+"/5/31";
            String ks6=nian+"/6/1";
            String js6=nian+"/6/30";
            String ks7=nian+"/7/1";
            String js7=nian+"/7/31";
            String ks8=nian+"/8/1";
            String js8=nian+"/8/31";
            String ks9=nian+"/9/1";
            String js9=nian+"/9/30";
            String ks10=nian+"/10/1";
            String js10=nian+"/10/31";
            String ks11=nian+"/11/1";
            String js11=nian+"/11/30";
            String ks12=nian+"/12/1";
            String js12=nian+"/12/31";

            List<AnYueTongJi> xs=anYueTongJiService.getXS(ks1,js1,ks2,js2,ks3,js3,ks4,js4,ks5,js5,ks6,js6,ks7,js7,ks8,js8,ks9,js9,ks10,js10,ks11,js11,ks12,js12);
            List<AnYueTongJi> th=anYueTongJiService.getTH(ks1,js1,ks2,js2,ks3,js3,ks4,js4,ks5,js5,ks6,js6,ks7,js7,ks8,js8,ks9,js9,ks10,js10,ks11,js11,ks12,js12);
            List<AnYueTongJi> fk=anYueTongJiService.getfk(ks1,js1,ks2,js2,ks3,js3,ks4,js4,ks5,js5,ks6,js6,ks7,js7,ks8,js8,ks9,js9,ks10,js10,ks11,js11,ks12,js12);

            AnYueTongJi anYueTongJi1=new AnYueTongJi();
            AnYueTongJi anYueTongJi2=new AnYueTongJi();
            AnYueTongJi anYueTongJi3=new AnYueTongJi();

            anYueTongJi1.setType("购货金额");
            anYueTongJi2.setType("返款金额");
            anYueTongJi3.setType("退货金额");

            if(xs.size()>0){
                anYueTongJi1.setYue1(xs.get(0).getYue1());
                anYueTongJi1.setYue2(xs.get(0).getYue2());
                anYueTongJi1.setYue3(xs.get(0).getYue3());
                anYueTongJi1.setYue4(xs.get(0).getYue4());
                anYueTongJi1.setYue5(xs.get(0).getYue5());
                anYueTongJi1.setYue6(xs.get(0).getYue6());
                anYueTongJi1.setYue7(xs.get(0).getYue7());
                anYueTongJi1.setYue8(xs.get(0).getYue8());
                anYueTongJi1.setYue9(xs.get(0).getYue9());
                anYueTongJi1.setYue10(xs.get(0).getYue10());
                anYueTongJi1.setYue11(xs.get(0).getYue11());
                anYueTongJi1.setYue11(xs.get(0).getYue12());
            }

            if(fk.size()>0){
                anYueTongJi2.setYue1(fk.get(0).getYue1());
                anYueTongJi2.setYue2(fk.get(0).getYue2());
                anYueTongJi2.setYue3(fk.get(0).getYue3());
                anYueTongJi2.setYue4(fk.get(0).getYue4());
                anYueTongJi2.setYue5(fk.get(0).getYue5());
                anYueTongJi2.setYue6(fk.get(0).getYue6());
                anYueTongJi2.setYue7(fk.get(0).getYue7());
                anYueTongJi2.setYue8(fk.get(0).getYue8());
                anYueTongJi2.setYue9(fk.get(0).getYue9());
                anYueTongJi2.setYue10(fk.get(0).getYue10());
                anYueTongJi2.setYue11(fk.get(0).getYue11());
                anYueTongJi2.setYue11(fk.get(0).getYue12());
            }

            if(th.size()>0){
                anYueTongJi3.setYue1(th.get(0).getYue1());
                anYueTongJi3.setYue2(th.get(0).getYue2());
                anYueTongJi3.setYue3(th.get(0).getYue3());
                anYueTongJi3.setYue4(th.get(0).getYue4());
                anYueTongJi3.setYue5(th.get(0).getYue5());
                anYueTongJi3.setYue6(th.get(0).getYue6());
                anYueTongJi3.setYue7(th.get(0).getYue7());
                anYueTongJi3.setYue8(th.get(0).getYue8());
                anYueTongJi3.setYue9(th.get(0).getYue9());
                anYueTongJi3.setYue10(th.get(0).getYue10());
                anYueTongJi3.setYue11(th.get(0).getYue11());
                anYueTongJi3.setYue11(th.get(0).getYue12());
            }

            List<AnYueTongJi> list=new ArrayList<>();
            list.add(anYueTongJi1);
            list.add(anYueTongJi2);
            list.add(anYueTongJi3);

            return ResultInfo.success("获取成功", list);
        }catch (Exception e){
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }
}
