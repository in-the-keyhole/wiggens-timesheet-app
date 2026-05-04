package com.wiggens.timesheet.web;

import com.wiggens.timesheet.dto.DashboardSummaryDto;
import com.wiggens.timesheet.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/codex-example/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public DashboardSummaryDto summary() {
        return dashboardService.getSummary();
    }
}

