package com.recharged.backend.service;

import com.recharged.backend.api.model.RegistrationBody;
import com.recharged.backend.exception.UserAlreadyExistException;
import com.recharged.backend.model.LocalUser;
import com.recharged.backend.model.Product;
import com.recharged.backend.model.repository.LocalUserRepository;
import com.recharged.backend.model.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct() {
        Product product = new Product();
    }

}
