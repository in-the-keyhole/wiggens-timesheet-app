package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.dto.EmployeeDto;
import com.wiggens.timesheet.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public Optional<EmployeeDto> get(Long id) {
        return employeeRepository.findById(id)
                .map(e -> EmployeeDto.builder().id(e.getId()).firstName(e.getFirstName()).lastName(e.getLastName()).build());
    }

    public Optional<EmployeeDto> update(Long id, EmployeeDto dto) {
        return employeeRepository.findById(id).map(e -> {
            e.setFirstName(dto.getFirstName());
            e.setLastName(dto.getLastName());
            Employee saved = employeeRepository.save(e);
            return EmployeeDto.builder().id(saved.getId()).firstName(saved.getFirstName()).lastName(saved.getLastName()).build();
        });
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    public List<EmployeeDto> search(String q) {
        if (q == null || q.isBlank()) {
            return list();
        }
        return employeeRepository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(q, q)
                .stream()
                .map(e -> EmployeeDto.builder().id(e.getId()).firstName(e.getFirstName()).lastName(e.getLastName()).build())
                .collect(Collectors.toList());
    }
}
