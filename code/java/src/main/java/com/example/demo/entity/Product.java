package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/8/19 16:26
 */
@Data
@TableName("product")
public class Product {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 产品名
     */
    private String productName;

    /**
     * 规格型号
     */
    private String spec;

    /**
     * 单位
     */
    private String unit;

    /**
     * 价格
     */
    private String price;

    /**
     * 拼音简码
     */
    private String pinyin;

    /**
     *  数量
     * */
    private double num;

    /**
     *  品号
     * */
    private String pinhao;

    /**
     *  产品属性
     * */
    private String attribute;

    /**
     *  整箱量
     * */
    private String container;

    /**
     *  仓库
     * */
    private String warehouse;

    /**
     *  批号
     * */
    private String pihao;
}
