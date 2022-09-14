package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/9/2 8:24
 */
@Data
@TableName("userPower")
public class UserPower {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;
    /**
     * 用户名
     */
    private Integer userId;
    /**
     * 页面名称
     */
    private String viewName;
    /**
     * 增
     */
    private String zeng;
    /**
     * 删
     */
    private String shan;
    /**
     * 改
     */
    private String gai;
    /**
     * 查
     */
    private String cha;
    /**
     * 姓名
     */
    private String name;
}
