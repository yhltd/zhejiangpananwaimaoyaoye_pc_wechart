package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.ApprovalItem;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 23:11
 */
@Service
public interface ApprovalItemService extends IService<ApprovalItem> {
    List<ApprovalItem> getList(int approvalId);

    ApprovalItem add(ApprovalItem approvalItem);

    boolean shenhe(String state, int id);

    boolean delete(List<Integer> idList);

    List<ApprovalItem> getAllList();

    boolean update(String state,int approvalId);

}
