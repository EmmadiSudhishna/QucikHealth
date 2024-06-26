package com.example.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Document(collection = "prescription")
@Data
public class Prescription {
	
	@Transient
    public static final String SEQUENCE_NAME = "prescription_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	@Id
	private long prescriptionId;
	
	@NotBlank
	@CreatedDate
	private String prescriptionDate;
	
	@Field("appointmentId")
	private long appointmentId;
	
	@NotBlank
	private String prescription;
	
	
	 private long pharmacyId; // Add pharmacyId attribute

	
	

}
