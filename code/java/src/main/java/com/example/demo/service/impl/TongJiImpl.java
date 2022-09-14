package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.TongJi;
import com.example.demo.mapper.TongJiMapper;
import com.example.demo.service.TongJiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 13:42
 */
@Service
public class TongJiImpl extends ServiceImpl<TongJiMapper, TongJi> implements TongJiService {
    @Autowired
    TongJiMapper tongJiMapper;

    @Override
    public List<TongJi> getList(String ks, String js, String customer,String name,String power) {
        if(power.equals("管理员")){
            return tongJiMapper.getList(ks, js, customer);
        }else{
            return tongJiMapper.getListByName(ks, js, customer,name);
        }
    }


}
