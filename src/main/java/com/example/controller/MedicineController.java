package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Appointments;
import com.example.entity.Doctor;
import com.example.entity.Medicine;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.MedicineService;


@RestController
@RequestMapping("/api/v1")
public class MedicineController {
	
	@Autowired
	MedicineService medicineservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	

	
	@PostMapping("addMedicine")
    public Medicine addMedicine(@RequestBody Medicine medicine) {
		medicine.setId(databaseaSequencesGeneratorService.generateSequence(Medicine.SEQUENCE_NAME));
        return medicineservice.createMedicine(medicine);
    }
	
	@GetMapping("getMedicineById/{id}")
    public Optional<Medicine> getMedicineById(@PathVariable("id") long id) {
        return medicineservice.getMedicineById(id);
    }

	@GetMapping("/getAllMedicines")
    public List<Medicine> getAllMedicines() {
        return medicineservice.getAllMedicines();
    }

    @DeleteMapping("deleteMedicine/{id}")
    public void deleteMedicine(@PathVariable("id") long id) {
    	medicineservice.deleteMedicine(id);
    }
    
    @PutMapping(value = "/updateMedicine/{Id}")
    public ResponseEntity<Object> updateMedicine(@PathVariable("Id") long Id, @RequestBody Medicine medicine) {
        boolean updated = medicineservice.updateMedicine(medicine);
        if (updated) {
            return new ResponseEntity<>("Medicine updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Medicine not found", HttpStatus.NOT_FOUND);
        }
    }



}
