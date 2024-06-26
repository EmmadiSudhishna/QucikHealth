package com.example.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Doctor;
import com.example.entity.MedicalHistory;
import com.example.repository.MedicalHistoryRepository;
import com.example.service.MedicalHistoryService;

@Service
public class MedicalHistoryServiceImpl  implements MedicalHistoryService{

	@Autowired
    private MedicalHistoryRepository medicalhistoryRepository;

	@Override
	public MedicalHistory createMedicalHistory(MedicalHistory medicalhistory) {
		// TODO Auto-generated method stub
		return medicalhistoryRepository.save(medicalhistory);
	}

	@Override
	public Optional<MedicalHistory> getMedicalHistoryByMedicalId(long medicalId) {
		// TODO Auto-generated method stub
		return medicalhistoryRepository.findById(medicalId);
	}

	@Override
	public List<MedicalHistory> getAllMedicalHistory() {
		// TODO Auto-generated method stub
		return medicalhistoryRepository.findAll();
	}

	@Override
	public void deleteMedicalHistory(long medicalId) {
		medicalhistoryRepository.deleteById(medicalId);
		
	}

	@Override
	public boolean updateMedicalHistory(MedicalHistory medicalhistory) {
		// TODO Auto-generated method stub
		if (isMedicalHistoryExist(medicalhistory.getMedicalId())) {
            medicalhistoryRepository.save(medicalhistory);
            return true;
        }

		return false;
	}


	@Override
	public boolean isMedicalHistoryExist(long medicalId) {
		// TODO Auto-generated method stub
		return medicalhistoryRepository.existsById(medicalId);
	}

	@Override
	public List<MedicalHistory> getMedicalHistoryByUserId(int userId) {
		// TODO Auto-generated method stub
		return medicalhistoryRepository.findByUserId(userId) ;
	}
	
		
	
}
