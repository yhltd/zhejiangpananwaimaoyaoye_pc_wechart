package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Payment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/23 11:08
 */
@Mapper
@Repository
public interface PaymentMapper extends BaseMapper<Payment> {
    @Select("select p.*,c.customer,customer_num,area,leibie from payment p left join customerInfo c on p.customer_id=c.id")
    List<Payment> getList();

    @Select("select p.*,c.customer,customer_num,area,leibie from payment p left join customerInfo c on p.customer_id=c.id where c.customer like '%'+ #{customer} +'%' or c.pinyin like '%'+ #{customer} +'%' ")
    List<Payment> queryList(String customer);

    @Select("select p.*,c.customer,customer_num,area,leibie from payment p left join customerInfo c on p.customer_id=c.id where c.salesman=#{name}")
    List<Payment> getListByName(String name);

    @Select("select p.*,c.customer,customer_num,area,leibie from payment p left join customerInfo c on p.customer_id=c.id where (c.customer like '%'+ #{customer} +'%' or c.pinyin like '%'+ #{customer} +'%' ) and c.salesman=#{name} ")
    List<Payment> queryListByName(String customer, String name);

    @Select("select p.*,c.customer,customer_num,area,leibie from payment p left join customerInfo c on p.customer_id=c.id where p.riqi >= #{riqi} and p.riqi <= #{riqi} ")
    List<Payment> kanbanList(String riqi);

    @Select("select p.*,c.customer,customer_num,area,leibie from payment p left join customerInfo c on p.customer_id=c.id where p.riqi >= #{riqi1} and p.riqi <= #{riqi2} c.salesman = #{name}")
    List<Payment> kanbanListByName(String riqi1,String riqi2, String name);

    @Select("select sum(convert(float,f_jine)) as r_jine from payment as p left join customerInfo as c on p.customer_id = c.id where p.riqi =#{riqi} and state = '审核通过'")
    List<Payment> getKanban(String riqi);

    @Select("select sum(convert(float,f_jine)) as r_jine from payment as p left join customerInfo as c on p.customer_id = c.id where p.riqi >=#{riqi1} and p.riqi <=#{riqi2} and c.salesman = #{name}; and state = '审核通过'")
    List<Payment> getKanbanByName(String riqi1,String riqi2,String name);

    @Update("update payment set state=#{state} where id=#{id}")
    boolean updateState(String state, int id);
}
