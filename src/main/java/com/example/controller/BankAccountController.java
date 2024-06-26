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

import com.example.entity.BankAccount;
import com.example.entity.Doctor;
import com.example.service.BankAccountService;
import com.example.service.DatabaseaSequencesGeneratorService;

@RestController
@RequestMapping("api/v1")
public class BankAccountController {
	
	@Autowired
	private BankAccountService bankaccountService;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	@PostMapping("addBankaccount")
	public BankAccount createBAnkAccount(@RequestBody  BankAccount banckaccount) {
		banckaccount.setId(databaseaSequencesGeneratorService.generateSequence(BankAccount.SEQUENCE_NAME));
		return bankaccountService.createBankAccount(banckaccount);
	}
	
	@GetMapping("getBankAccounctById/{id}")
    public Optional<BankAccount> getBankAccounctById(@PathVariable("id") long id) {
        return bankaccountService.getBankAccountById(id);
    }
	
	@GetMapping("/getAllBankAccounts")
    public List<BankAccount> getAllBankAccounts() {
        return bankaccountService.getAllBankAccounts();
    }

    @DeleteMapping("deleteBankAccounts/{id}")
    public void deleteBankAccounts(@PathVariable("id") long id) {
    	bankaccountService.deleteBankAccountById(id);
    }
    
    @PutMapping(value = "/updateBankAccount/{Id}")
    public ResponseEntity<Object> updatebankaccount(@PathVariable("Id") long Id, @RequestBody BankAccount bankaccount) {
        boolean updated = bankaccountService.updateBankAccount(bankaccount);
        if (updated) {
            return new ResponseEntity<>("BankAccount updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("BankAccount not found", HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/accounts/user/{userId}")
    public ResponseEntity<BankAccount> getBankAccountByUserId(@PathVariable Long userId) {
        List<BankAccount> bankAccounts = bankaccountService.getBankAccountsByUserId(userId);
        if (bankAccounts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            // Assuming the user has only one bank account, return the first one
            return new ResponseEntity<>(bankAccounts.get(0), HttpStatus.OK);
        }
    }


	
}
