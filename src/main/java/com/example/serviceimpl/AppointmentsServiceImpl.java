package com.example.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Appointments;
import com.example.entity.Doctor;
import com.example.repository.AppointmentsRepository;
import com.example.service.AppointmentsService;

@Service
public class AppointmentsServiceImpl implements AppointmentsService {
	
	@Autowired
    private AppointmentsRepository appointmentRepository;
	
	@Override
	public Appointments createAppointment(Appointments appointment) {
		return appointmentRepository.save(appointment);
	}

	@Override
	public Optional<Appointments> getAppointmentById(long appointmentId) {
		return appointmentRepository.findById(appointmentId);
	}

	@Override
	public List<Appointments> getAllAppointments() {
		return appointmentRepository.findAll();
	}

	@Override
	public void deleteAppointment(long appointmentId) {
		appointmentRepository.deleteById(appointmentId);
	}
	
	@Override
	public boolean updateAppointments(Appointments appointment) {
		// TODO Auto-generated method stub
		if (isAppointmentExist(appointment.getAppointmentId())) {
            appointmentRepository.save(appointment);
            return true;
        }

		return false;
	}


	@Override
	public boolean isAppointmentExist(long appointmentId) {
		// TODO Auto-generated method stub
		return appointmentRepository.existsById(appointmentId);
	}

	@Override
	public List<Appointments> getAppointmentsByDoctorId(int doctorId) {
		// TODO Auto-generated method stub
		return appointmentRepository.findByDoctorId(doctorId);
	}
	
	
	@Override
	public List<Appointments> getAppointmentsByUserId(Long userId) {
		  return appointmentRepository.findByUserId(userId);
	}
	
}
