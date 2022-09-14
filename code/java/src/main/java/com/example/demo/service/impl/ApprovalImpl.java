package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Approval;
import com.example.demo.mapper.ApprovalMapper;
import com.example.demo.service.ApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 22:12
 */
@Service
public class ApprovalImpl extends ServiceImpl<ApprovalMapper, Approval> implements ApprovalService {
    @Autowired
    ApprovalMapper approvalMapper;

    @Override
    public List<Approval> getList() {
        return approvalMapper.getList();
    }

    @Override
    public List<Approval> queryList(String type) {
        return approvalMapper.queryList(type);
    }

    @Override
    public Approval add(Approval approval) {
        return save(approval) ? approval : null;
    }

    @Override
    public boolean update(Approval approval) {
        return updateById(approval);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }
}
