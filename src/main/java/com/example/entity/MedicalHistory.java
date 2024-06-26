package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "medicalHistory")
@Data
public class MedicalHistory {
	@Transient
    public static final String SEQUENCE_NAME = "medicalHistory_sequence";  //this name can be any
		
	@Id
	private long medicalId;
	
	@Field("userId")
	private int userId;
	
	@NotBlank
	private String allergy;
	
	@NotBlank
	private String medicalHistory;
	
	

}
