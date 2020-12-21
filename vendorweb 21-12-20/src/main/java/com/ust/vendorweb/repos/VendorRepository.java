package com.ust.vendorweb.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ust.vendorweb.entities.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Integer> {

}
