package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.domain.TimesheetEntry;
import com.wiggens.timesheet.dto.TimesheetDto;
import com.wiggens.timesheet.dto.TimesheetEntryDto;
import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimesheetService {
    private final TimesheetRepository timesheetRepository;
    private final EmployeeRepository employeeRepository;

    @Transactional
    public TimesheetDto upsert(TimesheetDto dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new NoSuchElementException("Employee not found"));

        Timesheet ts = timesheetRepository.findByEmployeeAndWeekStart(employee, dto.getWeekStart())
                .orElse(Timesheet.builder().employee(employee).weekStart(dto.getWeekStart()).build());

        ts.getEntries().clear();
        List<TimesheetEntry> entries = dto.getEntries().stream()
                .map(e -> TimesheetEntry.builder()
                        .timesheet(ts)
                        .dayOfWeek(e.getDayOfWeek())
                        .projectCode(e.getProjectCode())
                        .hours(e.getHours())
                        .build())
                .collect(Collectors.toList());
        ts.getEntries().addAll(entries);

        Timesheet saved = timesheetRepository.save(ts);
        return toDto(saved);
    }

    @Transactional(readOnly = true)
    public TimesheetDto getForEmployeeAndWeek(Long employeeId, java.time.LocalDate weekStart) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new NoSuchElementException("Employee not found"));
        Timesheet ts = timesheetRepository.findByEmployeeAndWeekStart(employee, weekStart)
                .orElseThrow(() -> new NoSuchElementException("Timesheet not found"));
        return toDto(ts);
    }

    private TimesheetDto toDto(Timesheet ts) {
        return TimesheetDto.builder()
                .id(ts.getId())
                .employeeId(ts.getEmployee().getId())
                .weekStart(ts.getWeekStart())
                .entries(ts.getEntries().stream().map(e ->
                        TimesheetEntryDto.builder()
                                .id(e.getId())
                                .dayOfWeek(e.getDayOfWeek())
                                .projectCode(e.getProjectCode())
                                .hours(e.getHours())
                                .build()
                ).collect(Collectors.toList()))
                .build();
    }
}

