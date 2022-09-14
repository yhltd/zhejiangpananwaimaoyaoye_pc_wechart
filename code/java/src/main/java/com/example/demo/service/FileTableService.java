package com.example.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.demo.entity.FileTable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/24 15:57
 */
@Service
public interface FileTableService extends IService<FileTable> {
    /**
     * 查询
     * */
    List<FileTable>getList(int otherId, String type);

    /**
     * 添加
     * */
    FileTable add(FileTable fileTable);

    /**
     * 删除
     * */
    boolean delete(List<Integer>idList);

    /**
     *  下载文件
     * */
    List<FileTable> getFile(int id);

    /**
     *  下载文件2
     * */
    List<FileTable> getFile2(int id,String type);
}
