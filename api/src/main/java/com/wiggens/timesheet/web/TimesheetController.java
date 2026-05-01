package com.wiggens.timesheet.web;

import com.wiggens.timesheet.dto.TimesheetDto;
import com.wiggens.timesheet.service.TimesheetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/codex-example/api/v1/timesheets")
@RequiredArgsConstructor
public class TimesheetController {
    private final TimesheetService timesheetService;

    @PostMapping
    public ResponseEntity<TimesheetDto> upsert(@Valid @RequestBody TimesheetDto dto) {
        return ResponseEntity.ok(timesheetService.upsert(dto));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<TimesheetDto> getForWeek(@PathVariable Long employeeId, @RequestParam("weekStart") String weekStart) {
        LocalDate week = LocalDate.parse(weekStart);
        return ResponseEntity.ok(timesheetService.getForEmployeeAndWeek(employeeId, week));
    }
}

