package com.playstore.capstone.repository;

import com.playstore.capstone.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByAppId(Long appId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.appId = :appId")
    Double getAverageRating(@Param("appId") Long appId);
}