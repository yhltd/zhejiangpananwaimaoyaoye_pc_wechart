package com.example.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.UserInfo;
import com.example.demo.entity.UserPower;
import com.example.demo.mapper.UserInfoMapper;
import com.example.demo.mapper.UserPowerMapper;
import com.example.demo.service.UserInfoService;
import com.example.demo.util.GsonUtil;
import com.example.demo.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author hui
 * @date 2022/8/19 10:16
 */
@Service
public class UserInfoImpl extends ServiceImpl<UserInfoMapper, UserInfo> implements UserInfoService {
    @Autowired
    UserInfoMapper userInfoMapper;
    @Autowired
    UserPowerMapper userPowerMapper;

    @Override
    public Map<String, Object> login(String username, String password) {
        //条件构造器
        QueryWrapper<UserInfo> queryWrapper = new QueryWrapper<>();
        //账号
        queryWrapper.eq("username", username);
        //密码
        queryWrapper.eq("password", password);
        //获取User
        UserInfo userInfo = this.getOne(queryWrapper);
        //如果不为空
        String data = StringUtils.EMPTY;
        if (StringUtils.isNotNull(userInfo)) {
            //转JSON
            data = GsonUtil.toJson(userInfo);

            List<UserPower> powerList = userPowerMapper.getListById(userInfo.getId());
            Map<String, Object> map = new HashMap<>();
            map.put("token", data);
            map.put("power",powerList);
            return map;
        }
        return null;
    }

    @Override
    public List<UserInfo> getList() {
        return userInfoMapper.getList();
    }

    @Override
    public List<UserInfo> queryList(String name, String department) {
        return userInfoMapper.queryList(name, department);
    }

    @Override
    public UserInfo add(UserInfo userInfo) {
        return save(userInfo) ? userInfo : null;
    }

    @Override
    public boolean update(UserInfo userInfo) {
        return updateById(userInfo);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
