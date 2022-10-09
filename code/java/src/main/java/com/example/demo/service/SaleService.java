package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Sale;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/31 11:26
 */
@Service
public interface SaleService extends IService<Sale> {
    /**
     * 查询
     */
    List<Sale> getList(String name, String power);

    /**
     * 查询
     */
    List<Sale> getList_shenhezhong(String name, String power);

    /**
     * 查询
     */
    List<Sale> getList_tongguo(String name, String power);

    /**
     * 查询
     */
    List<Sale> getList_weitongguo(String name, String power);

    /**
     * 条件查询
     */
    List<Sale> queryList(String ks, String js, String customer, String product, String pihao , String saleType, String name, String power);

    /**
     * 查询所有
     */
    List<Sale> getKanban(String riqi, String riqi1, String riqi2, String name, String power);

    /**
     * 新增
     */
    Sale add(Sale sale);

    /**
     * 修改
     */
    boolean update(Sale sale);

    /**
     * 删除
     */
    boolean delete(List<Integer> idList);

    /**
     * 审核
     */
    boolean updateSaleState(String saleState,String warehouse, int id);

}
