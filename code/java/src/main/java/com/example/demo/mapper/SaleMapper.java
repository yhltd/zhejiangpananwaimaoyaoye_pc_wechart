package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Sale;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/31 10:45
 */
@Mapper
@Repository
public interface SaleMapper extends BaseMapper<Sale> {
    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,sa.remarks," +
            "warehouse,type,express,customer,salesman,product_name,spec,unit,price,p.pinyin from (select s.id,s.riqi," +
            "customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express," +
            "customer,salesman,pinyin from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product " +
            "p on sa.product_id=p.id")
    List<Sale> getList();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,sa.remarks," +
            "warehouse,type,express,customer,salesman,product_name,spec,unit,price,p.pinyin from (select s.id,s.riqi," +
            "customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express," +
            "customer,salesman,pinyin from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product " +
            "p on sa.product_id=p.id where salesman=#{name}")
    List<Sale> getListByName(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,sa.remarks," +
            "warehouse,type,express,customer,salesman,product_name,spec,unit,price,p.pinyin from (select s.id,s.riqi," +
            "customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express," +
            "customer,salesman,pinyin from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product " +
            "p on sa.product_id=p.id where convert(date,sa.riqi)>=#{ks} and convert(date,sa.riqi)<=#{js} and (customer " +
            "like '%'+#{customer}+'%' or sa.pinyin like '%'+#{customer}+'%') and (product_name like '%'+#{product}+'%' or " +
            "p.pinyin like '%'+#{product}+'%') and pihao like '%'+#{pihao}+'%' ")
    List<Sale> queryList(String ks, String js, String customer, String product, String pihao);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,sa.remarks," +
            "warehouse,type,express,customer,salesman,product_name,spec,unit,price,p.pinyin from (select s.id,s.riqi," +
            "customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express," +
            "customer,salesman,pinyin from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product " +
            "p on sa.product_id=p.id where convert(date,sa.riqi)>=#{ks} and convert(date,sa.riqi)<=#{js} and (customer " +
            "like '%'+#{customer}+'%' or sa.pinyin like '%'+#{customer}+'%') and (product_name like '%'+#{product}+'%' or " +
            "p.pinyin like '%'+#{product}+'%') and pihao like '%'+#{pihao}+'%' and salesman=#{name} ")
    List<Sale> queryListByName(String ks, String js, String customer, String product, String pihao, String name);


}
