package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @author hui
 * @date 2022/8/24 15:52
 */
@Data
@TableName("fileTable")
public class FileTable {
    /**
     * id自增列
     */
    @TableId(value = "id" , type = IdType.AUTO)
    private Integer id;

    /**
     * 文件
     */
    private String files;

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 类型
     */
    private String type;

    /**
     * 其他id
     */
    private Integer otherId;
}
