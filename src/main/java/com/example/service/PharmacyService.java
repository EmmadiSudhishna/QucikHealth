package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.entity.Doctor;
import com.example.entity.Pharmacy;
import com.example.entity.User;

public interface PharmacyService {
	public Pharmacy loginValidate(Pharmacy pharmacy);
	Pharmacy createPharmacy(Pharmacy pharmancy);
	Optional<Pharmacy> getPharmacyById(long pharmacyId);
	List<Pharmacy> getAllPharmacies();
	void deletePharmacyById(long pharmacyId);
	  boolean updatePharmacy(Pharmacy pharmacy);
	    boolean isPharmacyExist(long pharmacyId);


}
