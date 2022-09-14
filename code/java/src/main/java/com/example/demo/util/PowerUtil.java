package com.example.demo.util;

import com.example.demo.entity.UserPower;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * @author wanghui
 * @date 2021/1/23 15:07
 */
public class PowerUtil{

    private List<UserPower> powerList;

    private PowerUtil(){}

    private static PowerUtil powerUtil;

    public static PowerUtil getPowerUtil(HttpSession session){
        if(StringUtils.isNull(powerUtil)){
            powerUtil = new PowerUtil();
        }
        powerUtil.powerList = SessionUtil.getPower(session);
        return powerUtil;
    }

    public boolean isAdd(String viewName) {
        try{
            for(UserPower userPower : powerList){
                if(userPower.getViewName().equals(viewName)){
                    return userPower.getZeng().equals("可操作");
                }
            }
        }catch (Exception e){
            return false;
        }
        return false;
    }

    public boolean isDelete(String viewName) {
        try{
            for(UserPower userPower : powerList){
                if(userPower.getViewName().equals(viewName)){
                    return userPower.getShan().equals("可操作");
                }
            }
        }catch (Exception e){
            return false;
        }
        return false;
    }

    public boolean isUpdate(String viewName) {
        try{
            for(UserPower userPower : powerList){
                if(userPower.getViewName().equals(viewName)){
                    return userPower.getGai().equals("可操作");
                }
            }
        }catch (Exception e){
            return false;
        }
        return false;
    }

    public boolean isSelect(String viewName) {
        try{
            for(UserPower userPower : powerList){
                if(userPower.getViewName().equals(viewName)){
                    return userPower.getCha().equals("可操作");
                }
            }
        }catch (Exception e){
            return false;
        }
        return false;
    }
}
