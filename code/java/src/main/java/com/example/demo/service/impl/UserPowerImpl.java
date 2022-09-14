package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.UserPower;
import com.example.demo.mapper.UserPowerMapper;
import com.example.demo.service.UserPowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/2 8:35
 */
@Service
public class UserPowerImpl extends ServiceImpl<UserPowerMapper, UserPower> implements UserPowerService {
    @Autowired
    UserPowerMapper userPowerMapper;

    @Override
    public List<UserPower> getList() {
        return userPowerMapper.getList();
    }

    @Override
    public List<UserPower> queryList(String name) {
        return userPowerMapper.queryList(name);
    }

    @Override
    public UserPower add(UserPower userPower) {
        return save(userPower) ? userPower : null;
    }

    @Override
    public boolean update(UserPower userPower) {
        return updateById(userPower);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
