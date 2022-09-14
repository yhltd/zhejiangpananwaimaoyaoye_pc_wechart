package com.example.demo.controller;

import com.example.demo.entity.Assay;
import com.example.demo.entity.CustomerKanBan;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.CustomerKanBanService;
import com.example.demo.util.GsonUtil;
import com.example.demo.util.PowerUtil;
import com.example.demo.util.ResultInfo;
import com.example.demo.util.SessionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 10:11
 */
@Slf4j
@RestController
@RequestMapping("/kanban")
public class CustomerKanBanController {
    @Autowired
    CustomerKanBanService customerKanBanService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(int customerId, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("客户往来款看板") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<CustomerKanBan> list = new ArrayList<>();
            List<CustomerKanBan> sale = customerKanBanService.getSale(customerId);
            List<CustomerKanBan> payment = customerKanBanService.getPayment(customerId);
            List<CustomerKanBan> wqye = customerKanBanService.getWQYE(customerId);
            List<CustomerKanBan> invoice = customerKanBanService.getInvoice(customerId);

            CustomerKanBan customerKanBan = new CustomerKanBan();
            customerKanBan.setXs("销售");
            customerKanBan.setZs("赠送");
            if (sale.size() > 0) {
                customerKanBan.setBqgh(sale.get(0).getBqgh());
                customerKanBan.setBqth(sale.get(0).getBqth());
            }
            if(payment.size()>0){
                customerKanBan.setYf(payment.get(0).getYf());
                customerKanBan.setFkjine(payment.get(0).getFkjine());
                customerKanBan.setZhekou(payment.get(0).getZhekou());
                customerKanBan.setBqzs(payment.get(0).getBqzs());
            }
            if(wqye.size()>0){
                customerKanBan.setXswqye(wqye.get(0).getXswqye());
                customerKanBan.setZswqye(wqye.get(0).getZswqye());
            }
            if(invoice.size()>0){
                customerKanBan.setKpjine(invoice.get(0).getKpjine());
            }
            customerKanBan.setXsyue(customerKanBan.getXswqye()-customerKanBan.getBqgh()+customerKanBan.getBqth()+customerKanBan.getYf()+customerKanBan.getZhekou()- customerKanBan.getFkjine());
            customerKanBan.setZsyue(customerKanBan.getZswqye()+customerKanBan.getBqzs());
            list.add(customerKanBan);
            return ResultInfo.success("获取成功", list);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }
}
