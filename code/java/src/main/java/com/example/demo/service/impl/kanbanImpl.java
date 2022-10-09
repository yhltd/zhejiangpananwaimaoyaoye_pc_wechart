package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.kanban;
import com.example.demo.mapper.kanbanMapper;
import com.example.demo.service.kanbanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class kanbanImpl extends ServiceImpl<kanbanMapper, kanban> implements kanbanService {

    @Autowired
    kanbanMapper kanbanMapper;

    @Override
    public List<kanban> getRuku(String name, String power) {
        if (power.equals("管理员")) {
            return kanbanMapper.getRuku();
        } else {
            return kanbanMapper.getRukuByName(name);
        }
    }



    @Override
    public List<kanban> getSale(String name, String power) {
        if (power.equals("管理员")) {
            return kanbanMapper.getSale();
        } else {
            return kanbanMapper.getSaleByName(name);
        }
    }

    @Override
    public List<kanban> getChuku(String name, String power) {
        if (power.equals("管理员")) {
            return kanbanMapper.getChuku();
        } else {
            return kanbanMapper.getChukuByName(name);
        }
    }
}
