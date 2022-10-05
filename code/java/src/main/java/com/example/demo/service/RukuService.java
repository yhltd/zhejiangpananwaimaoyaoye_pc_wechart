package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Ruku;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/30 15:40
 */
@Service
public interface RukuService extends IService<Ruku> {
    /**
     * 查询
     */
    List<Ruku> getList(String staff,String power);

    /**
     * 查询审核中
     */
    List<Ruku> getList_shenhezhong(String staff,String power);

    /**
     * 查询通过审核
     */
    List<Ruku> getList_tongguo(String staff,String power);

    /**
     * 查询未通过审核
     */
    List<Ruku> getList_weitongguo(String staff,String power);

    /**
     * 条件查询
     */
    List<Ruku> queryList(String ks, String js, String product, String pihao,String staff,String power);

    /**
     * 新增
     */
    Ruku add(Ruku ruku);

    /**
     * 修改
     */
    boolean update(Ruku ruku);

    /**
     * 删除
     */
    boolean delete(List<Integer> idList);

    /**
     * 审核
     */
    boolean updateState(String state, int id);
}
