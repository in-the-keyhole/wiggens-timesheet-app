package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.dto.WeeklySummaryDto;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final TimesheetRepository timesheetRepository;

    public List<WeeklySummaryDto> weeklySummary(LocalDate weekStart) {
        return timesheetRepository.findAll().stream()
                .filter(t -> t.getWeekStart().equals(weekStart))
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private WeeklySummaryDto toDto(Timesheet t) {
        return WeeklySummaryDto.builder()
                .employeeId(t.getEmployee().getId())
                .employeeName(t.getEmployee().getFirstName() + " " + t.getEmployee().getLastName())
                .weekStart(t.getWeekStart())
                .totalHours(t.totalHours())
                .build();
    }
}

