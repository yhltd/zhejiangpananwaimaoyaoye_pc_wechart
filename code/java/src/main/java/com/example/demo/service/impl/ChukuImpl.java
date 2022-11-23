package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Sale;
import com.example.demo.mapper.ChukuMapper;
import com.example.demo.service.ChukuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChukuImpl extends ServiceImpl<ChukuMapper, Sale> implements ChukuService {

    @Autowired
    ChukuMapper chukuMapper;

    @Override
    public List<Sale> getList(String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return chukuMapper.getList();
        } else {
            return chukuMapper.getListByName(name);
        }
    }

    @Override
    public List<Sale> getList_kanban(String riqi,String customer,String salesman,String type) {
        return chukuMapper.getList_kanban(riqi,customer,salesman,type);
    }

    @Override
    public List<Sale> getList_shenhezhong(String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return chukuMapper.getList_shenhezhong();
        } else {
            return chukuMapper.getListByName_shenhezhong(name);
        }
    }

    @Override
    public List<Sale> getList_tongguo(String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return chukuMapper.getList_tongguo();
        } else {
            return chukuMapper.getListByName_tongguo(name);
        }
    }

    @Override
    public List<Sale> getList_weitongguo(String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return chukuMapper.getList_weitongguo();
        } else {
            return chukuMapper.getListByName_weitongguo(name);
        }
    }

    @Override
    public List<Sale> queryList(String ks, String js, String customer, String product, String pihao, String saleType, String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return chukuMapper.queryList(ks, js, customer, product, pihao, saleType);
        } else {
            return chukuMapper.queryListByName(ks, js, customer, product, pihao, saleType, name);
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
    public boolean updateChukuState(String saleState, int id) {
        return chukuMapper.updateChukuState(saleState, id);
    }

    @Override
    public boolean updateFahuo(int id,String pihao,String express,String wuliuOrder) {
        return chukuMapper.updateFahuo(id, pihao,express,wuliuOrder);
    }

    @Override
    public List<Sale> getListByIdRiqi(int id, String riqi) {
        return chukuMapper.getListByIdRiqi(id, riqi);
    }
}
