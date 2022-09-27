package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.General;
import com.example.demo.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/19 16:34
 */
@Service
public interface ProductService extends IService<Product> {
    /**
     * 查询所有
     */
    List<Product> getList();

    /**
     * 根据产品名称查询
     */
    List<Product> queryList(String query);

    /**
     * 添加
     */
    Product add(Product product);

    /**
     * 修改
     */
    boolean update(Product product);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

    List<Product> getListByProduct();
}
