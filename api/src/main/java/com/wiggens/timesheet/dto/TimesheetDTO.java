package com.wiggens.timesheet.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimesheetDTO {
    private Long id;
    @NotNull
    private Long employeeId;
    @NotNull
    private LocalDate weekStart;
    @Min(0) @Max(24)
    private double mon;
    @Min(0) @Max(24)
    private double tue;
    @Min(0) @Max(24)
    private double wed;
    @Min(0) @Max(24)
    private double thu;
    @Min(0) @Max(24)
    private double fri;
    @Min(0) @Max(24)
    private double sat;
    @Min(0) @Max(24)
    private double sun;
    private double total;
}
