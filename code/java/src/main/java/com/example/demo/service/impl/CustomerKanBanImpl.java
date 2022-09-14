package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.CustomerKanBan;
import com.example.demo.mapper.CustomerKanBanMapper;
import com.example.demo.service.CustomerKanBanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 10:08
 */
@Service
public class CustomerKanBanImpl extends ServiceImpl<CustomerKanBanMapper, CustomerKanBan> implements CustomerKanBanService {
    @Autowired
    CustomerKanBanMapper customerKanBanMapper;

    @Override
    public List<CustomerKanBan> getSale(int customerId) {
        return customerKanBanMapper.getSale(customerId);
    }

    @Override
    public List<CustomerKanBan> getPayment(int customerId) {
        return customerKanBanMapper.getPayment(customerId);
    }

    @Override
    public List<CustomerKanBan> getWQYE(int customerId) {
        return customerKanBanMapper.getWQYE(customerId);
    }

    @Override
    public List<CustomerKanBan> getInvoice(int customerId) {
        return customerKanBanMapper.getInvoice(customerId);
    }
}
