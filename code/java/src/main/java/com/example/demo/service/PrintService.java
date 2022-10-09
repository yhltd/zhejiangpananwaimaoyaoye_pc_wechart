package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Print;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/23 11:13
 */
@Service
public interface PrintService extends IService<Print> {

    /**
     * 查询所有
     */
    List<Print> getList();


    /**
     * 根据条件查询
     */
    List<Print> queryList(String type, String danwei);


    /**
     * 添加
     */
    Print add(Print print);

    /**
     * 修改
     */
    boolean update(Print print);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);
}
