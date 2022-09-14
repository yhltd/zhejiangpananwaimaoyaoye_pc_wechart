package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Assay;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/29 16:47
 */
@Mapper
@Repository
public interface AssayMapper extends BaseMapper<Assay> {
    @Select("select * from assay")
    List<Assay> getList();

    @Select("select * from assay where pihao like '%'+#{pihao}+'%' ")
    List<Assay> queryList(String pihao);

}

