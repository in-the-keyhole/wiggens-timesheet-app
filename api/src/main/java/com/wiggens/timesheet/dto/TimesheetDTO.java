package com.wiggens.timesheet.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class TimesheetDTO {
    private Long id;
    private Long employeeId;
    private LocalDate weekStart;
    private List<TimesheetEntryDTO> entries;
}

