package com.example.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.entity.kanban;
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
public interface kanbanMapper extends BaseMapper<kanban>{
    @Select("select '入库' as type,riqi,staff as salesman,state from ruku where state = '审核中' group by riqi,staff,state;")
    List<kanban> getRuku();

    @Select("select '销售' as type,s.riqi,customer,salesman,sale_state as state from sale as s left join customerInfo as c on s.customer_id = c.id where sale_state = '审核中' group by s.riqi,customer,salesman,sale_state")
    List<kanban> getSale();

    @Select("select '出库' as type,s.riqi,isnull(customer,'') as customer,isnull(salesman,'') as salesman,fahuo as state from sale as s left join customerInfo as c on s.customer_id = c.id where sale_state = '审核通过' and (fahuo = '未发货' or fahuo='' or fahuo=null) group by s.riqi,customer,salesman,fahuo")
    List<kanban> getChuku();

    @Select("select '入库' as type,riqi,staff as salesman,state from ruku where state = '审核中' and staff=#{name} group by riqi,staff,state;")
    List<kanban> getRukuByName(String name);

    @Select("select '销售' as type,s.riqi,customer,salesman,sale_state as state from sale as s left join customerInfo as c on s.customer_id = c.id where sale_state = '审核中' and salesman =#{name} group by s.riqi,customer,salesman,sale_state")
    List<kanban> getSaleByName(String name);

    @Select("select '出库' as type,s.riqi,isnull(customer,'') as customer,isnull(salesman,'') as salesman,fahuo as state from sale as s left join customerInfo as c on s.customer_id = c.id where (fahuo = '未发货' or fahuo='' or fahuo=null) and sale_state = '审核通过'  and salesman =#{name} group by s.riqi,customer,salesman,fahuo")
    List<kanban> getChukuByName(String name);
}
