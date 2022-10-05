package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Payment;
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
public interface PaymentMapper extends BaseMapper<Payment> {
    @Select("select p.*,c.customer from payment p left join customerInfo c on p.customer_id=c.id")
    List<Payment> getList();

    @Select("select p.*,c.customer from payment p left join customerInfo c on p.customer_id=c.id where c.customer like '%'+ #{customer} +'%' or c.pinyin like '%'+ #{customer} +'%' ")
    List<Payment> queryList(String customer);

    @Select("select p.*,c.customer from payment p left join customerInfo c on p.customer_id=c.id where c.salesman=#{name}")
    List<Payment> getListByName(String name);

    @Select("select p.*,c.customer from payment p left join customerInfo c on p.customer_id=c.id where (c.customer like '%'+ #{customer} +'%' or c.pinyin like '%'+ #{customer} +'%' ) and c.salesman=#{name} ")
    List<Payment> queryListByName(String customer, String name);
}