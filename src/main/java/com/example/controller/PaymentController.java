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
import com.example.entity.Payment;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.PaymentService;

@RestController
@RequestMapping("/api/v1")
public class PaymentController {
	
	@Autowired
	private PaymentService paymentservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	@PostMapping("addPayment")
    public Payment addPayment(@RequestBody Payment payment) {
		payment.setPaymentId(databaseaSequencesGeneratorService.generateSequence(Payment.SEQUENCE_NAME));
        return paymentservice.createPayment(payment);
    }
	
	@GetMapping("/getPaymentById/{paymentId}")
    public Optional<Payment> getPaymentById(@PathVariable("paymentId") long paymentId) {
        return paymentservice.getPaymentById(paymentId);
    }

    @GetMapping("/getAllPayments")
    public List<Payment> getAllPayments() {
        return paymentservice.getAllPayments();
    }

    @DeleteMapping("deletePayment/{paymentId}")
    public void deletePayment(@PathVariable("paymentId") long paymentId) {
        paymentservice.deletePayment(paymentId);
    }
    
    @PutMapping(value = "/updatePayment/{paymentId}")
    public ResponseEntity<Object> updatepayment(@PathVariable("paymentId") long paymentId, @RequestBody Payment payment) {
        boolean updated = paymentservice.updatePayment(payment);
        if (updated) {
            return new ResponseEntity<>("Payment updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Payment not found", HttpStatus.NOT_FOUND);
        }
    }


}
