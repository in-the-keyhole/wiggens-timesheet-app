package com.wiggens.timesheet.controller;

import com.wiggens.timesheet.dto.EmployeeDTO;
import com.wiggens.timesheet.service.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/codex-example/api/v1/status")
@RequiredArgsConstructor
public class StatusController {
    private final StatusService statusService;

    @GetMapping("/inactive")
    public List<EmployeeDTO> employeesWithNoHours(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStart) {
        return statusService.employeesWithNoHoursForWeek(weekStart);
    }
}

