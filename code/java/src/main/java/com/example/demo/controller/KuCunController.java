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
            List<Product> getSaleNum = kuCunService.getSale();
            List<Product> kuCun = new ArrayList<>();

            for (int i = 0; i < getRuku.size(); i++) {
                boolean panduan = false;
                Product product = new Product();
                for (int j = 0; j < kuCun.size(); j++) {
                    if (getRuku.get(i).getId().equals(kuCun.get(j).getId()) && getRuku.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse()) && getRuku.get(i).getPihao().equals(kuCun.get(j).getPihao())) {
                        panduan = true;
                    }
                }
                if (!panduan) {
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
                    product.setNumsum(0);
                    kuCun.add(product);
                }

            }

            for (int i = 0; i < kuCun.size(); i++) {
                for (int j = 0; j < getRuku.size(); j++) {
                    if (kuCun.get(i).getId().equals(getRuku.get(j).getId()) && kuCun.get(i).getWarehouse().equals(getRuku.get(j).getWarehouse()) && kuCun.get(i).getPihao().equals(getRuku.get(j).getPihao())) {
                        kuCun.get(i).setNum(kuCun.get(i).getNum() + getRuku.get(j).getNum());
                    }
                    if (kuCun.get(i).getId().equals(getRuku.get(j).getId()) && kuCun.get(i).getWarehouse().equals(getRuku.get(j).getWarehouse())){
                        kuCun.get(i).setNumsum(kuCun.get(i).getNumsum() + getRuku.get(j).getNum());
                    }
                }
            }

            for (int i = 0; i < kuCun.size(); i++) {
                for (int j = 0; j < getSale.size(); j++) {
                    if (kuCun.get(i).getId().equals(getSale.get(j).getId()) && kuCun.get(i).getWarehouse().equals(getSale.get(j).getWarehouse())) {
                        kuCun.get(i).setNumsum(kuCun.get(i).getNumsum() - getSaleNum.get(j).getNum());
                        if(getSale.get(j).getNum() > 0 && kuCun.get(i).getNum() >= getSale.get(j).getNum()){
                            kuCun.get(i).setNum(kuCun.get(i).getNum() - getSale.get(j).getNum());
                            getSale.get(j).setNum(0);
                        }else if(getSale.get(j).getNum() > 0 && kuCun.get(i).getNum() < getSale.get(j).getNum()){
                            getSale.get(j).setNum(getSale.get(j).getNum() - kuCun.get(i).getNum());
                            kuCun.get(i).setNum(0);
                        }
                    }
                }
            }

            List<Product> new_kucun = new ArrayList<>();
            for (Product kucun : kuCun) {
                if (kucun.getNum() != 0) {
                    new_kucun.add(kucun);
                }
            }

            return ResultInfo.success("获取成功", new_kucun);
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
    public ResultInfo queryList(String warehouse, String pihao, String product, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("库存") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Product> getRuku = kuCunService.getRuku();
            List<Product> getSale = kuCunService.getSale();
            List<Product> getSaleNum = kuCunService.getSale();
            List<Product> kuCun = new ArrayList<>();

            for (int i = 0; i < getRuku.size(); i++) {
                boolean panduan = false;
                Product product1 = new Product();
                for (int j = 0; j < kuCun.size(); j++) {
                    if (getRuku.get(i).getId().equals(kuCun.get(j).getId()) && getRuku.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse()) && getRuku.get(i).getPihao().equals(kuCun.get(j).getPihao())) {
                        panduan = true;
                    }
                }
                if (!panduan) {
                    product1.setId(getRuku.get(i).getId());
                    product1.setWarehouse(getRuku.get(i).getWarehouse());
                    product1.setPihao(getRuku.get(i).getPihao());
                    product1.setSpec(getRuku.get(i).getSpec());
                    product1.setUnit(getRuku.get(i).getUnit());
                    product1.setPrice(getRuku.get(i).getPrice());
                    product1.setPinyin(getRuku.get(i).getPinyin());
                    product1.setProductName(getRuku.get(i).getProductName());
                    product1.setPinhao(getRuku.get(i).getPinhao());
                    product1.setAttribute(getRuku.get(i).getAttribute());
                    product1.setProductName(getRuku.get(i).getProductName());
                    product1.setNum(0);
                    product1.setNumsum(0);
                    kuCun.add(product1);
                }

            }

            for (int i = 0; i < kuCun.size(); i++) {
                for (int j = 0; j < getRuku.size(); j++) {
                    if (kuCun.get(i).getId().equals(getRuku.get(j).getId()) && kuCun.get(i).getWarehouse().equals(getRuku.get(j).getWarehouse()) && kuCun.get(i).getPihao().equals(getRuku.get(j).getPihao())) {
                        kuCun.get(i).setNum(kuCun.get(i).getNum() + getRuku.get(j).getNum());
                    }
                    if (kuCun.get(i).getId().equals(getRuku.get(j).getId()) && kuCun.get(i).getWarehouse().equals(getRuku.get(j).getWarehouse())){
                        kuCun.get(i).setNumsum(kuCun.get(i).getNumsum() + getRuku.get(j).getNum());
                    }
                }
            }

            for (int i = 0; i < kuCun.size(); i++) {
                for (int j = 0; j < getSale.size(); j++) {
                    if (kuCun.get(i).getId().equals(getSale.get(j).getId()) && kuCun.get(i).getWarehouse().equals(getSale.get(j).getWarehouse())) {
                        kuCun.get(i).setNumsum(kuCun.get(i).getNumsum() - getSaleNum.get(j).getNum());
                        if(getSale.get(j).getNum() > 0 && kuCun.get(i).getNum() >= getSale.get(j).getNum()){
                            kuCun.get(i).setNum(kuCun.get(i).getNum() - getSale.get(j).getNum());
                            getSale.get(j).setNum(0);
                        }else if(getSale.get(j).getNum() > 0 && kuCun.get(i).getNum() < getSale.get(j).getNum()){
                            getSale.get(j).setNum(getSale.get(j).getNum() - kuCun.get(i).getNum());
                            kuCun.get(i).setNum(0);
                        }
                    }
                }
            }

            List<Product> new_kucun = new ArrayList<>();
            for (Product kucun : kuCun) {
                if (kucun.getNum() != 0) {
                    boolean panduan = true;
                    if(!warehouse.equals("")){
                        if(kucun.getWarehouse().indexOf(warehouse) == -1){
                            panduan = false;
                        }
                    }
                    if(!pihao.equals("")){
                        if(kucun.getPihao().indexOf(pihao) == -1){
                            panduan = false;
                        }
                    }
                    if(!product.equals("")){
                        if(kucun.getProductName().indexOf(product) == -1){
                            panduan = false;
                        }
                    }
                    if(panduan){
                        new_kucun.add(kucun);
                    }
                }
            }

            return ResultInfo.success("获取成功", new_kucun);
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
            List<Product> getSaleNum = kuCunService.getSale();
            List<Product> kuCun = new ArrayList<>();

            for (int i = 0; i < getRuku.size(); i++) {
                boolean panduan = false;
                Product product = new Product();
                for (int j = 0; j < kuCun.size(); j++) {
                    if (getRuku.get(i).getId().equals(kuCun.get(j).getId()) && getRuku.get(i).getWarehouse().equals(kuCun.get(j).getWarehouse()) && getRuku.get(i).getPihao().equals(kuCun.get(j).getPihao())) {
                        panduan = true;
                    }
                }
                if (panduan != true) {
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

            for (int i = 0; i < kuCun.size(); i++) {
                for (int j = 0; j < getRuku.size(); j++) {
                    if (kuCun.get(i).getId().equals(getRuku.get(j).getId()) && kuCun.get(i).getWarehouse().equals(getRuku.get(j).getWarehouse()) && kuCun.get(i).getPihao().equals(getRuku.get(j).getPihao())) {
                        kuCun.get(i).setNum(kuCun.get(i).getNum() + getRuku.get(j).getNum());
                    }
                    if (kuCun.get(i).getId().equals(getRuku.get(j).getId()) && kuCun.get(i).getWarehouse().equals(getRuku.get(j).getWarehouse())){
                        kuCun.get(i).setNumsum(kuCun.get(i).getNumsum() + getRuku.get(j).getNum());
                    }
                }
            }

            for (int i = 0; i < kuCun.size(); i++) {
                for (int j = 0; j < getSale.size(); j++) {
                    if (kuCun.get(i).getId().equals(getSale.get(j).getId()) && kuCun.get(i).getWarehouse().equals(getSale.get(j).getWarehouse())) {
                        kuCun.get(i).setNumsum(kuCun.get(i).getNumsum() - getSaleNum.get(j).getNum());
                        if(getSale.get(j).getNum() > 0 && kuCun.get(i).getNum() >= getSale.get(j).getNum()){
                            kuCun.get(i).setNum(kuCun.get(i).getNum() - getSale.get(j).getNum());
                            getSale.get(j).setNum(0);
                        }else if(getSale.get(j).getNum() > 0 && kuCun.get(i).getNum() < getSale.get(j).getNum()){
                            getSale.get(j).setNum(getSale.get(j).getNum() - kuCun.get(i).getNum());
                            kuCun.get(i).setNum(0);
                        }
                    }
                }
            }

            List<Product> new_kucun = new ArrayList<>();
            for (Product kucun : kuCun) {
                if (kucun.getNum() != 0) {
                    new_kucun.add(kucun);
                }
            }


            return ResultInfo.success("获取成功", new_kucun);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }


}
