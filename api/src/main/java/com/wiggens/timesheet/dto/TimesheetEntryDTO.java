package com.wiggens.timesheet.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.DayOfWeek;

@Data
@Builder
public class TimesheetEntryDTO {
    @NotNull
    private DayOfWeek dayOfWeek;

    @Min(0)
    @Max(24)
    private double hours;
}

