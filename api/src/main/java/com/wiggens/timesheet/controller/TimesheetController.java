package com.wiggens.timesheet.controller;

import com.wiggens.timesheet.dto.CreateTimesheetRequest;
import com.wiggens.timesheet.dto.TimesheetDto;
import com.wiggens.timesheet.service.TimesheetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/codex-example/api/v1/timesheets")
@RequiredArgsConstructor
public class TimesheetController {
    private final TimesheetService timesheetService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TimesheetDto submit(@Valid @RequestBody CreateTimesheetRequest req) {
        return timesheetService.submitTimesheet(req);
    }
}

