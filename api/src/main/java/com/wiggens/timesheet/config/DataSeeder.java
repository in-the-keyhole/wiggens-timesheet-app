package com.wiggens.timesheet.config;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) {
        if (employeeRepository.count() == 0) {
            employeeRepository.save(Employee.builder().firstName("Jane").lastName("Doe").email("jane.doe@example.com").build());
            employeeRepository.save(Employee.builder().firstName("John").lastName("Doe").email("john.doe@example.com").build());
        }
    }
}

