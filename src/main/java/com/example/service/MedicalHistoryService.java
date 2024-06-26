package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.entity.Doctor;
import com.example.entity.MedicalHistory;

public interface MedicalHistoryService {
	 MedicalHistory createMedicalHistory(MedicalHistory medicalhistory);
	    Optional<MedicalHistory> getMedicalHistoryByMedicalId(long medicalId);
	    List<MedicalHistory> getAllMedicalHistory();
	    void deleteMedicalHistory(long medicalId);
	    boolean updateMedicalHistory(MedicalHistory medicalhistory);
	    boolean isMedicalHistoryExist(long medicalId);
	    List<MedicalHistory>getMedicalHistoryByUserId(int userId);

}
