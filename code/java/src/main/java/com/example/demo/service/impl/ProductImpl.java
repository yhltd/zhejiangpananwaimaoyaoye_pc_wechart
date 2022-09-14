package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Product;
import com.example.demo.mapper.ProductMapper;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/19 16:37
 */
@Service
public class ProductImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {
    @Autowired
    ProductMapper productMapper;

    @Override
    public List<Product> getList() {
        return productMapper.getList();
    }

    @Override
    public List<Product> queryList(String query) {
        return productMapper.queryList(query);
    }

    @Override
    public Product add(Product product) {
        return save(product) ? product : null;
    }

    @Override
    public boolean update(Product product) {
        return updateById(product);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
