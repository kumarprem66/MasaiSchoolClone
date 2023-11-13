package com.masaischoolclone.MasaiSchoolClone;

import com.masaischoolclone.MasaiSchoolClone.ServiceImpl.DepartmentServiceImpl;
import com.masaischoolclone.MasaiSchoolClone.entity.Department;
import com.masaischoolclone.MasaiSchoolClone.utility.AnotherService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class MasaiSchoolCloneApplication {

	public static void main(String[] args) {
		SpringApplication.run(MasaiSchoolCloneApplication.class, args);


		System.out.println("prem kumar running......");



	}




}
