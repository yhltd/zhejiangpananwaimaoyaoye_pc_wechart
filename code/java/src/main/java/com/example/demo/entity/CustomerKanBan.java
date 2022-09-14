package com.example.demo.entity;

import lombok.Data;

/**
 * @author hui
 * @date 2022/9/1 8:55
 */
@Data
public class CustomerKanBan {

    /**
     * 销售
     */
    private String xs;

    /**
     * 赠送
     */
    private String zs;

    /**
     * 销售往期余额
     */
    private double xswqye;

    /**
     * 赠送往期余额
     */
    private double zswqye;

    /**
     * 本期购货
     */
    private double bqgh;

    /**
     * 本期退货
     */
    private double bqth;

    /**
     * 已付
     */
    private double yf;

    /**
     * 折扣
     */
    private double zhekou;

    /**
     * 返款金额
     */
    private double fkjine;

    /**
     * 销售余额
     */
    private double xsyue;

    /**
     * 赠送余额
     */
    private double zsyue;

    /**
     * 本期赠送
     */
    private double bqzs;

    /**
     * 开票金额
     */
    private double kpjine;
}
