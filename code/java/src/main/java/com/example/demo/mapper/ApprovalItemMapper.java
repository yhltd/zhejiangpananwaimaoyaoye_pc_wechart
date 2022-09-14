package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.ApprovalItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 22:55
 */
@Mapper
@Repository
public interface ApprovalItemMapper extends BaseMapper<ApprovalItem> {
    @Select("select a.id,[name],state,user_id from approvalItem a left join userInfo u on a.user_id=u.id where approval_id=#{approvalId} ")
    List<ApprovalItem> getList(int approvalId);

    @Select("select * from approvalItem")
    List<ApprovalItem> getAllList();

    @Update("update approvalItem set state=#{state}  where id=#{id}")
    boolean shenhe(String state,int id);

    @Update("update approvalItem set state=#{state}  where approval_id=#{approvalId}")
    boolean update(String state,int approvalId);
}
