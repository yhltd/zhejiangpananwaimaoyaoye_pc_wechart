package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Sale;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/31 10:45
 */
@Mapper
@Repository
public interface SaleMapper extends BaseMapper<Sale> {
    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sa.chuku_insert != '1' order by sa.riqi desc,customer,sale_type")
    List<Sale> getList();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sa.chuku_insert != '1' and sa.riqi = #{riqi} and sa.customer = #{customer} and sa.salesman = #{salesman} and sale_state = #{type} order by sa.riqi desc,customer,sale_type")
    List<Sale> getList_kanban(String riqi,String customer,String salesman,String type);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sa.sale_state ='审核中' and sa.chuku_insert != '1' order by sa.riqi desc,customer,sale_type")
    List<Sale> getList_shenhezhong();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sa.sale_state ='审核通过' and sa.chuku_insert != '1' order by sa.riqi desc,customer,sale_type")
    List<Sale> getList_tongguo();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sa.sale_state ='审核未通过' and sa.chuku_insert != '1' order by sa.riqi desc,customer,sale_type")
    List<Sale> getList_weitongguo();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where salesman=#{name} and sa.chuku_insert != '1' order by sa.riqi desc,customer,sale_type")
    List<Sale> getListByName(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where salesman=#{name} and sa.chuku_insert != '1' and sa.sale_state ='审核中' order by sa.riqi desc,customer,sale_type")
    List<Sale> getListByName_shenhezhong(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where salesman=#{name} and sa.chuku_insert != '1' and sa.sale_state ='审核通过' order by sa.riqi desc,customer,sale_type")
    List<Sale> getListByName_tongguo(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where salesman=#{name} and sa.chuku_insert != '1' and sa.sale_state ='审核未通过' order by sa.riqi desc,customer,sale_type")
    List<Sale> getListByName_weitongguo(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where convert(date,sa.riqi)>=#{ks}" +
            " and convert(date,sa.riqi)<=#{js} and (customer like '%'+#{customer}+'%' or sa.pinyin like '%'+#{customer}+'%') and (product_name " +
            "like '%'+#{product}+'%' or p.pinyin like '%'+#{product}+'%') and pihao like '%'+#{pihao}+'%' and sale_type like '%'+#{saleType}+'%' and sa.chuku_insert != '1' order by sa.riqi desc,customer,sale_type")
    List<Sale> queryList(String ks, String js, String customer, String product, String pihao,String saleType);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,customer,address,customer_num,area,leibie,salesman,product_name,spec,pinhao,attribute,unit,sa.price,p.pinyin,sa.sale_state,sa.sale_type from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,customer,address,customer_num,area,leibie,salesman,pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where convert(date,sa.riqi)>=#{ks} and convert(date,sa.riqi)<=#{js} " +
            "and (customer like '%'+#{customer}+'%' or sa.pinyin like '%'+#{customer}+'%') and (product_name like '%'+#{product}+'%' or p.pinyin " +
            "like '%'+#{product}+'%') and pihao like '%'+#{pihao}+'%' and salesman=#{name} and sale_type like '%'+#{saleType}+'%' and sa.chuku_insert != '1' order by sa.riqi desc,customer,sale_type")
    List<Sale> queryListByName(String ks, String js, String customer, String product, String pihao,String saleType, String name);


    @Update("update sale set sale_state=#{saleState},warehouse=#{warehouse},chuku_state ='审核中',fahuo ='未发货' where id=#{id}")
    boolean updateSaleState(String saleState,String warehouse, int id);

    List<Sale> getKanban(String riqi);

    @Select("select sum(convert(float,xiaoji)) as price from sale as s left join customerInfo as c on s.customer_id = c.id where sale_state = '审核通过'  and type = '销售' and s.riqi >= #{riqi1} and s.riqi <= #{riqi2} and c.salesman = #{name}")
    List<Sale> getKanbanByName(String riqi1,String riqi2,String name);


}
