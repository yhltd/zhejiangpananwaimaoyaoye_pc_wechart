package com.example.demo.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.FileTable;
import com.example.demo.mapper.FileTableMapper;
import com.example.demo.service.FileTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author hui
 * @date 2022/8/24 16:23
 */
@Service
public class FileTableImpl extends ServiceImpl<FileTableMapper, FileTable> implements FileTableService {
    @Autowired
    FileTableMapper fileTableMapper;

    @Override
    public List<FileTable> getList(int otherId, String type) {
        return fileTableMapper.getList(otherId, type);
    }

    @Override
    public FileTable add(FileTable fileTable) {
        return save(fileTable) ? fileTable : null;
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

    @Override
    public List<FileTable> getFile(int id) {
        return fileTableMapper.getFile(id);
    }

    @Override
    public List<FileTable> getFile2(int id, String type) {
        return fileTableMapper.getFile2(id,type);
    }
}
