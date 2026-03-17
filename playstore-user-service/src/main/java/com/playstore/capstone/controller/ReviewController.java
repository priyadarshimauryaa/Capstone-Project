package com.playstore.capstone.controller;

import com.playstore.capstone.model.Review;
import com.playstore.capstone.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // Add review
    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }

    // Get reviews by app
    @GetMapping("/app/{appId}")
    public List<Review> getReviewsByApp(@PathVariable Long appId) {
        return reviewRepository.findByAppId(appId);
    }

    // Get average rating
    @GetMapping("/rating/{appId}")
    public Double getAverageRating(@PathVariable Long appId) {
        Double rating = reviewRepository.getAverageRating(appId);
        return rating != null ? rating : 0.0;
    }
    @GetMapping
    public List<Review> getAllReviews() {
    return reviewRepository.findAll();
}
}