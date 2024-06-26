package com.example.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Doctor;
import com.example.entity.User;
import com.example.repository.UserRepository;
import com.example.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
    private UserRepository userRepository;
	
	

	@Override
	public User loginValidate(User user) {
		User user1= userRepository.findByMobileAndPassword(user.getMobile(), user.getPassword());
		System.out.println("what is there in User=" + user1);
		return user1;
	}

	@Override
	public User createUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public Optional<User> getUserById(long userId) {
		return userRepository.findById(userId);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public void deleteUser(long userId) {
		userRepository.deleteById(userId);
	}
	
	@Override
	public boolean updateUsers(User user) {
		// TODO Auto-generated method stub
		if (isUserExist(user.getUserId())) {
            userRepository.save(user);
            return true;
        }

		return false;
	}


	@Override
	public boolean isUserExist(long userId) {
		// TODO Auto-generated method stub
		return userRepository.existsById(userId);
	}
	
	
}
