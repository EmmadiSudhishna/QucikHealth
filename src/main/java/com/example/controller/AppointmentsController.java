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
import com.example.service.AppointmentsService;
import com.example.service.DatabaseaSequencesGeneratorService;


@RestController
@RequestMapping("/api/v1")
public class AppointmentsController {
	
	@Autowired
	AppointmentsService appointmentservice;
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	
	@PostMapping("addAppointment")
    public Appointments addAppointment(@RequestBody Appointments appointment) {
		appointment.setAppointmentId(databaseaSequencesGeneratorService.generateSequence(Appointments.SEQUENCE_NAME));
        return appointmentservice.createAppointment(appointment);
    }
	
	@GetMapping("getAppointmentById/{appointmentId}")
    public Optional<Appointments> getAppointmentById(@PathVariable("appointmentId") long appointmentId) {
        return appointmentservice.getAppointmentById(appointmentId);
    }

    @GetMapping("/getAllAppointments")
    public List<Appointments> getAllAppointments() {
        return appointmentservice.getAllAppointments();
    }

    @DeleteMapping("deleteAppointment/{appointmentId}")
    public void deleteAppointment(@PathVariable("appointmentId") long appointmentId) {
    	appointmentservice.deleteAppointment(appointmentId);
    }
    
    @PutMapping(value = "/updateAppointments/{appointmentId}")
    public ResponseEntity<Object> updateappointment(@PathVariable("appointmentId") long appointmentId, @RequestBody Appointments appointment) {
        boolean updated = appointmentservice.updateAppointments(appointment);
        if (updated) {
            return new ResponseEntity<>("Appointment updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Appointment not found", HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/appointments/doctor/{doctorId}")
    public List<Appointments> getAppointmentsByDoctorId(@PathVariable int doctorId) {
    	return appointmentservice.getAppointmentsByDoctorId(doctorId);
    }
    
    @GetMapping("/appointments/user/{userId}")
    public List<Appointments> getAppointmentsByUserId(@PathVariable Long userId) {
        return appointmentservice.getAppointmentsByUserId(userId);
    }


}
