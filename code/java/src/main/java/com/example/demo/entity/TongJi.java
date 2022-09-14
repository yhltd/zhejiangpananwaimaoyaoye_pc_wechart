package com.example.demo.entity;

import lombok.Data;

/**
 * @author hui
 * @date 2022/9/1 13:30
 */
@Data
public class TongJi {
    /**
     *  客户id
     */
    private Integer id;

    /**
     *  客户
     */
    private String customer;

    /**
     *  本期购货
     */
    private double xs;

    /**
     *  本期退货
     */
    private double th;

    /**
     *  返款金额
     */
    private double fankuan;

    /**
     *  付款金额
     */
    private double fukuan;

    /**
     *  折扣金额
     */
    private double zhekou;

    /**
     *  赠送金额
     */
    private double zengsong;

    /**
     *  余额
     */
    private double yue;

    /**
     *  销售往期余额
     */
    private String xswqye;

    /**
     *  赠送往期余额
     */
    private String zswqye;
}
