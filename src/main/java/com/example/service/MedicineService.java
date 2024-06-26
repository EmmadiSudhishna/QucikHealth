package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.entity.Doctor;
import com.example.entity.Medicine;


public interface MedicineService {
	Medicine createMedicine(Medicine medicine);
	Optional<Medicine> getMedicineById(long id);
	List<Medicine> getAllMedicines();
	void deleteMedicine(long id);
	boolean updateMedicine(Medicine medicine);
    boolean isMedicineExist(long id);
}
