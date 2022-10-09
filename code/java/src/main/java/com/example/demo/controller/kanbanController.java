package com.example.demo.controller;

import com.example.demo.entity.UserInfo;
import com.example.demo.entity.kanban;
import com.example.demo.service.kanbanService;
import com.example.demo.util.GsonUtil;
import com.example.demo.util.ResultInfo;
import com.example.demo.util.SessionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/gerenkanban")
public class kanbanController {

    @Autowired
    kanbanService kanbanService;

    /**
     * 查询所有
     *
     * @return ResultInfo
     */
    @RequestMapping("/getList")
    public ResultInfo getList(HttpSession session) {
        UserInfo userInfo = GsonUtil.toEntity(SessionUtil.getToken(session), UserInfo.class);

        try {
            List<kanban> getList = new ArrayList<>();
            List<kanban> getRuku = kanbanService.getRuku(userInfo.getName(), userInfo.getPower());
            List<kanban> getSale = kanbanService.getSale(userInfo.getName(), userInfo.getPower());
            List<kanban> getChuku = kanbanService.getChuku(userInfo.getName(), userInfo.getPower());

            for(int i=0; i<getRuku.size(); i++){
                kanban kanban = new kanban();
                kanban.setRiqi(getRuku.get(i).getRiqi());
                kanban.setCustomer(getRuku.get(i).getCustomer());
                kanban.setType(getRuku.get(i).getType());
                kanban.setState(getRuku.get(i).getState());
                kanban.setSalesman(getRuku.get(i).getSalesman());
                getList.add(kanban);
            }

            for(int i=0; i<getSale.size(); i++){
                kanban kanban = new kanban();
                kanban.setRiqi(getSale.get(i).getRiqi());
                kanban.setCustomer(getSale.get(i).getCustomer());
                kanban.setType(getSale.get(i).getType());
                kanban.setState(getSale.get(i).getState());
                kanban.setSalesman(getSale.get(i).getSalesman());
                getList.add(kanban);
            }

            for(int i=0; i<getChuku.size(); i++){
                kanban kanban = new kanban();
                kanban.setRiqi(getChuku.get(i).getRiqi());
                kanban.setCustomer(getChuku.get(i).getCustomer());
                kanban.setType(getChuku.get(i).getType());
                kanban.setState(getChuku.get(i).getState());
                kanban.setSalesman(getChuku.get(i).getSalesman());
                getList.add(kanban);
            }

            return ResultInfo.success("获取成功", getList);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("获取失败：{}", e.getMessage());
            return ResultInfo.error("错误!");
        }
    }

}
