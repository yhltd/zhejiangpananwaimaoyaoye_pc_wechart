package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Payment;
import com.example.demo.mapper.PaymentMapper;
import com.example.demo.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/23 11:16
 */
@Service
public class PaymentImpl extends ServiceImpl<PaymentMapper, Payment> implements PaymentService {
    @Autowired
    PaymentMapper paymentMapper;

    @Override
    public List<Payment> getList(String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return paymentMapper.getList();
        } else {
            return paymentMapper.getListByName(name);
        }
    }

    @Override
    public List<Payment> getKanban(String riqi,String riqi1, String riqi2,String name,String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return paymentMapper.getKanban(riqi);
        } else {
            return paymentMapper.getKanbanByName(riqi1,riqi2,name);
        }
    }

    @Override
    public List<Payment> queryList(String customer, String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return paymentMapper.queryList(customer);
        } else {
            return paymentMapper.queryListByName(customer, name);
        }
    }

    @Override
    public List<Payment> kanbanList(String riqi,String riqi1,String riqi2, String name, String power) {
        if (power.equals("管理员") || power.equals("审核人")) {
            return paymentMapper.kanbanList(riqi);
        } else {
            return paymentMapper.kanbanListByName(riqi1,riqi2,name);
        }
    }

    @Override
    public Payment add(Payment payment) {
        return save(payment) ? payment : null;
    }

    @Override
    public boolean update(Payment payment) {
        return updateById(payment);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public boolean updateState(String state, int id) {
        return paymentMapper.updateState(state, id);
    }
}
