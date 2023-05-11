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
    @Select("select id,warehouse,pihao,product_id,product_name,spec,pinhao,attribute,unit,price,pinyin,s.num from (select riqi,product_id,warehouse,pihao,case when type='销售' then convert(float,num) else -convert(float,num) end as num from sale where sale_state = '审核通过'  and fahuo = '已发货') as s left join product p on s.product_id=p.id order by riqi")
    List<Product> getSale();

    @Select("select id,warehouse,pihao,product_id,product_name,spec,pinhao,attribute,unit,price,pinyin,r.num from (select riqi,product_id,warehouse,pihao,case when state='审核通过' then convert(float,num) else 0 end as num from ruku) as r left join product p on r.product_id=p.id order by riqi")
    List<Product> getRuku();

    @Select("select id,warehouse,pihao,product_id,product_name,spec,pinhao,attribute,unit,price,pinyin,s.num from (select riqi,product_id,warehouse,pihao,case when type='销售' then convert(float,num) else -convert(float,num) end as num from sale where sale_state = '审核通过'  and fahuo = '已发货') as s left join product p on s.product_id=p.id where warehouse like '%'+#{warehouse}+'%' and pihao like '%'+#{pihao}+'%' and (product_name like '%'+#{product}+'%' or pinyin like '%'+#{product}+'%') order by riqi ")
    List<Product> querySale(String warehouse, String pihao, String product);

    @Select("select id,warehouse,pihao,product_id,product_name,spec,pinhao,attribute,unit,price,pinyin,r.num from (select riqi,product_id,warehouse,pihao,case when state='审核通过' then convert(float,num) else 0 end as num from ruku) as r left join product p on r.product_id=p.id where warehouse like '%'+#{warehouse}+'%' and pihao like '%'+#{pihao}+'%' and (product_name like '%'+#{product}+'%' or pinyin like '%'+#{product}+'%')  order by riqi")
    List<Product> queryRuku(String warehouse, String pihao, String product);



}
