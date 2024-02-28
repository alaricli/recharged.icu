package com.recharged.backend.api.controller.auth;

import com.recharged.backend.api.model.RegistrationBody;
import com.recharged.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private UserService userService;

    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody RegistrationBody registrationBody) {
        userService.registerUser(registrationBody);
    }
}
