package com.soop.jwtsecurity.mapper;

import com.soop.jwtsecurity.entityDTO.RefreshEntity;
import com.soop.jwtsecurity.entityDTO.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    UserEntity findByUsername(String username);

    Boolean existsByRefresh(String refresh);

    void deleteByRefresh(String refresh);

    void saveUserEntity(UserEntity userEntity);

    void saveRefreshEntity(RefreshEntity refreshEntity);

    String searchRefreshEntity(String username);

}
