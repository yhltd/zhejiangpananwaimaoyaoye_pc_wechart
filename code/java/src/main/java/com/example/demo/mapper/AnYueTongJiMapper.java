package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.AnYueTongJi;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 17:49
 */
@Mapper
@Repository
public interface AnYueTongJiMapper extends BaseMapper<AnYueTongJi> {
//    @Select("select sum(case when type='销售' and convert(date,riqi)>=#{ks1} and convert(date,riqi)<=#{js1} then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='销售' and convert(date,riqi)>=#{ks2} and convert(date,riqi)<=#{js2} then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='销售' and convert(date,riqi)>=#{ks3} and convert(date,riqi)<=#{js3} then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='销售' and convert(date,riqi)>=#{ks4} and convert(date,riqi)<=#{js4} then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='销售' and convert(date,riqi)>=#{ks5} and convert(date,riqi)<=#{js5} then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='销售' and convert(date,riqi)>=#{ks6} and convert(date,riqi)<=#{js6} then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='销售' and convert(date,riqi)>=#{ks7} and convert(date,riqi)<=#{js7} then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='销售' and convert(date,riqi)>=#{ks8} and convert(date,riqi)<=#{js8} then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='销售' and convert(date,riqi)>=#{ks9} and convert(date,riqi)<=#{js9} then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='销售' and convert(date,riqi)>=#{ks10} and convert(date,riqi)<=#{js10} then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='销售' and convert(date,riqi)>=#{ks11} and convert(date,riqi)<=#{js11} then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='销售' and convert(date,riqi)>=#{ks12} and convert(date,riqi)<=#{js12} then convert(float,xiaoji) else 0 end) as yue12  from sale")
//    List<AnYueTongJi> getXS(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12);
//
//    @Select("select sum(case when type='退货' and convert(date,riqi)>=#{ks1} and convert(date,riqi)<=#{js1} then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='退货' and convert(date,riqi)>=#{ks2} and convert(date,riqi)<=#{js2} then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='退货' and convert(date,riqi)>=#{ks3} and convert(date,riqi)<=#{js3} then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='退货' and convert(date,riqi)>=#{ks4} and convert(date,riqi)<=#{js4} then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='退货' and convert(date,riqi)>=#{ks5} and convert(date,riqi)<=#{js5} then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='退货' and convert(date,riqi)>=#{ks6} and convert(date,riqi)<=#{js6} then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='退货' and convert(date,riqi)>=#{ks7} and convert(date,riqi)<=#{js7} then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='退货' and convert(date,riqi)>=#{ks8} and convert(date,riqi)<=#{js8} then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='退货' and convert(date,riqi)>=#{ks9} and convert(date,riqi)<=#{js9} then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='退货' and convert(date,riqi)>=#{ks10} and convert(date,riqi)<=#{js10} then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='退货' and convert(date,riqi)>=#{ks11} and convert(date,riqi)<=#{js11} then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='退货' and convert(date,riqi)>=#{ks12} and convert(date,riqi)<=#{js12} then convert(float,xiaoji) else 0 end) as yue12  from sale")
//    List<AnYueTongJi> getTH(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12);
//
//    @Select("select sum(case when  convert(date,riqi)>=#{ks1} and convert(date,riqi)<=#{js1} then convert(float,r_jine) else 0 end) as yue1,sum(case when  convert(date,riqi)>=#{ks2} and convert(date,riqi)<=#{js2} then convert(float,r_jine) else 0 end) as yue2,sum(case when  convert(date,riqi)>=#{ks3} and convert(date,riqi)<=#{js3} then convert(float,r_jine) else 0 end) as yue3,sum(case when  convert(date,riqi)>=#{ks4} and convert(date,riqi)<=#{js4} then convert(float,r_jine) else 0 end) as yue4,sum(case when  convert(date,riqi)>=#{ks5} and convert(date,riqi)<=#{js5} then convert(float,r_jine) else 0 end) as yue5,sum(case when  convert(date,riqi)>=#{ks6} and convert(date,riqi)<=#{js6} then convert(float,r_jine) else 0 end) as yue6,sum(case when  convert(date,riqi)>=#{ks7} and convert(date,riqi)<=#{js7} then convert(float,r_jine) else 0 end) as yue7,sum(case when  convert(date,riqi)>=#{ks8} and convert(date,riqi)<=#{js8} then convert(float,r_jine) else 0 end) as yue8,sum(case when  convert(date,riqi)>=#{ks9} and convert(date,riqi)<=#{js9} then convert(float,r_jine) else 0 end) as yue9,sum(case when  convert(date,riqi)>=#{ks10} and convert(date,riqi)<=#{js10} then convert(float,r_jine) else 0 end) as yue10,sum(case when  convert(date,riqi)>=#{ks11} and convert(date,riqi)<=#{js11} then convert(float,r_jine) else 0 end) as yue11,sum(case when  convert(date,riqi)>=#{ks12} and convert(date,riqi)<=#{js12} then convert(float,r_jine) else 0 end) as yue12 from payment")
//    List<AnYueTongJi> getfk(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12);
//
//    @Select("select sum(case when  convert(date,riqi)>=#{ks1} and convert(date,riqi)<=#{js1} then convert(float,f_jine) else 0 end) as yue1,sum(case when  convert(date,riqi)>=#{ks2} and convert(date,riqi)<=#{js2} then convert(float,f_jine) else 0 end) as yue2,sum(case when  convert(date,riqi)>=#{ks3} and convert(date,riqi)<=#{js3} then convert(float,f_jine) else 0 end) as yue3,sum(case when  convert(date,riqi)>=#{ks4} and convert(date,riqi)<=#{js4} then convert(float,f_jine) else 0 end) as yue4,sum(case when  convert(date,riqi)>=#{ks5} and convert(date,riqi)<=#{js5} then convert(float,f_jine) else 0 end) as yue5,sum(case when  convert(date,riqi)>=#{ks6} and convert(date,riqi)<=#{js6} then convert(float,f_jine) else 0 end) as yue6,sum(case when  convert(date,riqi)>=#{ks7} and convert(date,riqi)<=#{js7} then convert(float,f_jine) else 0 end) as yue7,sum(case when  convert(date,riqi)>=#{ks8} and convert(date,riqi)<=#{js8} then convert(float,f_jine) else 0 end) as yue8,sum(case when  convert(date,riqi)>=#{ks9} and convert(date,riqi)<=#{js9} then convert(float,f_jine) else 0 end) as yue9,sum(case when  convert(date,riqi)>=#{ks10} and convert(date,riqi)<=#{js10} then convert(float,f_jine) else 0 end) as yue10,sum(case when  convert(date,riqi)>=#{ks11} and convert(date,riqi)<=#{js11} then convert(float,f_jine) else 0 end) as yue11,sum(case when  convert(date,riqi)>=#{ks12} and convert(date,riqi)<=#{js12} then convert(float,f_jine) else 0 end) as yue12 from payment")
//    List<AnYueTongJi> getHK(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12);

    @Select("select sum(case when type='销售' and convert(date,s.riqi)>=#{ks1} and convert(date,s.riqi)<=#{js1} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='销售' and convert(date,s.riqi)>=#{ks2} and convert(date,s.riqi)<=#{js2} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='销售' and convert(date,s.riqi)>=#{ks3} and convert(date,s.riqi)<=#{js3} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='销售' and convert(date,s.riqi)>=#{ks4} and convert(date,s.riqi)<=#{js4} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='销售' and convert(date,s.riqi)>=#{ks5} and convert(date,s.riqi)<=#{js5} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='销售' and convert(date,s.riqi)>=#{ks6} and convert(date,s.riqi)<=#{js6} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='销售' and convert(date,s.riqi)>=#{ks7} and convert(date,s.riqi)<=#{js7} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='销售' and convert(date,s.riqi)>=#{ks8} and convert(date,s.riqi)<=#{js8} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='销售' and convert(date,s.riqi)>=#{ks9} and convert(date,s.riqi)<=#{js9} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='销售' and convert(date,s.riqi)>=#{ks10} and convert(date,s.riqi)<=#{js10} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='销售' and convert(date,s.riqi)>=#{ks11} and convert(date,s.riqi)<=#{js11} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='销售' and convert(date,s.riqi)>=#{ks12} and convert(date,s.riqi)<=#{js12} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue12  from sale s left join customerInfo ci on s.customer_id=ci.id where sale_state = '审核通过'  and fahuo = '已发货'")
    List<AnYueTongJi> getXSByAdmin(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer);

    @Select("select sum(case when type='退货' and convert(date,s.riqi)>=#{ks1} and convert(date,s.riqi)<=#{js1} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='退货' and convert(date,s.riqi)>=#{ks2} and convert(date,s.riqi)<=#{js2} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='退货' and convert(date,s.riqi)>=#{ks3} and convert(date,s.riqi)<=#{js3} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='退货' and convert(date,s.riqi)>=#{ks4} and convert(date,s.riqi)<=#{js4} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='退货' and convert(date,s.riqi)>=#{ks5} and convert(date,s.riqi)<=#{js5} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='退货' and convert(date,s.riqi)>=#{ks6} and convert(date,s.riqi)<=#{js6} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='退货' and convert(date,s.riqi)>=#{ks7} and convert(date,s.riqi)<=#{js7} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='退货' and convert(date,s.riqi)>=#{ks8} and convert(date,s.riqi)<=#{js8} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='退货' and convert(date,s.riqi)>=#{ks9} and convert(date,s.riqi)<=#{js9} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='退货' and convert(date,s.riqi)>=#{ks10} and convert(date,s.riqi)<=#{js10} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='退货' and convert(date,s.riqi)>=#{ks11} and convert(date,s.riqi)<=#{js11} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='退货' and convert(date,s.riqi)>=#{ks12} and convert(date,s.riqi)<=#{js12} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue12  from sale s left join customerInfo ci on s.customer_id=ci.id where sale_state = '审核通过'  and fahuo = '已发货'")
    List<AnYueTongJi> getTHByAdmin(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer);

    @Select("select sum(case when  convert(date,s.riqi)>=#{ks1} and convert(date,s.riqi)<=#{js1} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue1,sum(case when  convert(date,s.riqi)>=#{ks2} and convert(date,s.riqi)<=#{js2} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue2,sum(case when convert(date,s.riqi)>=#{ks3} and convert(date,s.riqi)<=#{js3} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue3,sum(case when  convert(date,s.riqi)>=#{ks4} and convert(date,s.riqi)<=#{js4} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue4,sum(case when  convert(date,s.riqi)>=#{ks5} and convert(date,s.riqi)<=#{js5} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue5,sum(case when convert(date,s.riqi)>=#{ks6} and convert(date,s.riqi)<=#{js6} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue6,sum(case when  convert(date,s.riqi)>=#{ks7} and convert(date,s.riqi)<=#{js7} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue7,sum(case when  convert(date,s.riqi)>=#{ks8} and convert(date,s.riqi)<=#{js8} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue8,sum(case when  convert(date,s.riqi)>=#{ks9} and convert(date,s.riqi)<=#{js9} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue9,sum(case when  convert(date,s.riqi)>=#{ks10} and convert(date,s.riqi)<=#{js10} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue10,sum(case when  convert(date,s.riqi)>=#{ks11} and convert(date,s.riqi)<=#{js11} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue11,sum(case when  convert(date,s.riqi)>=#{ks12} and convert(date,s.riqi)<=#{js12} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue12 from payment s left join customerInfo ci on s.customer_id=ci.id where state = '审核通过'")
    List<AnYueTongJi> getfkByAdmin(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer);

    @Select("select sum(case when  convert(date,s.riqi)>=#{ks1} and convert(date,s.riqi)<=#{js1} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue1,sum(case when  convert(date,s.riqi)>=#{ks2} and convert(date,s.riqi)<=#{js2} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue2,sum(case when convert(date,s.riqi)>=#{ks3} and convert(date,s.riqi)<=#{js3} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue3,sum(case when  convert(date,s.riqi)>=#{ks4} and convert(date,s.riqi)<=#{js4} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue4,sum(case when  convert(date,s.riqi)>=#{ks5} and convert(date,s.riqi)<=#{js5} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue5,sum(case when convert(date,s.riqi)>=#{ks6} and convert(date,s.riqi)<=#{js6} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue6,sum(case when  convert(date,s.riqi)>=#{ks7} and convert(date,s.riqi)<=#{js7} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue7,sum(case when  convert(date,s.riqi)>=#{ks8} and convert(date,s.riqi)<=#{js8} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue8,sum(case when  convert(date,s.riqi)>=#{ks9} and convert(date,s.riqi)<=#{js9} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue9,sum(case when  convert(date,s.riqi)>=#{ks10} and convert(date,s.riqi)<=#{js10} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue10,sum(case when  convert(date,s.riqi)>=#{ks11} and convert(date,s.riqi)<=#{js11} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue11,sum(case when  convert(date,s.riqi)>=#{ks12} and convert(date,s.riqi)<=#{js12} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue12 from payment s left join customerInfo ci on s.customer_id=ci.id where state = '审核通过'")
    List<AnYueTongJi> getHKByAdmin(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer);


    @Select("select sum(case when type='销售' and convert(date,s.riqi)>=#{ks1} and convert(date,s.riqi)<=#{js1} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='销售' and convert(date,s.riqi)>=#{ks2} and convert(date,s.riqi)<=#{js2} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='销售' and convert(date,s.riqi)>=#{ks3} and convert(date,s.riqi)<=#{js3} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='销售' and convert(date,s.riqi)>=#{ks4} and convert(date,s.riqi)<=#{js4} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='销售' and convert(date,s.riqi)>=#{ks5} and convert(date,s.riqi)<=#{js5} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='销售' and convert(date,s.riqi)>=#{ks6} and convert(date,s.riqi)<=#{js6} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='销售' and convert(date,s.riqi)>=#{ks7} and convert(date,s.riqi)<=#{js7} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='销售' and convert(date,s.riqi)>=#{ks8} and convert(date,s.riqi)<=#{js8} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='销售' and convert(date,s.riqi)>=#{ks9} and convert(date,s.riqi)<=#{js9} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='销售' and convert(date,s.riqi)>=#{ks10} and convert(date,s.riqi)<=#{js10} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='销售' and convert(date,s.riqi)>=#{ks11} and convert(date,s.riqi)<=#{js11} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='销售' and convert(date,s.riqi)>=#{ks12} and convert(date,s.riqi)<=#{js12} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue12  from sale s left join customerInfo ci on s.customer_id=ci.id where salesman=#{name} and sale_state = '审核通过'  and fahuo = '已发货'")
    List<AnYueTongJi> getXSByOther(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer,String name);

    @Select("select sum(case when type='退货' and convert(date,s.riqi)>=#{ks1} and convert(date,s.riqi)<=#{js1} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue1,sum(case when type='销售' and convert(date,s.riqi)>=#{ks2} and convert(date,s.riqi)<=#{js2} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue2,sum(case when type='销售' and convert(date,s.riqi)>=#{ks3} and convert(date,s.riqi)<=#{js3} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue3,sum(case when type='销售' and convert(date,s.riqi)>=#{ks4} and convert(date,s.riqi)<=#{js4} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue4,sum(case when type='销售' and convert(date,s.riqi)>=#{ks5} and convert(date,s.riqi)<=#{js5} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue5,sum(case when type='销售' and convert(date,s.riqi)>=#{ks6} and convert(date,s.riqi)<=#{js6} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue6,sum(case when type='销售' and convert(date,s.riqi)>=#{ks7} and convert(date,s.riqi)<=#{js7} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue7,sum(case when type='销售' and convert(date,s.riqi)>=#{ks8} and convert(date,s.riqi)<=#{js8} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue8,sum(case when type='销售' and convert(date,s.riqi)>=#{ks9} and convert(date,s.riqi)<=#{js9} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue9,sum(case when type='销售' and convert(date,s.riqi)>=#{ks10} and convert(date,s.riqi)<=#{js10} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue10,sum(case when type='销售' and convert(date,s.riqi)>=#{ks11} and convert(date,s.riqi)<=#{js11} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue11,sum(case when type='销售' and convert(date,s.riqi)>=#{ks12} and convert(date,s.riqi)<=#{js12} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,xiaoji) else 0 end) as yue12  from sale s left join customerInfo ci on s.customer_id=ci.id where salesman=#{name} and sale_state = '审核通过'  and fahuo = '已发货'")
    List<AnYueTongJi> getTHByOther(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer,String name);

    @Select("select sum(case when  convert(date,s.riqi)>=#{ks1} and convert(date,s.riqi)<=#{js1} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue1,sum(case when  convert(date,s.riqi)>=#{ks2} and convert(date,s.riqi)<=#{js2} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue2,sum(case when convert(date,s.riqi)>=#{ks3} and convert(date,s.riqi)<=#{js3} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue3,sum(case when  convert(date,s.riqi)>=#{ks4} and convert(date,s.riqi)<=#{js4} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue4,sum(case when  convert(date,s.riqi)>=#{ks5} and convert(date,s.riqi)<=#{js5} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue5,sum(case when convert(date,s.riqi)>=#{ks6} and convert(date,s.riqi)<=#{js6} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue6,sum(case when  convert(date,s.riqi)>=#{ks7} and convert(date,s.riqi)<=#{js7} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue7,sum(case when  convert(date,s.riqi)>=#{ks8} and convert(date,s.riqi)<=#{js8} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue8,sum(case when  convert(date,s.riqi)>=#{ks9} and convert(date,s.riqi)<=#{js9} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue9,sum(case when  convert(date,s.riqi)>=#{ks10} and convert(date,s.riqi)<=#{js10} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue10,sum(case when  convert(date,s.riqi)>=#{ks11} and convert(date,s.riqi)<=#{js11} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue11,sum(case when  convert(date,s.riqi)>=#{ks12} and convert(date,s.riqi)<=#{js12} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,r_jine) else 0 end) as yue12 from payment s left join customerInfo ci on s.customer_id=ci.id where salesman=#{name} and state = '审核通过'")
    List<AnYueTongJi> getfkByOther(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer,String name);

    @Select("select sum(case when  convert(date,s.riqi)>=#{ks1} and convert(date,s.riqi)<=#{js1} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue1,sum(case when  convert(date,s.riqi)>=#{ks2} and convert(date,s.riqi)<=#{js2} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue2,sum(case when convert(date,s.riqi)>=#{ks3} and convert(date,s.riqi)<=#{js3} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue3,sum(case when  convert(date,s.riqi)>=#{ks4} and convert(date,s.riqi)<=#{js4} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue4,sum(case when  convert(date,s.riqi)>=#{ks5} and convert(date,s.riqi)<=#{js5} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue5,sum(case when convert(date,s.riqi)>=#{ks6} and convert(date,s.riqi)<=#{js6} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue6,sum(case when  convert(date,s.riqi)>=#{ks7} and convert(date,s.riqi)<=#{js7} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue7,sum(case when  convert(date,s.riqi)>=#{ks8} and convert(date,s.riqi)<=#{js8} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue8,sum(case when  convert(date,s.riqi)>=#{ks9} and convert(date,s.riqi)<=#{js9} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue9,sum(case when  convert(date,s.riqi)>=#{ks10} and convert(date,s.riqi)<=#{js10} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue10,sum(case when  convert(date,s.riqi)>=#{ks11} and convert(date,s.riqi)<=#{js11} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue11,sum(case when  convert(date,s.riqi)>=#{ks12} and convert(date,s.riqi)<=#{js12} and (customer like '%'+ #{customer} +'%' or pinyin like '%'+ #{customer} +'%') then convert(float,f_jine) else 0 end) as yue12 from payment s left join customerInfo ci on s.customer_id=ci.id where salesman=#{name} and state = '审核通过'")
    List<AnYueTongJi> getHKByOther(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer,String name);
}
