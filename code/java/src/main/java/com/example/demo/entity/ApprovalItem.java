package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/9/1 22:51
 */
@Data
@TableName("approvalItem")
public class ApprovalItem {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    private Integer approvalId;

    private Integer userId;

    private String state;

    private String name;
}
