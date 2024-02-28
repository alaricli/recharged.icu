package com.recharged.backend.model.repository;

import com.recharged.backend.model.LocalUser;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface LocalUserRepository extends CrudRepository<LocalUser, Long> {
    Optional<LocalUser> findByUsernameIgnoreCase(String username);

    Optional<LocalUser> findByEmailIgnoreCase(String email);
}
