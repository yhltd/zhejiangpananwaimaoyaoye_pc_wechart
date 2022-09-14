package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.TongJi;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 13:36
 */
@Mapper
@Repository
public interface TongJiMapper extends BaseMapper<TongJi> {
    @Select("select xs.id,customer,xs,th,fankuan,fukuan,zhekou,zengsong from (select id,customer,pinyin,xs,th from " +
            "(select customer_id,sum(case when type='销售' then convert(float,xiaoji) else 0 end) as xs," +
            "sum(case when type='退货' then convert(float,xiaoji) else 0 end) as th from sale where convert(date,riqi)" +
            ">#{ks} and convert(date,riqi)<#{js} group by customer_id) as s right join customerInfo as c on " +
            "s.customer_id=c.id) xs left join (select customer_id,sum(convert(float,r_jine)) " +
            "fankuan,sum(convert(float,f_jine)) fukuan,sum(convert(float,discount)) zhekou,sum(convert(float,quota)) " +
            "zengsong from payment where convert(date,riqi)>#{ks} and convert(date,riqi)<#{js} group by customer_id) " +
            "p on xs.id=p.customer_id where customer like '%'+#{customer}+'%' or pinyin like '%'+#{customer}+'%'")
    List<TongJi> getList(String ks, String js, String customer);

    @Select("select xs.id,customer,xs,th,fankuan,fukuan,zhekou,zengsong from (select id,customer,pinyin,xs,th from " +
            "(select customer_id,sum(case when type='销售' then convert(float,xiaoji) else 0 end) as xs," +
            "sum(case when type='退货' then convert(float,xiaoji) else 0 end) as th from sale where convert(date,riqi)" +
            ">#{ks} and convert(date,riqi)<#{js} group by customer_id) as s right join customerInfo as c on " +
            "s.customer_id=c.id where salesman=#{name}) xs left join (select customer_id,sum(convert(float,r_jine)) " +
            "fankuan,sum(convert(float,f_jine)) fukuan,sum(convert(float,discount)) zhekou,sum(convert(float,quota)) " +
            "zengsong from payment where convert(date,riqi)>#{ks} and convert(date,riqi)<#{js} group by customer_id) " +
            "p on xs.id=p.customer_id where customer like '%'+#{customer}+'%' or pinyin like '%'+#{customer}+'%'")
    List<TongJi> getListByName(String ks, String js, String customer, String name);
}
