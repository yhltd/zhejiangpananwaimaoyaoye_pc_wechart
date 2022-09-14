package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.UserPower;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/2 8:33
 */
@Service
public interface UserPowerService extends IService<UserPower> {
    List<UserPower> getList();

    List<UserPower> queryList(String name);

    UserPower add(UserPower userPower);

    boolean update(UserPower userPower);

    boolean delete(List<Integer> idList);
}
