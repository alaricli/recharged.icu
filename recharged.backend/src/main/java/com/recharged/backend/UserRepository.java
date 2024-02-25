package com.recharged.backend;

import org.springframework.data.repository.CrudRepository;

import com.recharged.backend.User;

public interface UserRepository extends CrudRepository<User, Integer>{
}
