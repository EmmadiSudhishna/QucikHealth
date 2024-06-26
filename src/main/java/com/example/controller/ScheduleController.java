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

import com.example.entity.Doctor;
import com.example.entity.Prescription;
import com.example.entity.Schedule;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.ScheduleService;

@RestController
@RequestMapping("/api/v1")
public class ScheduleController {
	@Autowired
	ScheduleService scheduleservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	

	@PostMapping("/addSchedule")
	public ResponseEntity<Object> addSchedule(@RequestBody List<Schedule> schedules) {
	    for (Schedule schedule : schedules) {
	        // Assign a unique schedule ID
	        schedule.setScheduleId(databaseaSequencesGeneratorService.generateSequence(Schedule.SEQUENCE_NAME));
	        scheduleservice.createSchedule(schedule);
	    }
	    // Return a response indicating that schedules were added successfully
	    return new ResponseEntity<>("Schedules added", HttpStatus.CREATED);
	}

	
	@GetMapping("getScheduleById/{scheduleId}")
    public Optional<Schedule> getScheduleById(@PathVariable("scheduleId") long scheduleId) {
        return scheduleservice.getScheduleById(scheduleId);
    }

    @GetMapping("/getAllSchedules")
    public List<Schedule> getAllSchedules() {
        return scheduleservice.getAllSchedules();
    }

    @DeleteMapping("deleteSchedule/{scheduleId}")
    public void deleteSchedule(@PathVariable("scheduleId") long scheduleId) {
    	scheduleservice.deleteSchedule(scheduleId);
    }
    
    @PutMapping(value = "/updateSchedule/{scheduleId}")
    public ResponseEntity<Object> updateschedule(@PathVariable("scheduleId") long scheduleId, @RequestBody Schedule schedule) {
        boolean updated = scheduleservice.updateSchedule(schedule);
        if (updated) {
            return new ResponseEntity<>("Schedule updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Schedule not found", HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/getSchedulesByDoctorId/{doctorId}")
	public ResponseEntity<List<Schedule>> getSchedulesByDoctorId(@PathVariable long doctorId)
	{
		List<Schedule> schedules = scheduleservice.getSchedulesByDoctorId(doctorId);
		return new ResponseEntity<>(schedules, HttpStatus.OK);
	}




}
