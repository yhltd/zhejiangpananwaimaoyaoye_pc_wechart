package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Ruku;
import com.example.demo.mapper.RukuMapper;
import com.example.demo.service.RukuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/30 16:02
 */
@Service
public class RukuImpl extends ServiceImpl<RukuMapper, Ruku> implements RukuService {
    @Autowired
    RukuMapper rukuMapper;

    @Override
    public List<Ruku> getList(String staff, String power) {
        if (power.equals("管理员")) {
            return rukuMapper.getList();
        } else {
            return rukuMapper.getListByName(staff);
        }
    }

    @Override
    public List<Ruku> queryList(String ks, String js, String product, String staff, String power) {
        if (power.equals("管理员")) {
            return rukuMapper.queryList(ks, js, product);
        } else {
            return rukuMapper.queryListByName(ks, js, product, staff);
        }
    }

    @Override
    public Ruku add(Ruku ruku) {
        return save(ruku) ? ruku : null;
    }

    @Override
    public boolean update(Ruku ruku) {
        return updateById(ruku);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public boolean updateState(String state, int id) {
        return rukuMapper.updateState(state, id);
    }
}
