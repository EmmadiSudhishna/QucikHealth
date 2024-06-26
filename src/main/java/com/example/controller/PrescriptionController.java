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
import com.example.entity.Prescription;
import com.example.entity.Schedule;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.PrescriptionService;

@RestController
@RequestMapping("/api/v1")
public class PrescriptionController {
	
	@Autowired
	PrescriptionService prescriptionservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	


	/*@PostMapping("addPrescriptions")
    public Prescription addPrescription(@RequestBody Prescription prescription) {
		prescription.setPrescriptionId(databaseaSequencesGeneratorService.generateSequence(Prescription.SEQUENCE_NAME));
        return prescriptionservice.createPrescription(prescription);
    }*/
	
	@PostMapping("/addPrescriptions")
    public ResponseEntity<List<Prescription>> createPrescriptions(@RequestBody List<Prescription> prescriptions) {
        prescriptions.forEach(prescription -> {
            prescription.setPrescriptionId(databaseaSequencesGeneratorService.generateSequence(Prescription.SEQUENCE_NAME));
            prescriptionservice.createPrescription(prescription);
        });
        return new ResponseEntity<>(prescriptions, HttpStatus.CREATED);
    }
	
	@GetMapping("getPrescriptionById/{prescriptionId}")
    public Optional<Prescription> getPrescriptionById(@PathVariable("prescriptionId") long prescriptionId) {
        return prescriptionservice.getPrescriptionById(prescriptionId);
    }

    @GetMapping("/getAllPrescriptions")
    public List<Prescription> getAllPrescriptions() {
        return prescriptionservice.getAllPrescriptions();
    }

    @DeleteMapping("deletePrescription/{prescriptionId}")
    public void deletePrescription(@PathVariable("prescriptionId") long prescriptionId) {
    	prescriptionservice.deletePrescription(prescriptionId);
    }
    
    @PutMapping(value = "/updatePrescription/{prescriptionId}")
    public ResponseEntity<Object> updateprescription(@PathVariable("prescriptionId") long prescriptionId, @RequestBody Prescription prescription) {
        boolean updated = prescriptionservice.updatePrescription(prescription);
        if (updated) {
            return new ResponseEntity<>("Prescription updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Prescription not found", HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/prescriptions/appointments/{appointmentId}")
    public List<Prescription> getPrescriptionsByUserId(@PathVariable long appointmentId) {
        return prescriptionservice.findByAppointmentId(appointmentId);
    }
    
    
    @GetMapping("/prescriptions/{pharmacyId}")
    public List<Prescription> getPrescriptionsByPharmacyId(@PathVariable Long pharmacyId) {
        return prescriptionservice.getPrescriptionsByPharmacyId(pharmacyId);
    }




}
