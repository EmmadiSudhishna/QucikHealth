package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.entity.Doctor;
import com.example.entity.Payment;

public interface PaymentService {
	Payment createPayment(Payment payment);
	Optional<Payment> getPaymentById(long paymentId);
	List<Payment> getAllPayments();
	void deletePayment(long paymentId);
	  boolean updatePayment(Payment payment);
	    boolean isPaymentExist(long paymentId);

}
