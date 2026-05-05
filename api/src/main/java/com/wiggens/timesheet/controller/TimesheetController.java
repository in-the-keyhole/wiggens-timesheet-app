package com.wiggens.timesheet.controller;

import com.wiggens.timesheet.dto.ReportItemDTO;
import com.wiggens.timesheet.dto.TimesheetDTO;
import com.wiggens.timesheet.service.TimesheetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/codex-example/api/v1")
@RequiredArgsConstructor
public class TimesheetController {
    private final TimesheetService service;

    @PostMapping("/timesheets")
    @ResponseStatus(HttpStatus.CREATED)
    public TimesheetDTO createOrUpdate(@Valid @RequestBody TimesheetDTO dto) {
        return service.createOrUpdate(dto);
    }

    @GetMapping("/employees/{employeeId}/timesheets")
    public List<TimesheetDTO> byEmployee(@PathVariable Long employeeId) {
        return service.byEmployee(employeeId);
    }

    @GetMapping("/reports/week")
    public List<ReportItemDTO> reportByWeek(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStart) {
        return service.reportByWeek(weekStart);
    }
}

