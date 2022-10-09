package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.kanban;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface kanbanService extends IService<kanban>{

    /**
     *  查询
     * */
    List<kanban> getRuku(String name, String power);

    /**
     *  查询
     * */
    List<kanban> getSale(String name, String power);

    /**
     *  查询
     * */
    List<kanban> getChuku(String name, String power);

}
