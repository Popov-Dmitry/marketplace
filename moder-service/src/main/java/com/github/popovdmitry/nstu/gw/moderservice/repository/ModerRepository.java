package com.github.popovdmitry.nstu.gw.moderservice.repository;

import com.github.popovdmitry.nstu.gw.moderservice.model.Moder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ModerRepository extends JpaRepository<Moder, Long> {
    Optional<Moder> findByEmail(String email);
}
