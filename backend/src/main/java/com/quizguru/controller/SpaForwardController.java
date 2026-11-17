package com.quizguru.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping({
            "/", "/login", "/signup", "/forgot-password",
            "/main", "/quiz", "/report", "/about",
            "/contact", "/profile", "/admin"
    })
    public String forward() {
        return "forward:/index.html";
    }
}