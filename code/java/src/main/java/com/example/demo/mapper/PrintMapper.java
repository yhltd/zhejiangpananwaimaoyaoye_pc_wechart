package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Print;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/23 11:08
 */
@Mapper
@Repository
public interface PrintMapper extends BaseMapper<Print> {

    @Select("select * from printset")
    List<Print> getList();

    @Select("select * from printset where type like '%'+ #{type} +'%' and danwei like '%'+ #{danwei} +'%'")
    List<Print> queryList(String type,String danwei);

}
