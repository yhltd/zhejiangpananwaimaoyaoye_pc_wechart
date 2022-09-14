package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Assay;
import com.example.demo.mapper.AssayMapper;
import com.example.demo.service.AssayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/29 16:53
 */
@Service
public class AssayImpl extends ServiceImpl<AssayMapper, Assay> implements AssayService {
    @Autowired
    AssayMapper assayMapper;

    @Override
    public List<Assay> getList() {
        return assayMapper.getList();
    }

    @Override
    public List<Assay> queryList(String pihao) {
        return assayMapper.queryList(pihao);
    }

    @Override
    public Assay add(Assay assay) {
        return save(assay) ? assay : null;
    }

    @Override
    public boolean update(Assay assay) {
        return updateById(assay);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
