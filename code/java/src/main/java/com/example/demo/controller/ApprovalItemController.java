package com.example.demo.controller;

import com.example.demo.entity.Approval;
import com.example.demo.entity.ApprovalItem;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.ApprovalItemService;
import com.example.demo.service.ApprovalService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 23:34
 */
@Slf4j
@RestController
@RequestMapping("/approvalItem")
public class ApprovalItemController {
    @Autowired
    ApprovalItemService approvalItemService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(int approvalId) {
        try {
            List<ApprovalItem> getList = approvalItemService.getList(approvalId);
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 添加
     */
    @RequestMapping("/add")
    public ResultInfo add(int userId,int approvalId, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        if (!userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            ApprovalItem approvalItem = new ApprovalItem();
            approvalItem.setApprovalId(approvalId);
            approvalItem.setUserId(userId);
            approvalItem.setState("审核中");
            approvalItem = approvalItemService.add(approvalItem);
            return ResultInfo.success("添加成功", approvalItem);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            return ResultInfo.error("添加失败");
        }
    }

    /**
     *  审核
     * */
    @RequestMapping("/updateState")
    public ResultInfo updateState(String state,int id,int userId , HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        if (!userInfo.getId().equals(userId) || !userInfo.getPower().equals("管理员")){
            return ResultInfo.success("无权限");
        }
        try {
            if (approvalItemService.shenhe(state,id)) {
                return ResultInfo.success("审核成功");
            } else {
                return ResultInfo.success("审核失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("审核失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 删除
     *
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map, HttpSession session) {
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        if (!userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (approvalItemService.delete(idList)) {
                return ResultInfo.success("删除成功", idList);
            } else {
                return ResultInfo.success("删除失败", idList);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("删除失败：{}", e.getMessage());
            log.error("参数：{}", idList);
            return ResultInfo.error("删除失败");
        }
    }

}
