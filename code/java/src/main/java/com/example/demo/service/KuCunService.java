package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/31 16:32
 */
@Service
public interface KuCunService extends IService<Product> {
    /**
     *  查询
     * */
    List<Product> getSale();

    /**
     *  查询
     * */
    List<Product> getRuku();

    /**
     *  查询
     * */
    List<Product> querySale(String warehouse,String pihao,String product);

    /**
     *  查询
     * */
    List<Product> queryRuku(String warehouse,String pihao,String product);

}
