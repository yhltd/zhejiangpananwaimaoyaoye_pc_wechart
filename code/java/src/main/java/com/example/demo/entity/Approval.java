package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/9/1 21:09
 */
@Data
@TableName("approval")
public class Approval {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 姓名
     */
    private String staff;

    /**
     * 类别
     */
    private String type;

    /**
     * 状态
     */
    private String state;
}
