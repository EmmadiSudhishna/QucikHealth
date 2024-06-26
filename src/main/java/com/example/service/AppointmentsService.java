package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.entity.Appointments;
import com.example.entity.Doctor;


public interface AppointmentsService {
	Appointments createAppointment(Appointments appointment);
	Optional<Appointments> getAppointmentById(long appointmentId);
	List<Appointments> getAllAppointments();
	void deleteAppointment(long appointmentId);
	 boolean updateAppointments(Appointments appointment);
	    boolean isAppointmentExist(long appointmentId);
	    List<Appointments> getAppointmentsByDoctorId(int doctorId);
	    List<Appointments> getAppointmentsByUserId(Long userId);

}
