package com.wiggens.timesheet.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.DayOfWeek;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimesheetEntryDto {
    private Long id;
    @NotNull
    private DayOfWeek dayOfWeek;
    @NotBlank
    private String projectCode;
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "24.0")
    private double hours;
}

