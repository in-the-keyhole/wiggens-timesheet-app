package com.wiggens.timesheet.controller;

import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/codex-example/api/v1/reports")
@RequiredArgsConstructor
public class ReportsController {
    private final TimesheetRepository timesheetRepository;

    @GetMapping("/weekly-hours")
    public List<ReportRow> weeklyHours(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStart) {
        List<Timesheet> t = timesheetRepository.findByWeekStart(weekStart);
        return t.stream().map(ts -> new ReportRow(
                ts.getEmployee().getId(),
                ts.getEmployee().getFirstName() + " " + ts.getEmployee().getLastName(),
                ts.getEntries().stream().collect(Collectors.summingDouble(e -> e.getHours()))
        )).collect(Collectors.toList());
    }

    @Data
    @AllArgsConstructor
    static class ReportRow {
        private Long employeeId;
        private String employeeName;
        private double hours;
    }
}
