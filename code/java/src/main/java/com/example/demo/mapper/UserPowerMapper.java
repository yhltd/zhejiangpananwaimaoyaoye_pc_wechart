package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.UserPower;
import org.apache.ibatis.annotations.*;
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

    @Update("update userPower set ${column} = #{this_value} where id=#{id}")
    boolean update(String column,int id,String this_value);

    @Insert("select * from userPower where user_id = #{id} and view_name = #{name}")
    boolean addadd(int id,String name);

    @Delete("delete from userPower where user_id=#{id}")
    boolean deleteid(int id);

}
