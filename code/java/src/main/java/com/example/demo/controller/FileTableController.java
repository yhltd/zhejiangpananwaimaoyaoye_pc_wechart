package com.example.demo.controller;

import com.example.demo.entity.CustomerInfo;
import com.example.demo.entity.FileTable;
import com.example.demo.entity.UserInfo;
import com.example.demo.service.FileTableService;
import com.example.demo.util.GsonUtil;
import com.example.demo.util.ResultInfo;
import com.example.demo.util.SessionUtil;
import com.example.demo.util.StringUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @author hui
 * @date 2022/8/24 16:30
 */
@Slf4j
@RestController
@RequestMapping("/file_table")
public class FileTableController {
    @Autowired
    FileTableService fileTableService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(int otherId, String type, HttpSession session) {
        try {
            List<FileTable> getList = fileTableService.getList(otherId, type);
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 下载文件
     *
     * @return ResultInfo
     */
    @RequestMapping("/getFile")
    public ResultInfo getFile(int id, HttpSession session) {
        try {
            List<FileTable> getList = fileTableService.getFile(id);
            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

    /**
     * 下载文件
     *
     * @return ResultInfo
     */
    @RequestMapping("/getFile2")
    public ResultInfo getFile2(int id, String type, HttpSession session) {
        try {
            List<FileTable> getList = fileTableService.getFile2(id, type);
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
    public ResultInfo add(@RequestBody HashMap map, HttpSession session) {
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        try {
            FileTable fileTable = GsonUtil.toEntity(gsonUtil.get("addInfo"), FileTable.class);
            fileTable = fileTableService.add(fileTable);
            if (StringUtils.isNotNull(fileTable)) {
                return ResultInfo.success("添加成功", fileTable);
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
     * 删除
     *
     * @return ResultInfo
     */
    @RequestMapping("/delete")
    public ResultInfo delete(@RequestBody HashMap map, HttpSession session) {
        GsonUtil gsonUtil = new GsonUtil(GsonUtil.toJson(map));
        List<Integer> idList = GsonUtil.toList(gsonUtil.get("idList"), Integer.class);
        try {
            if (fileTableService.delete(idList)) {
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
