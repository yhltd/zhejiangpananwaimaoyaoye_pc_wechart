package com.example.demo.controller;

import com.example.demo.entity.Approval;
import com.example.demo.entity.ApprovalItem;
import com.example.demo.entity.Assay;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.ApprovalItemService;
import com.example.demo.service.ApprovalService;
import com.example.demo.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 22:17
 */
@Slf4j
@RestController
@RequestMapping("/approval")
public class ApprovalController {
    @Autowired
    ApprovalService approvalService;
    @Autowired
    ApprovalItemService approvalItemService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("审核管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Approval> getList = approvalService.getList();
            List<ApprovalItem> getAllList = approvalItemService.getAllList();
            List<Approval> list = new ArrayList<>();
            for (Approval approval : getList) {
                for (ApprovalItem approvalItem : getAllList) {
                    if ((userInfo.getId().equals(approvalItem.getUserId()) && approvalItem.getApprovalId().equals(approval.getId())) || approval.getStaff().equals(userInfo.getName())) {
                        list.add(approval);
                    }
                }
            }
            if (userInfo.getPower().equals("管理员")) {
                return ResultInfo.success("获取成功", list);
            } else {
                return ResultInfo.success("获取成功", getList);
            }

        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/queryList")
    public ResultInfo queryList(String type, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isSelect("审核管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            List<Approval> getList = approvalService.queryList(type);
            List<ApprovalItem> getAllList = approvalItemService.getAllList();
            List<Approval> list = new ArrayList<>();
            for (Approval approval : getList) {
                for (ApprovalItem approvalItem : getAllList) {
                    if ((userInfo.getId().equals(approvalItem.getUserId()) && approvalItem.getApprovalId().equals(approval.getId())) || approval.getStaff().equals(userInfo.getName())) {
                        list.add(approval);
                    }
                }
            }
            if (userInfo.getPower().equals("管理员")) {
                return ResultInfo.success("获取成功", list);
            } else {
                return ResultInfo.success("获取成功", getList);
            }
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
    public ResultInfo add(@RequestBody HashMap map, HttpSession session) {
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isAdd("审核管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        try {
            Approval approval = GsonUtil.toEntity(gsonUtil.get("addInfo"), Approval.class);
            approval.setStaff(userInfo.getName());
            approval = approvalService.add(approval);
            if (StringUtils.isNotNull(approval)) {
                return ResultInfo.success("添加成功", approval);
            } else {
                return ResultInfo.success("添加失败", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("添加失败：{}", e.getMessage());
            log.error("参数：{}", map);
            return ResultInfo.error("添加失败");
        }
    }

    /**
     * 修改
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResultInfo update(@RequestBody String updateJson, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isUpdate("审核管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        Approval approval = null;
        try {
            approval = DecodeUtil.decodeToJson(updateJson, Approval.class);

            if (approvalService.update(approval) && approvalItemService.update("审核中", approval.getId())) {
                return ResultInfo.success("修改成功", approval);
            } else {
                return ResultInfo.success("修改失败", approval);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("修改失败：{}", e.getMessage());
            log.error("参数：{}", approval);
            return ResultInfo.error("修改失败");
        }
    }

    /**
     * 删除
     *
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map, HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);
        PowerUtil powerUtil = PowerUtil.getPowerUtil(session);
        if (!powerUtil.isDelete("审核管理") && !userInfo.getPower().equals("管理员")) {
            return ResultInfo.error(401, "无权限");
        }

        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (approvalService.delete(idList)) {
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
