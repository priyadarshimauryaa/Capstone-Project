package com.playstore.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.playstore.admin.model.App;

public interface AppRepository extends JpaRepository<App, Long> {
}