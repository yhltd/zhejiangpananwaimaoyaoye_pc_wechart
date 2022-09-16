package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.CustomerInfo;
import com.example.demo.mapper.CustomerInfoMapper;
import com.example.demo.service.CustomerInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/22 14:21
 */
@Service
public class CustomerInfoImpl extends ServiceImpl<CustomerInfoMapper, CustomerInfo> implements CustomerInfoService {
    @Autowired
    CustomerInfoMapper customerInfoMapper;


    @Override
    public List<CustomerInfo> getList(String name, String power) {
        if (power.equals("管理员")) {
            return customerInfoMapper.getList();
        } else {
            return customerInfoMapper.getListByName(name);
        }

    }

    @Override
    public List<CustomerInfo> queryList(String customerInfo,String leibie, String name, String power) {
        if (power.equals("管理员")) {
            return customerInfoMapper.queryList(customerInfo,leibie);
        } else {
            return customerInfoMapper.queryListByName(customerInfo, leibie,name);
        }

    }

    @Override
    public CustomerInfo add(CustomerInfo customerInfo) {
        return save(customerInfo) ? customerInfo : null;
    }

    @Override
    public boolean update(CustomerInfo customerInfo) {
        return updateById(customerInfo);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
