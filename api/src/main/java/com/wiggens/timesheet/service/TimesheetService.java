package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.dto.TimesheetDto;
import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TimesheetService {
    private final TimesheetRepository timesheetRepository;
    private final EmployeeRepository employeeRepository;

    public Timesheet findOrThrow(Long id) {
        return timesheetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Timesheet not found: " + id));
    }

    public List<Timesheet> findAllByWeek(LocalDate weekStart) {
        return timesheetRepository.findAllByWeekStart(weekStart);
    }

    @Transactional
    public Timesheet upsert(TimesheetDto dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new IllegalArgumentException("Employee not found: " + dto.getEmployeeId()));

        Timesheet ts = timesheetRepository.findByEmployeeAndWeekStart(employee, dto.getWeekStart())
                .orElse(Timesheet.builder().employee(employee).weekStart(dto.getWeekStart()).build());

        ts.setMonday(dto.getMonday());
        ts.setTuesday(dto.getTuesday());
        ts.setWednesday(dto.getWednesday());
        ts.setThursday(dto.getThursday());
        ts.setFriday(dto.getFriday());
        ts.setSaturday(dto.getSaturday());
        ts.setSunday(dto.getSunday());

        return timesheetRepository.save(ts);
    }
}

