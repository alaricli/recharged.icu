package com.recharged.backend.model.repository;

import com.recharged.backend.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
}
