package com.wiggens.timesheet.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateTimesheetRequest {
    @NotNull
    private Long employeeId;

    @NotNull
    private LocalDate weekStart;

    @PositiveOrZero @Max(24)
    private double mon;
    @PositiveOrZero @Max(24)
    private double tue;
    @PositiveOrZero @Max(24)
    private double wed;
    @PositiveOrZero @Max(24)
    private double thu;
    @PositiveOrZero @Max(24)
    private double fri;
    @PositiveOrZero @Max(24)
    private double sat;
    @PositiveOrZero @Max(24)
    private double sun;
}

