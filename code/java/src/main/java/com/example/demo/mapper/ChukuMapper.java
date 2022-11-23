package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Sale;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;


@Mapper
@Repository
public interface ChukuMapper extends BaseMapper<Sale> {

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' order by sa.riqi desc,customer,sale_type;")
    List<Sale> getList();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' and sa.riqi = #{riqi} and sa.customer = #{customer} and sa.salesman = #{salesman} and sa.chuku_state = #{type} order by sa.riqi desc,customer,sale_type;")
    List<Sale> getList_kanban(String riqi,String customer,String salesman,String type);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' and chuku_state = '审核中' order by sa.riqi desc,customer,sale_type;")
    List<Sale> getList_shenhezhong();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' and chuku_state = '审核通过' order by sa.riqi desc,customer,sale_type;")
    List<Sale> getList_tongguo();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' and chuku_state = '审核未通过' order by sa.riqi desc,customer,sale_type;")
    List<Sale> getList_weitongguo();

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' and salesman=#{name} order by sa.riqi desc,customer,sale_type;")
    List<Sale> getListByName(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' and chuku_state = '审核中' and salesman=#{name} order by sa.riqi desc,customer,sale_type;")
    List<Sale> getListByName_shenhezhong(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' and chuku_state = '审核通过' and salesman=#{name} order by sa.riqi desc,customer,sale_type;")
    List<Sale> getListByName_tongguo(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' and chuku_state = '审核未通过' and salesman=#{name} order by sa.riqi desc,customer,sale_type;")
    List<Sale> getListByName_weitongguo(String name);

    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where convert(date,sa.riqi)>=#{ks}" +
            " and convert(date,sa.riqi)<=#{js} and (customer like '%'+#{customer}+'%' or sa.pinyin like '%'+#{customer}+'%') and (product_name " +
            "like '%'+#{product}+'%' or p.pinyin like '%'+#{product}+'%') and pihao like '%'+#{pihao}+'%' and sale_type like '%'+#{saleType}+'%' and sale_state = '审核通过' order by sa.riqi desc,customer,sale_type;")
    List<Sale> queryList(String ks, String js, String customer, String product, String pihao, String saleType);


    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where convert(date,sa.riqi)>=#{ks} and convert(date,sa.riqi)<=#{js} " +
            "and (customer like '%'+#{customer}+'%' or sa.pinyin like '%'+#{customer}+'%') and (product_name like '%'+#{product}+'%' or p.pinyin " +
            "like '%'+#{product}+'%') and pihao like '%'+#{pihao}+'%' and salesman=#{name} and sale_type like '%'+#{saleType}+'%' and sale_state = '审核通过' order by sa.riqi desc,customer,sale_type;")
    List<Sale> queryListByName(String ks, String js, String customer, String product, String pihao, String saleType, String name);


    @Update("update sale set chuku_state=#{chukuState} where id=#{id}")
    boolean updateChukuState(String chukuState, int id);


    @Update("update sale set fahuo='已发货',pihao=#{pihao},express=#{express},wuliu_order=#{wuliuOrder} where id=#{id}")
    boolean updateFahuo(int id,String pihao,String express,String wuliuOrder);


    @Select("select sa.id,sa.riqi,customer_id,sh_staff,pick,product_id,sa.num,xiaoji,sa.remarks,type,isnull(customer,'') as customer,customer_num,area,leibie,isnull(salesman,'') as salesman,product_name,spec,pinhao,attribute,unit,sa.price,isnull(p.pinyin,'') as pinyin,sa.sale_state,sa.sale_type,sa.warehouse,sa.express,sa.wuliu_order,sa.pihao,sa.chuku_insert,sa.chuku_state,sa.fahuo from (select s.id,s.riqi,customer_id,sh_staff,pick,wuliu_order,product_id,pihao,num,xiaoji,s.remarks,warehouse,type,express,isnull(customer,'')as customer,customer_num,area,leibie,salesman,isnull(pinyin,'') as pinyin,fahuo,s.price,sale_state,sale_type,chuku_insert,chuku_state from sale s left join customerInfo c on s.customer_id=c.id) as sa left join product p on sa.product_id=p.id where sale_state = '审核通过' and customer_id=#{id} and riqi=#{riqi} ")
    List<Sale> getListByIdRiqi(int id, String riqi);

}