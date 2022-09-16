package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/8/19 14:33
 */
@Data
@TableName("general")
public class General {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 销售姓名
     */
    private String saleName;

    /**
     * 化验姓名
     */
    private String testName;

    /**
     * 快递方式
     */
    private String express;

    /**
     * 客户拿货方式
     */
    private String pick;

    /**
     * 支付方式
     */
    private String pay;

    /**
     * 部门
     */
    private String warehouse;

    /**
     * 部门
     */
    private String department;

    /**
     * 部门
     */
    private String customerType;
}
