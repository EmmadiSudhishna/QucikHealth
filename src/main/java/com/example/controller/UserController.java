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
import com.example.entity.Schedule;
import com.example.entity.User;
import com.example.service.DatabaseaSequencesGeneratorService;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/v1")
public class UserController {
	
	@Autowired
	UserService userservice;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	
	@PostMapping("addUser")
    public User addUser(@RequestBody User user) {
		user.setUserId(databaseaSequencesGeneratorService.generateSequence(User.SEQUENCE_NAME));
        return userservice.createUser(user);
    }
	
	@PostMapping(value="/userLogin")
	public ResponseEntity<Object> userLogin(@RequestBody User user){
	    User user1 = userservice.loginValidate(user);
	    return new ResponseEntity<>(user1, HttpStatus.OK);
	}
	
	@GetMapping("getUserById/{userId}")
    public Optional<User> getUserById(@PathVariable("userId") long userId) {
        return userservice.getUserById(userId);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userservice.getAllUsers();
    }

    @DeleteMapping("deleteUser/{userId}")
    public void deleteUser(@PathVariable("userId") long userId) {
        userservice.deleteUser(userId);
    }
    
    @PutMapping(value = "/updateUsers/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable("userId") long userId, @RequestBody User user) {
        if (userservice.isUserExist(userId)) {
            user.setUserId(userId); // Ensure the ID is set correctly
            userservice.updateUsers(user);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    


}
