package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/19 16:31
 */
@Mapper
@Repository
public interface ProductMapper extends BaseMapper<Product> {
    @Select("select * from product")
    List<Product> getList();

    @Select("select * from product where product_name like '%'+ #{query} +'%' or pinyin like '%'+ #{query} +'%' ")
    List<Product> queryList(String query);

    @Select("select product_name from product group by product_name")
    List<Product> getListByProduct();
}
