package com.wiggens.timesheet.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimesheetDto {
    private Long id;
    private Long employeeId;
    private LocalDate weekStart;
    private double mon;
    private double tue;
    private double wed;
    private double thu;
    private double fri;
    private double sat;
    private double sun;
    private double totalHours;
}

