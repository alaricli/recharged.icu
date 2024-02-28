package com.recharged.backend.model.repository;

import com.recharged.backend.model.LocalUser;
import org.springframework.data.repository.CrudRepository;

public interface LocalUserRepository extends CrudRepository<LocalUser, Long> {
}
