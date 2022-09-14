package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/31 16:19
 */
@Mapper
@Repository
public interface KuCunMapper extends BaseMapper<Product> {
    @Select("select * from (select product_id,sum(case when type='销售' then convert(float,num) else -convert(float,num) end) as num from sale group by product_id) as s left join product p on s.product_id=p.id")
    List<Product> getSale();

    @Select("select * from (select product_id,sum(case when state='审核通过' then convert(float,num) else 0 end) as num from ruku group by product_id) as r left join product p on r.product_id=p.id")
    List<Product> getRuku();

    @Select("select * from (select product_id,sum(case when type='销售' then convert(float,num) else -convert(float,num) end) as num from sale where convert(date,riqi)>=#{ks} and convert(date,riqi)<=#{js} group by product_id) as s left join product p on s.product_id=p.id where product_name like '%'+#{product}+'%' or pinyin like '%'+#{product}+'%' ")
    List<Product> querySale(String ks, String js, String product);

    @Select("select * from (select product_id,sum(case when state='审核通过' then convert(float,num) else 0 end) as num from ruku  where convert(date,riqi)>=#{ks} and convert(date,riqi)<=#{js}  group by product_id) as r left join product p on r.product_id=p.id where product_name like '%'+#{product}+'%' or pinyin like '%'+#{product}+'%' ")
    List<Product> queryRuku(String ks, String js, String product);



}
