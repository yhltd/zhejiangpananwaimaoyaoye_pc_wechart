package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.ApprovalItem;
import com.example.demo.mapper.ApprovalItemMapper;
import com.example.demo.service.ApprovalItemService;
import com.example.demo.service.ApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 23:31
 */
@Service
public class ApprovalItemImpl extends ServiceImpl<ApprovalItemMapper, ApprovalItem> implements ApprovalItemService {
    @Autowired
    ApprovalItemMapper approvalItemMapper;

    @Override
    public List<ApprovalItem> getList(int approvalId) {
        return approvalItemMapper.getList(approvalId);
    }

    @Override
    public ApprovalItem add(ApprovalItem approvalItem) {
        return save(approvalItem) ? approvalItem : null;
    }

    @Override
    public boolean shenhe(String state, int id) {
        return approvalItemMapper.shenhe(state, id);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public List<ApprovalItem> getAllList() {
        return approvalItemMapper.getAllList();
    }

    @Override
    public boolean update(String state, int approvalId) {
        return approvalItemMapper.update(state,approvalId);
    }
}
