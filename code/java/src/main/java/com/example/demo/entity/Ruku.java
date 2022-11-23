package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/8/30 15:36
 */
@Data
@TableName("ruku")
public class Ruku {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     *  日期
     */
    private String riqi;

    /**
     *  仓库
     */
    private String warehouse;

    /**
     *  入库员
     */
    private String staff;

    /**
     *  产品名称
     */
    private String productId;

    /**
     *  批号
     */
    private String pihao;

    /**
     *  数量
     */
    private String num;

    /**
     *  备注
     */
    private String remarks;

    /**
     *  审核状态
     */
    private String state;

    /**
     *  产品名称
     */
    private String productName;

    /**
     *  规格
     */
    private String spec;

    /**
     *  unit
     */
    private String unit;

    /**
     *  生产日期
     */
    private String productDate;

    /**
     *  品号
     */
    private String pinhao;

    /**
     *  产品属性
     */
    private String attribute;

    /**
     *  有效期
     */
    private String validity;

}
