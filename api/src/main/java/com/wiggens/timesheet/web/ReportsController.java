package com.wiggens.timesheet.web;

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
    public List<WeeklyRow> weekly(@RequestParam("weekStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStart) {
        List<Timesheet> list = timesheetRepository.findAllByWeekStart(weekStart);
        return list.stream().map(t -> new WeeklyRow(
                t.getEmployee().getId(),
                t.getEmployee().getFirstName() + " " + t.getEmployee().getLastName(),
                t.getTotalHours()
        )).collect(Collectors.toList());
    }

    @Data
    @AllArgsConstructor
    static class WeeklyRow {
        private Long employeeId;
        private String employeeName;
        private double totalHours;
    }
}
