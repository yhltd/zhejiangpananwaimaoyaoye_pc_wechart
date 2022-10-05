package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.UserInfo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
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

    @Select("select MAX(id) as id from userInfo")
    List<UserInfo> getListid();

    @Select("select * from userInfo where id = #{id} and name = #{name}")
    List<UserInfo> getListlist(int id, String name);

    @Insert("insert into userinfo(username,password,name,department) values(#{add_username},#{add_password},#{add_name},#{add_department})")
    boolean useradd(String add_username, String add_password, String add_name, String add_department);

    @Select("select * from userInfo where name like '%'+#{name}+'%' and department like '%'+#{department}+'%' ")
    List<UserInfo> queryList(String name,String department);

    @Delete("delete from userInfo where user_id=#{id}")
    boolean deleteid(String id);
}
