package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Invoice;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/23 14:55
 */
@Service
public interface InvoiceService extends IService<Invoice> {
    /**
     * 查询所有
     */
    List<Invoice> getList(String name, String power);
    /**
     * 查询所有
     */
    List<Invoice> getListlist();

    /**
     * 根据条件查询
     */
    List<Invoice> queryList(String customer,String unit,String unit1, String name, String power);

    /**
     * 添加
     */
    Invoice add(Invoice invoice);

    /**
     * 修改
     */
    boolean update(Invoice invoice);

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
