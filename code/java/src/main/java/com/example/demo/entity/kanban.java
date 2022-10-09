package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/8/23 14:53
 */
@Data
@TableName("sale")
public class kanban {
    /**
     * 类型
     */
    private String type;

    /**
     * 日期
     */
    private String riqi;

    /**
     * 客户
     */
    private String customer;

    /**
     * 状态
     */
    private String state;

    /**
     * 业务员
     */
    private String salesman;

}
