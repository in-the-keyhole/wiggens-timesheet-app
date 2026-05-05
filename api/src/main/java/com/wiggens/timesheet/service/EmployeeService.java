package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.dto.EmployeeDTO;
import com.wiggens.timesheet.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeService {
    private final EmployeeRepository repository;

    public List<EmployeeDTO> findAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public EmployeeDTO get(Long id) {
        return repository.findById(id).map(this::toDTO).orElseThrow();
    }

    public EmployeeDTO create(EmployeeDTO dto) {
        Employee entity = new Employee(null, dto.getFirstName(), dto.getLastName(), dto.getEmail());
        return toDTO(repository.save(entity));
    }

    public EmployeeDTO update(Long id, EmployeeDTO dto) {
        Employee e = repository.findById(id).orElseThrow();
        e.setFirstName(dto.getFirstName());
        e.setLastName(dto.getLastName());
        e.setEmail(dto.getEmail());
        return toDTO(repository.save(e));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private EmployeeDTO toDTO(Employee e) {
        return EmployeeDTO.builder()
                .id(e.getId())
                .firstName(e.getFirstName())
                .lastName(e.getLastName())
                .email(e.getEmail())
                .build();
    }
}

