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
import java.util.ArrayList;
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
            List<Product> kuCun = new ArrayList<>();

            for(int i=0;i<getRuku.size();i++){
                boolean panduan = false;
                Product product = new Product();
                for(int j=0;j<kuCun.size();j++){
                    if(getRuku.get(i).getId()==kuCun.get(j).getId() && getRuku.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse()) && getRuku.get(i).getPihao().equals(kuCun.get(j).getPihao())){
                        panduan = true;
                    }
                }
                if(panduan != true){
                    product.setId(getRuku.get(i).getId());
                    product.setWarehouse(getRuku.get(i).getWarehouse());
                    product.setPihao(getRuku.get(i).getPihao());
                    product.setSpec(getRuku.get(i).getSpec());
                    product.setUnit(getRuku.get(i).getUnit());
                    product.setPrice(getRuku.get(i).getPrice());
                    product.setPinyin(getRuku.get(i).getPinyin());
                    product.setProductName(getRuku.get(i).getProductName());
                    product.setPinhao(getRuku.get(i).getPinhao());
                    product.setAttribute(getRuku.get(i).getAttribute());
                    product.setProductName(getRuku.get(i).getProductName());
                    product.setNum(0);
                    kuCun.add(product);
                }

            }

            for(int i=0;i<getSale.size();i++){
                boolean panduan = false;
                Product product = new Product();
                for(int j=0;j<kuCun.size();j++){
                    if(getSale.get(i).getId()==kuCun.get(j).getId() && getSale.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse()) && getSale.get(i).getPihao().equals(kuCun.get(j).getPihao())){
                        panduan = true;
                    }
                }
                if(panduan != true){
                    product.setId(getSale.get(i).getId());
                    product.setWarehouse(getSale.get(i).getWarehouse());
                    product.setPihao(getSale.get(i).getPihao());
                    product.setSpec(getSale.get(i).getSpec());
                    product.setUnit(getSale.get(i).getUnit());
                    product.setPrice(getSale.get(i).getPrice());
                    product.setPinyin(getSale.get(i).getPinyin());
                    product.setProductName(getSale.get(i).getProductName());
                    product.setPinhao(getRuku.get(i).getPinhao());
                    product.setAttribute(getRuku.get(i).getAttribute());
                    product.setNum(0);
                    kuCun.add(product);
                }

            }

            for(int i=0;i<kuCun.size();i++){
                for(int j=0;j<getRuku.size();j++){
                    if(kuCun.get(i).getId()==getRuku.get(j).getId() && kuCun.get(i).getWarehouse().equals(getRuku.get(j).getWarehouse()) && kuCun.get(i).getPihao().equals(getRuku.get(j).getPihao())){
                        kuCun.get(i).setNum(kuCun.get(i).getNum()+getRuku.get(j).getNum());
                    }
                }
            }

            for(int i=0;i<kuCun.size();i++){
                for(int j=0;j<getSale.size();j++){
                    if(kuCun.get(i).getId()==getSale.get(j).getId() && kuCun.get(i).getWarehouse().equals(getSale.get(j).getWarehouse()) && kuCun.get(i).getPihao().equals(getSale.get(j).getPihao())){
                        kuCun.get(i).setNum(kuCun.get(i).getNum()-getSale.get(j).getNum());
                    }
                }
            }

            return ResultInfo.success("获取成功", kuCun);
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
    public ResultInfo queryList(String warehouse,String pihao,String product,HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("库存") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Product> getRuku = kuCunService.queryRuku(warehouse,pihao,product);
            List<Product> getSale = kuCunService.querySale(warehouse,pihao,product);

            List<Product> kuCun = new ArrayList<>();

            for(int i=0;i<getRuku.size();i++){
                boolean panduan = false;
                Product productItem = new Product();
                for(int j=0;j<kuCun.size();j++){
                    if(getRuku.get(i).getId()==kuCun.get(j).getId() && getRuku.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse()) && getRuku.get(i).getPihao().equals(kuCun.get(j).getPihao())){
                        panduan = true;
                    }
                }
                if(panduan != true){
                    productItem.setId(getRuku.get(i).getId());
                    productItem.setWarehouse(getRuku.get(i).getWarehouse());
                    productItem.setPihao(getRuku.get(i).getPihao());
                    productItem.setSpec(getRuku.get(i).getSpec());
                    productItem.setUnit(getRuku.get(i).getUnit());
                    productItem.setPrice(getRuku.get(i).getPrice());
                    productItem.setPinyin(getRuku.get(i).getPinyin());
                    productItem.setProductName(getRuku.get(i).getProductName());
                    productItem.setPinhao(getRuku.get(i).getPinhao());
                    productItem.setAttribute(getRuku.get(i).getAttribute());
                    productItem.setProductName(getRuku.get(i).getProductName());
                    productItem.setNum(0);
                    kuCun.add(productItem);
                }

            }

            for(int i=0;i<getSale.size();i++){
                boolean panduan = false;
                Product productItem = new Product();
                for(int j=0;j<kuCun.size();j++){
                    if(getSale.get(i).getId()==kuCun.get(j).getId() && getSale.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse()) && getSale.get(i).getPihao().equals(kuCun.get(j).getPihao())){
                        panduan = true;
                    }
                }
                if(panduan != true){
                    productItem.setId(getSale.get(i).getId());
                    productItem.setWarehouse(getSale.get(i).getWarehouse());
                    productItem.setPihao(getSale.get(i).getPihao());
                    productItem.setSpec(getSale.get(i).getSpec());
                    productItem.setUnit(getSale.get(i).getUnit());
                    productItem.setPrice(getSale.get(i).getPrice());
                    productItem.setPinyin(getSale.get(i).getPinyin());
                    productItem.setProductName(getSale.get(i).getProductName());
                    productItem.setPinhao(getRuku.get(i).getPinhao());
                    productItem.setAttribute(getRuku.get(i).getAttribute());
                    productItem.setNum(0);
                    kuCun.add(productItem);
                }

            }

            for(int i=0;i<kuCun.size();i++){
                for(int j=0;j<getRuku.size();j++){
                    if(getRuku.get(i).getId()==kuCun.get(j).getId() && getRuku.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse()) && getRuku.get(i).getPihao().equals(kuCun.get(j).getPihao())){
                        kuCun.get(i).setNum(kuCun.get(i).getNum()+getRuku.get(j).getNum());
                    }
                }
            }

            for(int i=0;i<kuCun.size();i++){
                for(int j=0;j<getSale.size();j++){
                    if(getSale.get(i).getId()==kuCun.get(j).getId() && getSale.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse()) && getSale.get(i).getPihao().equals(kuCun.get(j).getPihao())){
                        kuCun.get(i).setNum(kuCun.get(i).getNum()-getSale.get(j).getNum());
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
    @RequestMapping("/getKuCun")
    public ResultInfo getKuCun(HttpSession session) {
        try {
            List<Product> getRuku = kuCunService.getRuku();
            List<Product> getSale = kuCunService.getSale();
            List<Product> kuCun = new ArrayList<>();

            for(int i=0;i<getRuku.size();i++){
                boolean panduan = false;
                Product product = new Product();
                for(int j=0;j<kuCun.size();j++){
                    if(getRuku.get(i).getId()==kuCun.get(j).getId() && getRuku.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse())){
                        panduan = true;
                    }
                }
                if(panduan != true){
                    product.setId(getRuku.get(i).getId());
                    product.setWarehouse(getRuku.get(i).getWarehouse());
                    product.setPihao(getRuku.get(i).getPihao());
                    product.setSpec(getRuku.get(i).getSpec());
                    product.setPihao(getRuku.get(i).getPihao());
                    product.setAttribute(getRuku.get(i).getAttribute());
                    product.setUnit(getRuku.get(i).getUnit());
                    product.setPrice(getRuku.get(i).getPrice());
                    product.setPinyin(getRuku.get(i).getPinyin());
                    product.setProductName(getRuku.get(i).getProductName());
                    product.setNum(0);
                    kuCun.add(product);
                }

            }

            for(int i=0;i<getSale.size();i++){
                boolean panduan = false;
                Product product = new Product();
                for(int j=0;j<kuCun.size();j++){
                    if(getSale.get(i).getId()==kuCun.get(j).getId() && getSale.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse())){
                        panduan = true;
                    }
                }
                if(panduan != true){
                    product.setId(getSale.get(i).getId());
                    product.setWarehouse(getSale.get(i).getWarehouse());
                    product.setPihao(getSale.get(i).getPihao());
                    product.setSpec(getSale.get(i).getSpec());
                    product.setPihao(getSale.get(i).getPihao());
                    product.setAttribute(getSale.get(i).getAttribute());
                    product.setUnit(getSale.get(i).getUnit());
                    product.setPrice(getSale.get(i).getPrice());
                    product.setPinyin(getSale.get(i).getPinyin());
                    product.setProductName(getSale.get(i).getProductName());
                    product.setNum(0);
                    kuCun.add(product);
                }

            }

            for(int i=0;i<kuCun.size();i++){
                for(int j=0;j<getRuku.size();j++){
                    if(kuCun.get(i).getId()==getRuku.get(j).getId() && kuCun.get(i).getWarehouse().equals(getRuku.get(j).getWarehouse())){
                        kuCun.get(i).setNum(kuCun.get(i).getNum()+getRuku.get(j).getNum());
                    }
                }
            }

            for(int i=0;i<kuCun.size();i++){
                for(int j=0;j<getSale.size();j++){
                    if(kuCun.get(i).getId()==getSale.get(j).getId() && kuCun.get(i).getWarehouse().equals(getSale.get(j).getWarehouse())){
                        kuCun.get(i).setNum(kuCun.get(i).getNum()-getSale.get(j).getNum());
                    }
                }
            }

            return ResultInfo.success("获取成功", kuCun);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


}
