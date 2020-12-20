package com.ust.ecom;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ust.ecom.entities.Ecommerce;
import com.ust.ecom.repos.EcomRepository;


@SpringBootTest
class EcommerceApplicationTests {

	@Autowired
	private EcomRepository ecomRepository;
	
	@Test
	public void testCreate() {
		Ecommerce ecommerce = new Ecommerce();
		ecommerce.setTitle("JBL Infinity");
		ecommerce.setPrice(1000);
		ecommerce.setCategory("Headset");
		ecommerce.setDescription("Wireless headset of JBL brand");
		ecommerce.setImage("www.images.google.com/jblinfinity");
		ecomRepository.save(ecommerce);
	}
	
	@Test
	public void testFindStudent() {
		Ecommerce ecommerce = ecomRepository.findById(6l).get();
		System.out.println(ecommerce);
	}
	
	@Test
	public void testUpdateStudent() {
		Ecommerce ecommerce = ecomRepository.findById(6l).get();
		ecommerce.setPrice(1400);
		
		ecomRepository.save(ecommerce);
		System.out.println(ecommerce);
	}


}
