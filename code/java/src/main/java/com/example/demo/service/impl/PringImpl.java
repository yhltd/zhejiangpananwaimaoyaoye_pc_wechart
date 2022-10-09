package com.example.demo.service.impl;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Print;
import com.example.demo.mapper.PaymentMapper;
import com.example.demo.mapper.PrintMapper;
import com.example.demo.service.PrintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PringImpl extends ServiceImpl<PrintMapper, Print> implements PrintService {

    @Autowired
    PrintMapper printMapper;

    @Override
    public List<Print> getList() {
        return printMapper.getList();
    }

    @Override
    public List<Print> queryList(String type,String danwei) {
        return printMapper.queryList(type,danwei);
    }

    @Override
    public Print add(Print print) {
        return save(print) ? print : null;
    }

    @Override
    public boolean update(Print print) {
        return updateById(print);
    }

    @Override
    public boolean delete(List<Integer> idList) {
        return removeByIds(idList);
    }

}
