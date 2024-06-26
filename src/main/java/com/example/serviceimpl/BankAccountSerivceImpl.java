package com.example.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.BankAccount;
import com.example.entity.Doctor;
import com.example.repository.BankAccountRepository;
import com.example.service.BankAccountService;

@Service
public class BankAccountSerivceImpl implements BankAccountService{
	
	@Autowired
	private BankAccountRepository bankaccountsRepository;

	@Override
	public BankAccount createBankAccount(BankAccount bankaccount) {
		return bankaccountsRepository.save(bankaccount);
	}

	@Override
	public Optional<BankAccount> getBankAccountById(long id) {
		return bankaccountsRepository.findById(id);
	}

	@Override
	public List<BankAccount> getAllBankAccounts() {
		return bankaccountsRepository.findAll();
	}

	@Override
	public void deleteBankAccountById(long id) {
		bankaccountsRepository.deleteById(id);
		
	}
	
	@Override
	public boolean updateBankAccount(BankAccount bankaccount) {
		// TODO Auto-generated method stub
		if (isBankAccountExist(bankaccount.getId())) {
            bankaccountsRepository.save(bankaccount);
            return true;
        }

		return false;
	}


	@Override
	public boolean isBankAccountExist(long Id) {
		// TODO Auto-generated method stub
		return bankaccountsRepository.existsById(Id);
	}
	
	@Override
	public List<BankAccount> getBankAccountsByUserId(Long userId) {
		 return bankaccountsRepository.findByUserId(userId);
	}
	
	

}