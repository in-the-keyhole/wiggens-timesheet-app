package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.domain.TimesheetEntry;
import com.wiggens.timesheet.dto.TimesheetDTO;
import com.wiggens.timesheet.dto.TimesheetEntryDTO;
import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimesheetService {
    private final TimesheetRepository timesheetRepository;
    private final EmployeeRepository employeeRepository;

    public TimesheetDTO submit(TimesheetDTO dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId()).orElseThrow();
        Timesheet timesheet = timesheetRepository.findByEmployeeAndWeekStart(employee, dto.getWeekStart())
                .orElse(Timesheet.builder().employee(employee).weekStart(dto.getWeekStart()).build());
        timesheet.getEntries().clear();
        for (TimesheetEntryDTO e : dto.getEntries()) {
            TimesheetEntry entry = TimesheetEntry.builder()
                    .timesheet(timesheet)
                    .dayOfWeek(e.getDayOfWeek())
                    .hours(e.getHours())
                    .build();
            timesheet.getEntries().add(entry);
        }
        Timesheet saved = timesheetRepository.save(timesheet);
        return toDTO(saved);
    }

    public List<TimesheetDTO> forEmployee(Long employeeId) {
        return timesheetRepository.findByEmployeeId(employeeId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<TimesheetDTO> forWeek(LocalDate weekStart) {
        return timesheetRepository.findByWeekStart(weekStart).stream().map(this::toDTO).collect(Collectors.toList());
    }

    private TimesheetDTO toDTO(Timesheet t) {
        return TimesheetDTO.builder()
                .id(t.getId())
                .employeeId(t.getEmployee().getId())
                .weekStart(t.getWeekStart())
                .entries(t.getEntries().stream().map(e -> TimesheetEntryDTO.builder()
                        .dayOfWeek(e.getDayOfWeek())
                        .hours(e.getHours())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}

