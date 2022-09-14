package com.example.demo.controller;

import com.example.demo.entity.Payment;
import com.example.demo.entity.Product;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.KuCunService;
import com.example.demo.service.PaymentService;
import com.example.demo.util.GsonUtil;
import com.example.demo.util.PowerUtil;
import com.example.demo.util.ResultInfo;
import com.example.demo.util.SessionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import javax.websocket.Session;
import java.util.List;

/**
 * @author hui
 * @date 2022/8/31 17:17
 */
@Slf4j
@RestController
@RequestMapping("/kucun")
public class KuCunController {
    @Autowired
    KuCunService kuCunService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("库存") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Product> getRuku = kuCunService.getRuku();
            List<Product> getSale = kuCunService.getSale();


            for(int i=0;i<getRuku.size();i++){
                for(int j=0;j<getSale.size();j++){
                    if(getRuku.get(i).getId()==getSale.get(j).getId()){
                        getRuku.get(i).setNum(getRuku.get(i).getNum()-getSale.get(j).getNum());
                    }
                }
            }
            return ResultInfo.success("获取成功", getRuku);
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
    public ResultInfo queryList(String ks,String js,String product,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("库存") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        if(ks.equals("")){
            ks="1900/1/1";
        }
        if(js.equals("")){
            js="2200/1/1";
        }

        try {
            List<Product> getRuku = kuCunService.queryRuku(ks,js,product);
            List<Product> getSale = kuCunService.querySale(ks,js,product);

            for(int i=0;i<getRuku.size();i++){
                for(int j=0;j<getSale.size();j++){
                    if(getRuku.get(i).getId()==getSale.get(j).getId()){
                        getRuku.get(i).setNum(getRuku.get(i).getNum()-getSale.get(j).getNum());
                    }
                }
            }
            return ResultInfo.success("获取成功", getRuku);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


}
