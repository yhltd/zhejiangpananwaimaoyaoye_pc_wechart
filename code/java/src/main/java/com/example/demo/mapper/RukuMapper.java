package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.Ruku;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/30 15:41
 */
@Mapper
@Repository
public interface RukuMapper extends BaseMapper<Ruku> {
    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product p " +
            "on r.product_id=p.id ")
    List<Ruku> getList();

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product p " +
            "on r.product_id=p.id where state ='审核中'")
    List<Ruku> getList_shenhezhong();

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product p " +
            "on r.product_id=p.id where state ='审核通过'")
    List<Ruku> getList_tongguo();

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product p " +
            "on r.product_id=p.id where state ='审核未通过'")
    List<Ruku> getList_weitongguo();

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product " +
            "p on r.product_id=p.id where convert(date,riqi)>=#{ks} and  convert(date,riqi)<=#{js} and (product_name like " +
            "'%'+#{product}+'%' or pinyin like '%'+#{product}+'%') and pihao like '%'+#{pihao}+'%'" )
    List<Ruku> queryList(String ks,String js,String product,String pihao);

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product p " +
            "on r.product_id=p.id where staff=#{staff}")
    List<Ruku> getListByName(String staff);

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product p " +
            "on r.product_id=p.id where staff=#{staff} and state ='审核中'")
    List<Ruku> getListByName_shenhezhong(String staff);

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product p " +
            "on r.product_id=p.id where staff=#{staff} and state ='审核通过'")
    List<Ruku> getListByName_tongguo(String staff);

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product p " +
            "on r.product_id=p.id where staff=#{staff} and state ='审核未通过'")
    List<Ruku> getListByName_weitongguo(String staff);

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,r.num,remarks,state,product_date from ruku r left join product " +
            "p on r.product_id=p.id where convert(date,riqi)>=#{ks} and convert(date,riqi)<=#{js} and (product_name like " +
            "'%'+#{product}+'%' or pinyin like '%'+#{product}+'%') and staff=#{staff} and pihao like'%'+#{pihao}+'%'" )
    List<Ruku> queryListByName(String ks,String js,String product,String pihao,String staff);

    @Update("update ruku set state=#{state} where id=#{id}")
    boolean updateState(String state, int id);


}
