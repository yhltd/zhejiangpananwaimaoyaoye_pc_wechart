package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/19 10:17
 */
@Mapper
@Repository
public interface UserInfoMapper extends BaseMapper<UserInfo> {
    @Select("select * from userInfo")
    List<UserInfo> getList();

    @Select("select * from userInfo where name like '%'+#{name}+'%' and department like '%'+#{department}+'%' ")
    List<UserInfo> queryList(String name,String department);
}
