package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.dto.EmployeeDTO;
import com.wiggens.timesheet.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public List<EmployeeDTO> list() {
        return employeeRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public EmployeeDTO get(Long id) {
        return employeeRepository.findById(id).map(this::toDTO).orElse(null);
    }

    public EmployeeDTO create(EmployeeDTO dto) {
        Employee e = Employee.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .active(dto.isActive())
                .build();
        return toDTO(employeeRepository.save(e));
    }

    public EmployeeDTO update(Long id, EmployeeDTO dto) {
        return employeeRepository.findById(id).map(e -> {
            e.setFirstName(dto.getFirstName());
            e.setLastName(dto.getLastName());
            e.setEmail(dto.getEmail());
            e.setActive(dto.isActive());
            return toDTO(employeeRepository.save(e));
        }).orElse(null);
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    private EmployeeDTO toDTO(Employee e) {
        return EmployeeDTO.builder()
                .id(e.getId())
                .firstName(e.getFirstName())
                .lastName(e.getLastName())
                .email(e.getEmail())
                .active(e.isActive())
                .build();
    }
}

