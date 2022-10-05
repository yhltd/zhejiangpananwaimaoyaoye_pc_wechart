package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.AnYueTongJi;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/9/1 18:04
 */
@Service
public interface AnYueTongJiService extends IService<AnYueTongJi> {
    List<AnYueTongJi> getXSByAdmin(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer);

    List<AnYueTongJi> getTHByAdmin(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer);

    List<AnYueTongJi> getfkByAdmin(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer);

    List<AnYueTongJi> getHKByAdmin(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer);



    List<AnYueTongJi> getXSByOther(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer,String name);

    List<AnYueTongJi> getTHByOther(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer,String name);

    List<AnYueTongJi> getfkByOther(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer,String name);

    List<AnYueTongJi> getHKByOther(String ks1,String js1,String ks2,String js2,String ks3,String js3,String ks4,String js4,String ks5,String js5,String ks6,String js6,String ks7,String js7,String ks8,String js8,String ks9,String js9,String ks10,String js10,String ks11,String js11,String ks12,String js12,String customer,String name);
}
