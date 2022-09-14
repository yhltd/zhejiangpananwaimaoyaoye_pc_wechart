package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.General;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/19 14:36
 */
@Mapper
@Repository
public interface GeneralMapper extends BaseMapper<General> {
    @Select("select * from general")
    List<General> getList();
}
