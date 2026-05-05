package com.wiggens.timesheet.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "timesheets", uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "weekStart"}))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Timesheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Employee employee;

    @NotNull
    private LocalDate weekStart; // Monday of the week

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

    public double getTotal() {
        return mon + tue + wed + thu + fri + sat + sun;
    }
}

