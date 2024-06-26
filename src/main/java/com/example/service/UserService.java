package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.entity.Doctor;
import com.example.entity.User;

public interface UserService {
	
	public User loginValidate(User user);
	User createUser(User user);
	Optional<User> getUserById(long userId);
	List<User> getAllUsers();
	 boolean updateUsers(User user);
	 boolean isUserExist(long userId);
	void deleteUser(long userId);

}
