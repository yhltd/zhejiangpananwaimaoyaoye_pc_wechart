package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Approval;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 21:11
 */
@Mapper
@Repository
public interface ApprovalMapper extends BaseMapper<Approval> {
    @Select("select * from approval")
    List<Approval> getList();

    @Select("select * from approval where type like '%'+#{type}+'%' ")
    List<Approval> queryList(String type);
}
