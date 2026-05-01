package com.wiggens.timesheet.web;

import com.wiggens.timesheet.dto.EmployeeDto;
import com.wiggens.timesheet.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/codex-example/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDto> create(@Valid @RequestBody EmployeeDto dto) {
        EmployeeDto created = employeeService.create(dto);
        return ResponseEntity.created(URI.create("/codex-example/api/v1/employees/" + created.getId())).body(created);
    }

    @GetMapping
    public List<EmployeeDto> list() {
        return employeeService.list();
    }
}

