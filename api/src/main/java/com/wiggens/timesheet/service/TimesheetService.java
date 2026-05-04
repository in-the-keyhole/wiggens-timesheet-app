package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.dto.CreateTimesheetRequest;
import com.wiggens.timesheet.dto.TimesheetDto;
import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TimesheetService {
    private final TimesheetRepository timesheetRepository;
    private final EmployeeRepository employeeRepository;

    @Transactional
    public TimesheetDto submitTimesheet(CreateTimesheetRequest req) {
        Employee emp = employeeRepository.findById(req.getEmployeeId())
                .orElseThrow(() -> new EntityNotFoundException("Employee not found: " + req.getEmployeeId()));

        Optional<Timesheet> existing = timesheetRepository.findByEmployeeAndWeekStart(emp, req.getWeekStart());
        Timesheet t = existing.orElseGet(() -> Timesheet.builder()
                .employee(emp)
                .weekStart(req.getWeekStart())
                .build());

        t.setMon(req.getMon());
        t.setTue(req.getTue());
        t.setWed(req.getWed());
        t.setThu(req.getThu());
        t.setFri(req.getFri());
        t.setSat(req.getSat());
        t.setSun(req.getSun());

        Timesheet saved = timesheetRepository.save(t);
        return toDto(saved);
    }

    public long countTimesheets() {
        return timesheetRepository.count();
    }

    private TimesheetDto toDto(Timesheet ts) {
        return TimesheetDto.builder()
                .id(ts.getId())
                .employeeId(ts.getEmployee().getId())
                .weekStart(ts.getWeekStart())
                .mon(ts.getMon())
                .tue(ts.getTue())
                .wed(ts.getWed())
                .thu(ts.getThu())
                .fri(ts.getFri())
                .sat(ts.getSat())
                .sun(ts.getSun())
                .totalHours(ts.totalHours())
                .build();
    }
}

