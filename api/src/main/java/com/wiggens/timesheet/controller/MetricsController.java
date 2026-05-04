package com.wiggens.timesheet.controller;

import com.wiggens.timesheet.dto.MetricsDto;
import com.wiggens.timesheet.service.MetricsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/codex-example/api/v1/metrics")
@RequiredArgsConstructor
public class MetricsController {
    private final MetricsService metricsService;

    @GetMapping
    public MetricsDto metrics() {
        return metricsService.getMetrics();
    }
}

