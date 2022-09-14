package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.UserPower;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/2 8:26
 */
@Mapper
@Repository
public interface UserPowerMapper extends BaseMapper<UserPower> {
    @Select("select up.id,user_id,[name],view_name,zeng,shan,gai,cha from userPower up left join userInfo ui " +
            "on up.user_id=ui.id  ")
    List<UserPower>getList();

    @Select("select up.id,user_id,[name],view_name,zeng,shan,gai,cha from userPower up left join userInfo ui " +
            "on up.user_id=ui.id where [name] like '%'+#{name}+'%' ")
    List<UserPower>queryList(String name);

    @Select("select * from userPower where user_id=#{id}")
    List<UserPower>getListById(int id);
}
