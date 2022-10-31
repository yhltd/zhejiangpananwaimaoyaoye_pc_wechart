package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Payment;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/23 11:13
 */
@Service
public interface PaymentService extends IService<Payment> {
    /**
     * 查询所有
     */
    List<Payment> getList(String name, String power);

    /**
     * 查询所有
     */
    List<Payment> kanbanList(String riqi,String riqi1,String riqi2, String name, String power);

    /**
     * 查询所有
     */
    List<Payment> getKanban(String riqi, String riqi1,String riqi2,String name,String power);

    /**
     * 根据条件查询
     */
    List<Payment> queryList(String customer, String name, String power);

    /**
     * 添加
     */
    Payment add(Payment payment);

    /**
     * 修改
     */
    boolean update(Payment payment);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

    /**
     * 审核
     */
    boolean updateState(String state, int id);

}
