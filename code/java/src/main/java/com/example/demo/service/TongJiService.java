package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.TongJi;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 13:39
 */
@Service
public interface TongJiService extends IService<TongJi> {
    List<TongJi> getList(String ks, String js, String customer, String name, String power);
}
