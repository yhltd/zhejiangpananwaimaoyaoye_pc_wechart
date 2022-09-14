package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.General;
import com.example.demo.mapper.GeneralMapper;
import com.example.demo.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/19 14:48
 */
@Service
public class GeneralImpl extends ServiceImpl<GeneralMapper, General> implements GeneralService {
    @Autowired
    GeneralMapper generalMapper;

    @Override
    public List<General> getList() {
        return generalMapper.getList();
    }

    @Override
    public General add(General general) {
        return save(general) ? general : null;
    }

    @Override
    public boolean update(General general) {
        return updateById(general);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
