package com.recharged.backend.service;

import com.recharged.backend.api.model.RegistrationBody;
import com.recharged.backend.model.LocalUser;
import com.recharged.backend.model.repository.LocalUserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private LocalUserRepository localUserRepository;

    public UserService(LocalUserRepository localUserRepository) {
        this.localUserRepository = localUserRepository;
    }

    public LocalUser registerUser(RegistrationBody registrationBody) {
        LocalUser user = new LocalUser();
        user.setEmail(registrationBody.getEmail());
        user.setFirstName(registrationBody.getFirstName());
        user.setLastName(registrationBody.getLastName());
        user.setUsername(registrationBody.getUsername());
        // TODO: Encrypt passwords!!
        user.setPassword(registrationBody.getPassword());

        user = localUserRepository.save(user);
        return user;
    }

}
