package com.example.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Doctor;
import com.example.entity.Schedule;
import com.example.repository.ScheduleRepository;
import com.example.service.ScheduleService;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
    private ScheduleRepository scheduleRepository;
	

	@Override
	public Schedule createSchedule(Schedule schedule) {
		return scheduleRepository.save(schedule);
	}

	@Override
	public Optional<Schedule> getScheduleById(long scheduleId) {
		return scheduleRepository.findById(scheduleId);
	}

	@Override
	public List<Schedule> getAllSchedules() {
		return scheduleRepository.findAll();
	}

	@Override
	public void deleteSchedule(long scheduleId) {
		scheduleRepository.deleteById(scheduleId);
	}
	
	@Override
	public boolean updateSchedule(Schedule schedule) {
		// TODO Auto-generated method stub
		if (isScheduleExist(schedule.getScheduleId())) {
            scheduleRepository.save(schedule);
            return true;
        }

		return false;
	}


	@Override
	public boolean isScheduleExist(long scheduleId) {
		// TODO Auto-generated method stub
		return scheduleRepository.existsById(scheduleId);
	}

	@Override
	public List<Schedule> getSchedulesByDoctorId(long doctorId) {
		// TODO Auto-generated method stub
		return scheduleRepository.getSchedulesByDoctorId(doctorId);
	}

	
	


}
