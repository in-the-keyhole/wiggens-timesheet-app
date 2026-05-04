package com.wiggens.timesheet.config;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {
    private final EmployeeRepository employeeRepository;

    @Bean
    CommandLineRunner seedEmployees() {
        return args -> {
            if (employeeRepository.count() == 0) {
                employeeRepository.save(Employee.builder()
                        .firstName("Jane").lastName("Doe").email("jane.doe@example.com").build());
                employeeRepository.save(Employee.builder()
                        .firstName("John").lastName("Doe").email("john.doe@example.com").build());
            }
        };
    }
}

