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
        if (power.equals("管理员") || power.equals("审核人")) {
            return saleMapper.getList();
        } else {
            return saleMapper.getListByName(name);
        }
    }

    @Override
    public List<Sale> getList_kanban(String riqi,String customer,String salesman,String type) {
        return saleMapper.getList_kanban(riqi,customer,salesman,type);
    }

    @Override
    public List<Sale> getKanban(String riqi,String riqi1, String riqi2,String name,String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return saleMapper.getKanban(riqi);
        } else {
            return saleMapper.getKanbanByName(riqi1,riqi2,name);
        }
    }

    @Override
    public List<Sale> getList_shenhezhong(String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return saleMapper.getList_shenhezhong();
        } else {
            return saleMapper.getListByName_shenhezhong(name);
        }
    }

    @Override
    public List<Sale> getList_tongguo(String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return saleMapper.getList_tongguo();
        } else {
            return saleMapper.getListByName_tongguo(name);
        }
    }

    @Override
    public List<Sale> getList_weitongguo(String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return saleMapper.getList_weitongguo();
        } else {
            return saleMapper.getListByName_weitongguo(name);
        }
    }

    @Override
    public List<Sale> queryList(String ks, String js, String customer, String product, String pihao, String saleType, String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return saleMapper.queryList(ks, js, customer, product, pihao,saleType);
        } else {
            return saleMapper.queryListByName(ks, js, customer, product, pihao,saleType, name);
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

    @Override
    public boolean updateSaleState(String saleState,String warehouse, int id) {
        return saleMapper.updateSaleState(saleState,warehouse, id);
    }
}
