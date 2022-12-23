package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/8/31 10:32
 */
@Data
@TableName("sale")
public class Sale {
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
     *  客户id
     */
    private Integer customerId;

    /**
     *  收货人
     */
    private String shStaff;

    /**
     *  快递公司
     */
    private String express;

    /**
     *  拿货方式
     */
    private String pick;

    /**
     *  物流单号
     */
    private String wuliuOrder;

    /**
     *  产品id
     */
    private Integer productId;

    /**
     *  批号
     */
    private String pihao;

    /**
     *  数量
     */
    private String num;

    /**
     *  小计
     */
    private String xiaoji;

    /**
     *  备注
     */
    private String remarks;

    /**
     *  仓库
     */
    private String warehouse;

    /**
     *  类型
     */
    private String type;




    /**
     *  业务员
     */
    private String salesman;

    /**
     *  客户
     */
    private String customer;

    /**
     *  收货地址
     */
    private String address;

    /**
     *  产品名
     */
    private String productName;

    /**
     *  规格
     */
    private String spec;

    /**
     *  单位
     */
    private String unit;

    /**
     *  单价
     */
    private String price;

    /**
     *  发货状态
     */
    private String fahuo;

    /**
     *  发货类型
     */
    private String saleType;

    /**
     *  销售审核状态
     */
    private String saleState;

    /**
     *  判断是否从出库表中直接录入，是填1
     */
    private String chukuInsert;

    /**
     *  出库审核状态
     */
    private String chukuState;


    /**
     *  品号
     */
    private String pinhao;

    /**
     *  产品属性
     */
    private String attribute;

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

    /**
     *  客户类别
     */
    private String productDate;

    /**
     *  客户类别
     */
    private String validity;
}
