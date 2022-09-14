package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Product;
import com.example.demo.mapper.KuCunMapper;
import com.example.demo.service.KuCunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/31 16:35
 */
@Service
public class KuCunImpl extends ServiceImpl<KuCunMapper, Product> implements KuCunService {
    @Autowired
    KuCunMapper kuCunMapper;

    @Override
    public List<Product> getSale() {
        return kuCunMapper.getSale();
    }

    @Override
    public List<Product> getRuku() {
        return kuCunMapper.getRuku();
    }

    @Override
    public List<Product> querySale(String ks,String js,String product) {
        return kuCunMapper.querySale(ks,js,product);
    }

    @Override
    public List<Product> queryRuku(String ks,String js,String product) {
        return kuCunMapper.queryRuku(ks,js,product);
    }

}
