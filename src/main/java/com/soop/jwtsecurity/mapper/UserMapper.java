package com.soop.jwtsecurity.mapper;

import com.soop.jwtsecurity.entityDTO.RefreshEntity;
import com.soop.jwtsecurity.entityDTO.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    UserEntity findBySignupPlatform(String signupPlatform);
    UserEntity findAboutMe(String signupPlatform);

    Boolean existsByRefresh(@Param("refresh") String refresh);

    void deleteByRefresh(@Param("refresh") String refresh);

    void saveUserEntity(UserEntity userEntity);

    void saveRefreshEntity(RefreshEntity refreshEntity);

    String searchRefreshEntity(String signupPlatform);

    String googleGender(String gender);
    void saveAboutMe(@Param("aboutme") String aboutme, @Param("signupPlatform") String signupPlatform,@Param("nickname") String nickname);
}