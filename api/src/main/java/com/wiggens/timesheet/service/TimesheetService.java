package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.domain.TimesheetEntry;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TimesheetService {
    private final TimesheetRepository repository;

    public Timesheet createOrReplace(Employee employee, LocalDate weekStart, List<TimesheetEntry> entries) {
        repository.findByEmployeeAndWeekStart(employee, weekStart).ifPresent(repository::delete);
        Timesheet t = Timesheet.builder().employee(employee).weekStart(weekStart).build();
        for (TimesheetEntry e : entries) {
            e.setTimesheet(t);
            t.getEntries().add(e);
        }
        return repository.save(t);
    }

    public long count() { return repository.count(); }

    public List<Timesheet> findByWeek(LocalDate weekStart) { return repository.findByWeekStart(weekStart); }
}

