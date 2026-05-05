package com.wiggens.timesheet.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class TimesheetDto {
    private Long id;

    @NotNull
    private Long employeeId;

    @NotNull
    private LocalDate weekStart;

    @Min(0)
    private double monday;
    @Min(0)
    private double tuesday;
    @Min(0)
    private double wednesday;
    @Min(0)
    private double thursday;
    @Min(0)
    private double friday;
    @Min(0)
    private double saturday;
    @Min(0)
    private double sunday;

    public double getTotal() {
        return monday + tuesday + wednesday + thursday + friday + saturday + sunday;
    }
}

