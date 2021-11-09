package com.github.popovdmitry.nstu.gw.adminservice.repository;

import com.github.popovdmitry.nstu.gw.adminservice.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}
