package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.CustomerInfo;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/22 14:19
 */
@Service
public interface CustomerInfoService extends IService<CustomerInfo> {
    /**
     * 查询所有
     */
    List<CustomerInfo> getList(String name, String power);

    /**
     * 根据条件查询
     */
    List<CustomerInfo> queryList(String customerInfo,String leibie, String name, String power);

    /**
     * 添加
     */
    CustomerInfo add(CustomerInfo customerInfo);

    /**
     * 修改
     */
    boolean update(CustomerInfo customerInfo);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

}
