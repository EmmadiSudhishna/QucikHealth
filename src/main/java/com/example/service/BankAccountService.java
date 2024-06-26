package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.entity.BankAccount;
import com.example.entity.Doctor;

public interface BankAccountService {
	 BankAccount createBankAccount(BankAccount bankaccount);
	    Optional<BankAccount> getBankAccountById(long id);
	    List<BankAccount> getAllBankAccounts();
	    void deleteBankAccountById(long id);
	    boolean updateBankAccount(BankAccount bankaccount);
	    boolean isBankAccountExist(long id);
	    
	    List<BankAccount> getBankAccountsByUserId(Long userId);


}
