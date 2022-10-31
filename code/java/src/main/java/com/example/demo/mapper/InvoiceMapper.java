package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Invoice;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/23 14:56
 */
@Mapper
@Repository
public interface InvoiceMapper extends BaseMapper<Invoice> {
    @Select("select i.*,c.customer,customer_num,area,leibie from invoice i left join customerInfo c on i.customer_id=c.id")
    List<Invoice> getList();

    @Select("select product_name from product")
    List<Invoice> getListlist();

    @Select("select i.*,c.customer,customer_num,area,leibie from invoice i left join customerInfo c on i.customer_id=c.id where (c.customer like '%'+ #{customer} +'%' or c.pinyin like '%'+ #{customer} +'%' ) and unit like '%'+ #{unit} +'%' and thebillingnumber like '%'+ #{unit1} +'%' ")
    List<Invoice> queryList(String customer, String unit, String unit1);

    @Select("select i.*,c.customer,customer_num,area,leibie from invoice i left join customerInfo c on i.customer_id=c.id c.salesman = #{name} ")
    List<Invoice> getListByName(String name);

    @Select("select i.*,c.customer,customer_num,area,leibie from invoice i left join customerInfo c on i.customer_id=c.id where (c.customer like '%'+ #{customer} +'%' or c.pinyin like '%'+ #{customer} +'%' ) and thebillingnumber like '%'+ #{unit1} +'%' and unit like '%'+ #{unit} +'%' and c.salesman = #{name}")
    List<Invoice> queryListByName(String customer, String unit,String unit1, String name);

    @Update("update invoice set state=#{state} where id=#{id}")
    boolean updateState(String state, int id);
}
