package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Sale;
import org.apache.ibatis.annotations.Insert;
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
    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id")
    List<Sale> getList();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sa.sale_state ='审核中'")
    List<Sale> getList_shenhezhong();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sa.sale_state ='审核通过'")
    List<Sale> getList_tongguo();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sa.sale_state ='审核未通过'")
    List<Sale> getList_weitongguo();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where salesman=#{name}")
    List<Sale> getListByName(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where salesman=#{name} and sa.sale_state ='审核中'")
    List<Sale> getListByName_shenhezhong(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where salesman=#{name} and sa.sale_state ='审核通过'")
    List<Sale> getListByName_tongguo(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where salesman=#{name} and sa.sale_state ='审核未通过'")
    List<Sale> getListByName_weitongguo(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where convert(date,sa.riqi)>=#{ks}" +
            " and convert(date,sa.riqi)<=#{js} and (customer like '%'+#{customer}+'%' or sa.pinyin like '%'+#{customer}+'%') and (product_name " +
            "like '%'+#{product}+'%' or p.pinyin like '%'+#{product}+'%') and pihao like '%'+#{pihao}+'%' and sale_type like '%'+#{saleType}+'%'")
    List<Sale> queryList(String ks, String js, String customer, String product, String pihao,String saleType);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,salesman,product_name,spec,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,salesman,pinyin,fahuo,s.price,sale_state,sale_type from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id convert(date,sa.riqi)>=#{ks} and convert(date,sa.riqi)<=#{js} " +
            "and (customer like '%'+#{customer}+'%' or sa.pinyin like '%'+#{customer}+'%') and (product_name like '%'+#{product}+'%' or p.pinyin " +
            "like '%'+#{product}+'%') and pihao like '%'+#{pihao}+'%' and salesman=#{name} and sale_type like '%'+#{saleType}+'%'")
    List<Sale> queryListByName(String ks, String js, String customer, String product, String pihao,String saleType, String name);


}
