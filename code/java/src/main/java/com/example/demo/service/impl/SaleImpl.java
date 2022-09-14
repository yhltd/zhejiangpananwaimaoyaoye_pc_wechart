package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Sale;
import com.example.demo.mapper.SaleMapper;
import com.example.demo.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/31 11:30
 */
@Service
public class SaleImpl extends ServiceImpl<SaleMapper, Sale> implements SaleService {
    @Autowired
    SaleMapper saleMapper;

    @Override
    public List<Sale> getList(String name, String power) {
        if (power.equals("管理员")) {
            return saleMapper.getList();
        } else {
            return saleMapper.getListByName(name);
        }
    }

    @Override
    public List<Sale> queryList(String ks, String js, String customer, String product, String pihao, String name, String power) {
        if (power.equals("管理员")) {
            return saleMapper.queryList(ks, js, customer, product, pihao);
        } else {
            return saleMapper.queryListByName(ks, js, customer, product, pihao, name);
        }
    }

    @Override
    public Sale add(Sale sale) {
        return save(sale) ? sale : null;
    }

    @Override
    public boolean update(Sale sale) {
        return updateById(sale);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
