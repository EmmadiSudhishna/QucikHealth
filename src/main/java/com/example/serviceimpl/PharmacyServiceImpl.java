package com.example.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Doctor;
import com.example.entity.Pharmacy;
import com.example.entity.User;
import com.example.repository.PharmacyRepository;
import com.example.service.PharmacyService;

@Service
public class PharmacyServiceImpl implements PharmacyService{
	@Autowired
	private PharmacyRepository pharmacyRepository;

	@Override
	public Pharmacy createPharmacy(Pharmacy pharmancy) {
		return pharmacyRepository.save(pharmancy);
	}

	@Override
	public Optional<Pharmacy> getPharmacyById(long pharmacyId) {
		return pharmacyRepository.findById(pharmacyId);
	}

	@Override
	public List<Pharmacy> getAllPharmacies() {
		return pharmacyRepository.findAll();
	}

	@Override
	public void deletePharmacyById(long pharmacyId) {
		pharmacyRepository.deleteById(pharmacyId);
		
	}
	
	@Override
	public Pharmacy loginValidate(Pharmacy pharmacy) {
		Pharmacy pharmacy1= pharmacyRepository.findByMobileAndPassword(pharmacy.getMobile(), pharmacy.getPassword());
		System.out.println("what is there in Pharmacy=" + pharmacy1);
		return pharmacy1;
	}
	
	@Override
	public boolean updatePharmacy(Pharmacy pharmacy) {
		// TODO Auto-generated method stub
		if (isPharmacyExist(pharmacy.getPharmacyId())) {
            pharmacyRepository.save(pharmacy);
            return true;
        }

		return false;
	}


	@Override
	public boolean isPharmacyExist(long pharmacyId) {
		// TODO Auto-generated method stub
		return pharmacyRepository.existsById(pharmacyId);
	}
	

}


