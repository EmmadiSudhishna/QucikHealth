package com.example.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Doctor;
import com.example.entity.Payment;
import com.example.repository.PaymentRepository;
import com.example.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService{
	
	@Autowired
	private PaymentRepository paymentrepository;

	@Override
	public Payment createPayment(Payment payment) {
		return paymentrepository.save(payment);
	}

	@Override
	public Optional<Payment> getPaymentById(long paymentId) {
		return paymentrepository.findById(paymentId);
	}

	@Override
	public List<Payment> getAllPayments() {
		return paymentrepository.findAll();
	}

	@Override
	public void deletePayment(long paymentId) {
		paymentrepository.deleteById(paymentId);
	}
	
	@Override
	public boolean updatePayment(Payment payment) {
		// TODO Auto-generated method stub
		if (isPaymentExist(payment.getPaymentId())) {
            paymentrepository.save(payment);
            return true;
        }

		return false;
	}


	@Override
	public boolean isPaymentExist(long paymentId) {
		// TODO Auto-generated method stub
		return paymentrepository.existsById(paymentId);
	}

}
