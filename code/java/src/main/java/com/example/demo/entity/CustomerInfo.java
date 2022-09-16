package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/8/22 14:07
 */
@Data
@TableName("CustomerInfo")
public class CustomerInfo {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 添加日期
     */
    private String riqi;

    /**
     * 客户
     */
    private String customer;

    /**
     * 字母代码
     */
    private String pinyin;

    /**
     * 字母代码
     */
    private String salesman;

    /**
     * 价格
     */
    private String price;

    /**
     * 电话
     */
    private String phone;

    /**
     * 地址
     */
    private String address;

    /**
     *  往期购货余额
     */
    private String ghye;

    /**
     *  往期赠送余额
     */
    private String zsye;


    /**
     *  客户号
     */
    private String customerNum;


    /**
     *  备注
     */
    private String remarks;

    /**
     *  客户类别
     */
    private String leibie;

}
