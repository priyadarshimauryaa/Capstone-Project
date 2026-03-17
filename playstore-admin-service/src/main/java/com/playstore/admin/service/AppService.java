package com.playstore.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.playstore.admin.model.App;
import com.playstore.admin.repository.AppRepository;

@Service
public class AppService {

    @Autowired
    private AppRepository repository;

    public App addApp(App app) {
        return repository.save(app);
    }

    public List<App> getAllApps() {
        return repository.findAll();
    }

    public void deleteApp(Long id) {
        repository.deleteById(id);
    }

    public App updateApp(Long id, App app) {

        App existing = repository.findById(id).orElseThrow();

        existing.setName(app.getName());
        existing.setCategory(app.getCategory());
        existing.setDeveloper(app.getDeveloper());
        existing.setDescription(app.getDescription());
        existing.setImage(app.getImage());

        return repository.save(existing);
    }
}