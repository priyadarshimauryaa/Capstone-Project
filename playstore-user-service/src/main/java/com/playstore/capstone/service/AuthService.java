package com.playstore.capstone.service;

import com.playstore.capstone.model.User;
import com.playstore.capstone.repository.UserRepository;
import com.playstore.capstone.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User register(User user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if(user.getEmail().equals("admin@gmail.com")){
            user.setRole("ADMIN");
        } else{
            user.setRole("USER");
        }

        return userRepository.save(user);
    }

    public String login(String email, String password){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(passwordEncoder.matches(password, user.getPassword())){
            return jwtUtil.generateToken(email);
        }

        throw new RuntimeException("Invalid password");
    }
}