package com.wiggens.timesheet.web;

import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.dto.TimesheetDto;
import com.wiggens.timesheet.service.TimesheetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/codex-example/api/v1/timesheets")
@RequiredArgsConstructor
public class TimesheetController {
    private final TimesheetService timesheetService;

    @GetMapping
    public List<TimesheetDto> byWeek(@RequestParam("weekStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStart) {
        return timesheetService.findAllByWeek(weekStart).stream().map(this::toDto).collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<TimesheetDto> upsert(@Valid @RequestBody TimesheetDto dto) {
        Timesheet saved = timesheetService.upsert(dto);
        return ResponseEntity.ok(toDto(saved));
    }

    private TimesheetDto toDto(Timesheet t) {
        return TimesheetDto.builder()
                .id(t.getId())
                .employeeId(t.getEmployee().getId())
                .weekStart(t.getWeekStart())
                .monday(t.getMonday())
                .tuesday(t.getTuesday())
                .wednesday(t.getWednesday())
                .thursday(t.getThursday())
                .friday(t.getFriday())
                .saturday(t.getSaturday())
                .sunday(t.getSunday())
                .build();
    }
}

