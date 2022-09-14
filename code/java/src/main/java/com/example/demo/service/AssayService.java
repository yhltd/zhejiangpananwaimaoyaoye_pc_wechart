package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Assay;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/29 16:49
 */
@Service
public interface AssayService extends IService<Assay> {
    /**
     * 查询
     */
    List<Assay> getList();

    /**
     * 根据批号查询
     */
    List<Assay> queryList(String pihao);

    /**
     * 添加
     */
    Assay add(Assay assay);

    /**
     * 修改
     */
    boolean update(Assay assay);

    /**
     * 删除
     */
    boolean delete(List<Integer> idList);

}
