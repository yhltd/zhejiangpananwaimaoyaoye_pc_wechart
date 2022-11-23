package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Invoice;
import com.example.demo.mapper.InvoiceMapper;
import com.example.demo.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/23 15:06
 */
@Service
public class InvoiceImpl extends ServiceImpl<InvoiceMapper, Invoice> implements InvoiceService {
    @Autowired
    InvoiceMapper invoiceMapper;

    @Override
    public List<Invoice> getList(String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return invoiceMapper.getList();
        } else {
            return invoiceMapper.getListByName(name);
        }
    }

    @Override
    public List<Invoice> getListlist() {return invoiceMapper.getListlist(); }

    @Override
    public List<Invoice> queryList(String customer, String unit,String unit1, String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return invoiceMapper.queryList(customer, unit, unit1);
        } else {
            return invoiceMapper.queryListByName(customer, unit,unit1, name);
        }
    }

    @Override
    public Invoice add(Invoice invoice) {
        return save(invoice) ? invoice : null;
    }

    @Override
    public boolean update(Invoice invoice) {
        return updateById(invoice);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public boolean updateState(String state, int id) {
        return invoiceMapper.updateState(state, id);
    }
}
