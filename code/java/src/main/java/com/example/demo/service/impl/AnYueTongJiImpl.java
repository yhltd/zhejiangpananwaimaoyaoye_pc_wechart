package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.AnYueTongJi;
import com.example.demo.mapper.AnYueTongJiMapper;
import com.example.demo.service.AnYueTongJiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 18:05
 */
@Service
public class AnYueTongJiImpl extends ServiceImpl<AnYueTongJiMapper, AnYueTongJi> implements AnYueTongJiService {
    @Autowired
    AnYueTongJiMapper anYueTongJiMapper;


    @Override
    public List<AnYueTongJi> getXSByAdmin(String ks1, String js1, String ks2, String js2, String ks3, String js3, String ks4, String js4, String ks5, String js5, String ks6, String js6, String ks7, String js7, String ks8, String js8, String ks9, String js9, String ks10, String js10, String ks11, String js11, String ks12, String js12, String customer) {
        return anYueTongJiMapper.getXSByAdmin(ks1, js1, ks2, js2, ks3, js3, ks4, js4, ks5, js5, ks6, js6, ks7, js7, ks8, js8, ks9, js9, ks10, js10, ks11, js11, ks12, js12, customer);
    }

    @Override
    public List<AnYueTongJi> getTHByAdmin(String ks1, String js1, String ks2, String js2, String ks3, String js3, String ks4, String js4, String ks5, String js5, String ks6, String js6, String ks7, String js7, String ks8, String js8, String ks9, String js9, String ks10, String js10, String ks11, String js11, String ks12, String js12, String customer) {
        return anYueTongJiMapper.getTHByAdmin(ks1, js1, ks2, js2, ks3, js3, ks4, js4, ks5, js5, ks6, js6, ks7, js7, ks8, js8, ks9, js9, ks10, js10, ks11, js11, ks12, js12, customer);
    }

    @Override
    public List<AnYueTongJi> getfkByAdmin(String ks1, String js1, String ks2, String js2, String ks3, String js3, String ks4, String js4, String ks5, String js5, String ks6, String js6, String ks7, String js7, String ks8, String js8, String ks9, String js9, String ks10, String js10, String ks11, String js11, String ks12, String js12, String customer) {
        return anYueTongJiMapper.getfkByAdmin(ks1, js1, ks2, js2, ks3, js3, ks4, js4, ks5, js5, ks6, js6, ks7, js7, ks8, js8, ks9, js9, ks10, js10, ks11, js11, ks12, js12, customer);
    }

    @Override
    public List<AnYueTongJi> getHKByAdmin(String ks1, String js1, String ks2, String js2, String ks3, String js3, String ks4, String js4, String ks5, String js5, String ks6, String js6, String ks7, String js7, String ks8, String js8, String ks9, String js9, String ks10, String js10, String ks11, String js11, String ks12, String js12, String customer) {
        return anYueTongJiMapper.getHKByAdmin(ks1, js1, ks2, js2, ks3, js3, ks4, js4, ks5, js5, ks6, js6, ks7, js7, ks8, js8, ks9, js9, ks10, js10, ks11, js11, ks12, js12, customer);
    }

    @Override
    public List<AnYueTongJi> getXSByOther(String ks1, String js1, String ks2, String js2, String ks3, String js3, String ks4, String js4, String ks5, String js5, String ks6, String js6, String ks7, String js7, String ks8, String js8, String ks9, String js9, String ks10, String js10, String ks11, String js11, String ks12, String js12, String customer, String name) {
        return anYueTongJiMapper.getXSByOther(ks1, js1, ks2, js2, ks3, js3, ks4, js4, ks5, js5, ks6, js6, ks7, js7, ks8, js8, ks9, js9, ks10, js10, ks11, js11, ks12, js12, customer, name);
    }

    @Override
    public List<AnYueTongJi> getTHByOther(String ks1, String js1, String ks2, String js2, String ks3, String js3, String ks4, String js4, String ks5, String js5, String ks6, String js6, String ks7, String js7, String ks8, String js8, String ks9, String js9, String ks10, String js10, String ks11, String js11, String ks12, String js12, String customer, String name) {
        return anYueTongJiMapper.getTHByOther(ks1, js1, ks2, js2, ks3, js3, ks4, js4, ks5, js5, ks6, js6, ks7, js7, ks8, js8, ks9, js9, ks10, js10, ks11, js11, ks12, js12, customer, name);
    }

    @Override
    public List<AnYueTongJi> getfkByOther(String ks1, String js1, String ks2, String js2, String ks3, String js3, String ks4, String js4, String ks5, String js5, String ks6, String js6, String ks7, String js7, String ks8, String js8, String ks9, String js9, String ks10, String js10, String ks11, String js11, String ks12, String js12, String customer, String name) {
        return anYueTongJiMapper.getfkByOther(ks1, js1, ks2, js2, ks3, js3, ks4, js4, ks5, js5, ks6, js6, ks7, js7, ks8, js8, ks9, js9, ks10, js10, ks11, js11, ks12, js12, customer, name);
    }

    @Override
    public List<AnYueTongJi> getHKByOther(String ks1, String js1, String ks2, String js2, String ks3, String js3, String ks4, String js4, String ks5, String js5, String ks6, String js6, String ks7, String js7, String ks8, String js8, String ks9, String js9, String ks10, String js10, String ks11, String js11, String ks12, String js12, String customer, String name) {
        return anYueTongJiMapper.getHKByOther(ks1, js1, ks2, js2, ks3, js3, ks4, js4, ks5, js5, ks6, js6, ks7, js7, ks8, js8, ks9, js9, ks10, js10, ks11, js11, ks12, js12, customer, name);
    }
}
