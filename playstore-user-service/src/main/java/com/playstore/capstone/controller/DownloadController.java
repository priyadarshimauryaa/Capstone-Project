package com.playstore.capstone.controller;

import com.playstore.capstone.model.Download;
import com.playstore.capstone.repository.DownloadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/downloads")
@CrossOrigin
public class DownloadController {

    @Autowired
    private DownloadRepository downloadRepository;

    // DOWNLOAD APP
    @PostMapping("/{appId}/{userId}")
    public Download downloadApp(@PathVariable Long appId,
                                @PathVariable Long userId) {

        Download download = new Download();
        download.setAppId(appId);
        download.setUserId(userId);
        download.setDownloadTime(LocalDateTime.now());

        return downloadRepository.save(download);
    }

    // UNINSTALL APP
    @DeleteMapping("/{appId}/{userId}")
    public void uninstallApp(@PathVariable Long appId,
                             @PathVariable Long userId) {

        List<Download> downloads = downloadRepository.findByUserId(userId);

        downloads.stream()
                .filter(d -> d.getAppId().equals(appId))
                .forEach(downloadRepository::delete);
    }

    // DOWNLOAD COUNT
    @GetMapping("/count/{appId}")
    public long getDownloadCount(@PathVariable Long appId) {
        return downloadRepository.countByAppId(appId);
    }

    // ALL DOWNLOADS
    @GetMapping
    public List<Download> getDownloads() {
        return downloadRepository.findAll();
    }

    // USER INSTALLED APPS
    @GetMapping("/user/{userId}")
    public List<Long> getUserDownloads(@PathVariable Long userId) {

        List<Download> downloads = downloadRepository.findByUserId(userId);

        return downloads.stream()
                .map(Download::getAppId)
                .collect(Collectors.toList());
    }

}