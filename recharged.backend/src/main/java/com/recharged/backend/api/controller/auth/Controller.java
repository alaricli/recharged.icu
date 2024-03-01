package com.recharged.backend.api.controller.auth;

import com.recharged.backend.api.model.RegistrationBody;
import com.recharged.backend.exception.UserAlreadyExistException;
import com.recharged.backend.model.Product;
import com.recharged.backend.model.repository.ProductRepository;
import com.recharged.backend.service.ProductService;
import com.recharged.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class Controller {

    private UserService userService;
    private ProductService productService;

    public Controller(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@Valid @RequestBody RegistrationBody registrationBody) {
        try {
            userService.registerUser(registrationBody);
            return ResponseEntity.ok().build();
        } catch (UserAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody ProductRepository productRepository) {
        return productService.addProduct();
    }
}
