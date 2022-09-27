package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.CustomerInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/22 14:15
 */
@Mapper
@Repository
public interface CustomerInfoMapper extends BaseMapper<CustomerInfo> {
    @Select("select * from customerInfo")
    List<CustomerInfo> getList();

    @Select("select * from customerInfo where (customer like '%'+ #{customerInfo} +'%' or pinyin like '%'+ #{customerInfo} +'%') and leibie like '%'+ #{leibie} +'%' and area like '%'+ #{area} +'%' " )
    List<CustomerInfo> queryList(String customerInfo,String leibie,String area);
//    and area like '%'+ #{area} +'%'

    @Select("select * from customerInfo where salesman=#{name}")
    List<CustomerInfo> getListByName(String name);

    @Select("select * from customerInfo where (customer like '%'+ #{customerInfo} +'%' or pinyin like '%'+ #{customerInfo} +'%') and salesman = #{name} and leibie like '%'+ #{leibie} +'%' and area like '%'+ #{area} +'%' ")
    List<CustomerInfo> queryListByName(String customerInfo,String leibie,String area, String name);


}