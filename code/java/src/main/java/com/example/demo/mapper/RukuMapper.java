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
    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,num,remarks,state from ruku r left join product p " +
            "on r.product_id=p.id ")
    List<Ruku> getList();

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,num,remarks,state from ruku r left join product " +
            "p on r.product_id=p.id where convert(date,riqi)>=#{ks} and  convert(date,riqi)<=#{js} and (product_name like " +
            "'%'+#{product}+'%' or pinyin like '%'+#{product}+'%') " )
    List<Ruku> queryList(String ks,String js,String product);

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,num,remarks,state from ruku r left join product p " +
            "on r.product_id=p.id where staff=#{staff}")
    List<Ruku> getListByName(String staff);

    @Select("select r.id,product_id,riqi,warehouse,staff,product_name,spec,unit,pihao,num,remarks,state from ruku r left join product " +
            "p on r.product_id=p.id where convert(date,riqi)>=#{ks} and convert(date,riqi)<=#{js} and (product_name like " +
            "'%'+#{product}+'%' or pinyin like '%'+#{product}+'%') and staff=#{staff} " )
    List<Ruku> queryListByName(String ks,String js,String product,String staff);

    @Update("update ruku set state=#{state} where id=#{id}")
    boolean updateState(String state, int id);

}
