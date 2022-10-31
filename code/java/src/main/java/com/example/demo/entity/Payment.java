package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/8/23 10:44
 */
@Data
@TableName("payment")
public class Payment {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 日期
     */
    private String riqi;

    /**
     * 客户id
     */
    private Integer customerId;

    /**
     * 付款方式
     */
    private String pay;

    /**
     * 返款金额
     */
    private String rJine;

    /**
     * 付款金额
     */
    private String fJine;

    /**
     * 折扣
     */
    private String quota;

    /**
     * 赠送额度
     */
    private String discount;

    /**
     * 赠送额度
     */
    private String remarks;

    /**
     * 客户
     */
    private String customer;

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
