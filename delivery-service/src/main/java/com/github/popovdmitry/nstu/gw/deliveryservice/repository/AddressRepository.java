package com.github.popovdmitry.nstu.gw.deliveryservice.repository;

import com.github.popovdmitry.nstu.gw.deliveryservice.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByCustomerId(Long customerId);
    Optional<Address> findByCustomerIdAndIsMain(Long customerId, Boolean isMain);
}
