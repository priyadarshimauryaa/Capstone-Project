package com.playstore.capstone.repository;

import com.playstore.capstone.model.Download;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DownloadRepository extends JpaRepository<Download, Long> {

    long countByAppId(Long appId);

    // USER INSTALLED APPS
    List<Download> findByUserId(Long userId);

    // ⭐ UNINSTALL APP
    void deleteByAppIdAndUserId(Long appId, Long userId);

}