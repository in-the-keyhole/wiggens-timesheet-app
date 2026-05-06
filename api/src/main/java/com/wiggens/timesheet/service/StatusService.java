package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.dto.EmployeeDTO;
import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatusService {
    private final EmployeeRepository employeeRepository;
    private final TimesheetRepository timesheetRepository;

    public List<EmployeeDTO> employeesWithNoHoursForWeek(LocalDate weekStart) {
        return employeeRepository.findByActiveTrue().stream()
                .filter(emp -> {
                    Timesheet ts = timesheetRepository.findByEmployeeAndWeekStart(emp, weekStart).orElse(null);
                    if (ts == null) return true; // no timesheet entered
                    double hours = ts.getEntries().stream().mapToDouble(e -> e.getHours()).sum();
                    return hours <= 0.0; // timesheet exists but with no hours
                })
                .map(emp -> EmployeeDTO.builder()
                        .id(emp.getId())
                        .firstName(emp.getFirstName())
                        .lastName(emp.getLastName())
                        .email(emp.getEmail())
                        .active(emp.isActive())
                        .build())
                .collect(Collectors.toList());
    }
}

