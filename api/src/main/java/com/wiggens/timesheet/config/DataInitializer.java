package com.wiggens.timesheet.config;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("!test")
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) {
        if (employeeRepository.count() == 0) {
            employeeRepository.save(Employee.builder()
                    .firstName("First")
                    .lastName("Employee")
                    .build());
        }
    }
}

