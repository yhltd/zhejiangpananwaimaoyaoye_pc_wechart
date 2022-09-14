package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.Approval;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 22:10
 */
@Service
public interface ApprovalService extends IService<Approval> {
    List<Approval> getList();

    List<Approval> queryList(String type);

    Approval add(Approval approval);

    boolean update(Approval approval);

    boolean delete(List<Integer> idList);
}
