package com.github.popovdmitry.nstu.gw.adminservice.service;

import com.github.popovdmitry.nstu.gw.adminservice.dto.AdminDto;
import com.github.popovdmitry.nstu.gw.adminservice.exception.NotUniqueEmailException;
import com.github.popovdmitry.nstu.gw.adminservice.model.Admin;
import com.github.popovdmitry.nstu.gw.adminservice.repository.AdminRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminService {
    
    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public Admin findById(Long id) throws NotFoundException {
        return adminRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Admin with id %d is not found", id)));
    }

    public Admin findByEmail(String email) throws NotFoundException {
        return adminRepository.findByEmail(email).orElseThrow(() ->
                new NotFoundException(String.format("Admin with email %s is not found", email)));
    }

    public Admin saveAdmin(AdminDto adminDto) throws NotUniqueEmailException {
        try {
            Admin admin = new Admin();
            admin.setFirstName(adminDto.getFirstName());
            admin.setSecondName(adminDto.getSecondName());
            admin.setEmail(adminDto.getEmail());
            admin.setPassword(bCryptPasswordEncoder.encode(adminDto.getPassword()));
            return adminRepository.save(admin);
        }
        catch (Exception e) {
            throw new NotUniqueEmailException(
                    String.format("Admin with email %s is already exists", adminDto.getEmail()));
        }
    }

    public Admin updateAdmin(Long id, AdminDto updatedAdmin) throws NotFoundException {
        Admin moder = adminRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Admin with id %d is not found", id)));

        if (updatedAdmin.getFirstName() != null && !updatedAdmin.getFirstName().equals("")) {
            moder.setFirstName(updatedAdmin.getFirstName());
        }
        if (updatedAdmin.getSecondName() != null && !updatedAdmin.getSecondName().equals("")) {
            moder.setSecondName(updatedAdmin.getSecondName());
        }
        if (updatedAdmin.getEmail() != null && !updatedAdmin.getEmail().equals("")) {
            moder.setEmail(updatedAdmin.getEmail());
        }
        if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().equals("")) {
            moder.setPassword(bCryptPasswordEncoder.encode(updatedAdmin.getPassword()));
        }

        return adminRepository.save(moder);
    }

    public void deleteAdmin(Long id) throws NotFoundException {
        Admin moder = adminRepository.findById(id).orElseThrow(() ->
                new NotFoundException(String.format("Admin with id %d is not found", id)));
        adminRepository.delete(moder);
    }
    
}
