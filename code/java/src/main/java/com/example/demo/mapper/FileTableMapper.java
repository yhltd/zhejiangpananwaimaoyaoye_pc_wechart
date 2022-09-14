package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.FileTable;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/24 15:55
 */
@Mapper
@Repository
public interface FileTableMapper extends BaseMapper<FileTable> {
    @Select("select * from fileTable where other_id=#{otherId} and type=#{type} ")
    List<FileTable> getList(int otherId, String type);


    @Select("select * from fileTable where id=#{id}")
    List<FileTable> getFile(int id);

    @Select("select * from fileTable where other_id=#{id} and type=#{type}")
    List<FileTable> getFile2(int id,String type);
}
