package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.CustomerKanBan;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 10:07
 */
@Service
public interface CustomerKanBanService extends IService<CustomerKanBan> {

    List<CustomerKanBan> getSale(int customerId);

    List<CustomerKanBan> getPayment(int customerId);

    List<CustomerKanBan> getWQYE(int customerId);

    List<CustomerKanBan> getInvoice(int customerId);

}
