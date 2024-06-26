package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.entity.Doctor;
import com.example.entity.Schedule;

public interface ScheduleService {
	Schedule createSchedule(Schedule schedule);
	Optional<Schedule> getScheduleById(long scheduleId);
	List<Schedule> getAllSchedules();
	void deleteSchedule(long scheduleId);
	 boolean updateSchedule(Schedule schedule);
	 boolean isScheduleExist(long scheduleId);
	 List<Schedule>getSchedulesByDoctorId(long doctorId);

}
