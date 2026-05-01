package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.dto.EmployeeDto;
import com.wiggens.timesheet.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public EmployeeDto create(EmployeeDto dto) {
        Employee saved = employeeRepository.save(Employee.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .build());
        dto.setId(saved.getId());
        return dto;
    }

    public List<EmployeeDto> list() {
        return employeeRepository.findAll().stream()
                .map(e -> EmployeeDto.builder().id(e.getId()).firstName(e.getFirstName()).lastName(e.getLastName()).build())
                .collect(Collectors.toList());
    }
}

