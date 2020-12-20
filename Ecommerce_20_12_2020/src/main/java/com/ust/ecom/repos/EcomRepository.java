package com.ust.ecom.repos;

import org.springframework.data.repository.CrudRepository;

import com.ust.ecom.entities.Ecommerce;

public interface EcomRepository extends CrudRepository<Ecommerce, Long> {

}
