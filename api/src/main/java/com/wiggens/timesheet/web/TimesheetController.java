package com.wiggens.timesheet.web;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.domain.TimesheetEntry;
import com.wiggens.timesheet.service.EmployeeService;
import com.wiggens.timesheet.service.TimesheetService;
import com.wiggens.timesheet.web.dto.TimesheetDtos;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${app.api-base}")
@RequiredArgsConstructor
public class TimesheetController {
    private final TimesheetService timesheetService;
    private final EmployeeService employeeService;

    @PostMapping("/timesheets")
    public TimesheetDtos.TimesheetSummary create(@Valid @RequestBody TimesheetDtos.TimesheetRequest req) {
        Employee emp = employeeService.getById(req.getEmployeeId());
        List<TimesheetEntry> entries = req.getEntries().stream().map(e -> {
            TimesheetEntry te = new TimesheetEntry();
            te.setWorkDate(e.getWorkDate());
            te.setHours(e.getHours());
            return te;
        }).collect(Collectors.toList());
        Timesheet t = timesheetService.createOrReplace(emp, req.getWeekStart(), entries);
        return toSummary(t);
    }

    @GetMapping("/reports")
    public List<TimesheetDtos.TimesheetSummary> report(@RequestParam("weekStart") String weekStart) {
        LocalDate ws = LocalDate.parse(weekStart);
        return timesheetService.findByWeek(ws).stream().map(this::toSummary).collect(Collectors.toList());
    }

    private TimesheetDtos.TimesheetSummary toSummary(Timesheet t) {
        TimesheetDtos.TimesheetSummary dto = new TimesheetDtos.TimesheetSummary();
        dto.setTimesheetId(t.getId());
        dto.setEmployeeId(t.getEmployee().getId());
        dto.setEmployeeName(t.getEmployee().getFirstName() + " " + t.getEmployee().getLastName());
        dto.setWeekStart(t.getWeekStart());
        double total = t.getEntries().stream().mapToDouble(e -> e.getHours() == null ? 0.0 : e.getHours()).sum();
        dto.setTotalHours(total);
        return dto;
    }
}

