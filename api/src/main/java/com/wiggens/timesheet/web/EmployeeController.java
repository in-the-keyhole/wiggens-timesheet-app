package com.wiggens.timesheet.web;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.service.EmployeeService;
import com.wiggens.timesheet.web.dto.EmployeeDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${app.api-base}/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService service;

    @GetMapping
    public List<EmployeeDto> all() {
        return service.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public EmployeeDto get(@PathVariable Long id) { return toDto(service.getById(id)); }

    @PostMapping
    public EmployeeDto create(@Valid @RequestBody EmployeeDto dto) {
        Employee e = toEntity(dto);
        return toDto(service.create(e));
    }

    @PutMapping("/{id}")
    public EmployeeDto update(@PathVariable Long id, @Valid @RequestBody EmployeeDto dto) {
        Employee e = toEntity(dto);
        return toDto(service.update(id, e));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }

    private EmployeeDto toDto(Employee e) {
        EmployeeDto dto = new EmployeeDto();
        BeanUtils.copyProperties(e, dto);
        return dto;
    }

    private Employee toEntity(EmployeeDto dto) {
        Employee e = new Employee();
        e.setFirstName(dto.getFirstName());
        e.setLastName(dto.getLastName());
        e.setEmail(dto.getEmail());
        e.setActive(dto.getActive());
        return e;
    }
}

