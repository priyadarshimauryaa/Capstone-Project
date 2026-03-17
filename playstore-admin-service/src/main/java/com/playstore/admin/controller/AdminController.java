package com.playstore.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.playstore.admin.model.App;
import com.playstore.admin.service.AppService;

@RestController
@RequestMapping("/admin/apps")
public class AdminController {

    @Autowired
    private AppService service;

    @PostMapping
    public App addApp(@RequestBody App app) {
        return service.addApp(app);
    }

    @GetMapping
    public List<App> getApps() {
        return service.getAllApps();
    }

    @PutMapping("/{id}")
    public App updateApp(@PathVariable Long id, @RequestBody App app) {
        return service.updateApp(id, app);
    }

    @DeleteMapping("/{id}")
    public void deleteApp(@PathVariable Long id) {
        service.deleteApp(id);
    }
}