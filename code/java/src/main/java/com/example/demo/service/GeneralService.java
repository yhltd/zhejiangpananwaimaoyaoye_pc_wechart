package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.General;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/19 14:44
 */
@Service
public interface GeneralService extends IService<General> {
    /**
     * 查询所有
     */
    List<General> getList();

    /**
     * 添加
     */
    General add(General general);

    /**
     * 修改
     */
    boolean update(General general);

    /**
     * 删除
     *
     * @param idList 根据id集合删除
     * @return 是否删除成功
     */
    boolean delete(List<Integer> idList);

    /**
     * 即时修改
     */
    boolean save(String column,String value,int id);
}
