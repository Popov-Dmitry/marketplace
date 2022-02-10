package com.github.popovdmitry.nstu.gw.moderservice.service;

import com.github.popovdmitry.nstu.gw.moderservice.dto.ModerDto;
import com.github.popovdmitry.nstu.gw.moderservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.moderservice.model.Moder;
import com.github.popovdmitry.nstu.gw.moderservice.repository.ModerRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ModerService {
    
    private final ModerRepository moderRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public Moder findById(Long id) throws NotFoundException {
        return moderRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Moder with id %d is not found", id)));
    }

    public Moder findByEmail(String email) throws NotFoundException {
        return moderRepository.findByEmail(email).orElseThrow(() ->
                new NotFoundException(String.format("Moder with email %s is not found", email)));
    }

    public Moder saveModer(Moder moder) throws NotUniqueEmailException {
        try {
            moder.setPassword(bCryptPasswordEncoder.encode(moder.getPassword()));
            return moderRepository.save(moder);
        }
        catch (Exception e) {
            throw new NotUniqueEmailException(
                    String.format("Moder with email %s is already exists", moder.getEmail()));
        }
    }

    public Moder updateModer(Long id, ModerDto updatedModer) throws NotFoundException {
        Moder moder = moderRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Moder with id %d is not found", id)));

        if (updatedModer.getFirstName() != null && !updatedModer.getFirstName().equals("")) {
            moder.setFirstName(updatedModer.getFirstName());
        }
        if (updatedModer.getSecondName() != null && !updatedModer.getSecondName().equals("")) {
            moder.setSecondName(updatedModer.getSecondName());
        }
        if (updatedModer.getEmail() != null && !updatedModer.getEmail().equals("")) {
            moder.setEmail(updatedModer.getEmail());
        }
        if (updatedModer.getPassword() != null && !updatedModer.getPassword().equals("")) {
            moder.setPassword(bCryptPasswordEncoder.encode(updatedModer.getPassword()));
        }

        return moderRepository.save(moder);
    }

    public void deleteModer(Long id) throws NotFoundException {
        Moder moder = moderRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Moder with id %d is not found", id)));
        moderRepository.delete(moder);
    }
    
}
