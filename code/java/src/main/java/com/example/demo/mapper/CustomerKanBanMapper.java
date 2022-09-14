package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.CustomerKanBan;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 9:03
 */
@Mapper
@Repository
public interface CustomerKanBanMapper extends BaseMapper<CustomerKanBan> {
    @Select("select isnull(sum(case when type='销售' then convert(float,xiaoji) else 0 end),0) as bqgh,isnull(sum(case when type='退货' then convert(float,xiaoji) else 0 end),0) as bqth from sale where customer_id=#{customerId}")
    List<CustomerKanBan> getSale(int customerId);

    @Select("select isnull(sum(convert(float,f_jine)),0) as yf,isnull(sum(convert(float,discount)),0) zhekou,isnull(sum(convert(float,r_jine)),0) as fkjine,isnull(sum(convert(float,quota)),0) as bqzs from payment where customer_id=#{customerId}")
    List<CustomerKanBan> getPayment(int customerId);

    @Select("select isnull(convert(float,ghye),0) as xswqye,isnull(convert(float,zsye),0) as zswqye from customerInfo where id=#{customerId}")
    List<CustomerKanBan> getWQYE(int customerId);

    @Select("select isnull(sum(convert(float,jine)),0) as kpjine from invoice where customer_id=#{invoice}")
    List<CustomerKanBan> getInvoice(int customerId);

}
