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
@TableName("printset")
public class Print {

    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 类型
     */
    private String type;

    /**
     * 发货/收货单位
     */
    private String danwei;

    /**
     * 发货/收货地址
     */
    private String address;

    /**
     * 发货/收货联系人
     */
    private String name;

    /**
     * 发货/收货电话
     */
    private String phone;

}
