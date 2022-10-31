package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/8/23 14:53
 */
@Data
@TableName("invoice")
public class Invoice {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 客户id
     */
    private Integer customerId;

    /**
     * 日期
     */
    private String riqi;

    /**
     * 开票单位
     */
    private String unit;

    /**
     * 开票金额
     */
    private String jine;

    /**
     * 备注
     */
    private String remarks;

    /**
     * 客户
     */
    private String customer;

    /**
     * 品名
     */
    private String nameofarticle;

    /**
     * 单价
     */
    private String unitprice;

    /**
     * 发票号码
     */
    private String thebillingnumber;

    /**
     * 税号
     */
    private String shuihao;

    /**
     * 单位地址
     */
    private String address;

    /**
     * 电话号码
     */
    private String phone;

    /**
     * 开户银行
     */
    private String yinhang;

    /**
     * 银行账户
     */
    private String zhanghu;

    /**
     * 审核状态
     */
    private String state;

    /**
     *  客户号
     */
    private String customerNum;

    /**
     *  区域
     */
    private String area;

    /**
     *  客户类别
     */
    private String leibie;
}
