package com.wiggens.timesheet.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "timesheets",
        uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "week_start"}))
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Timesheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Column(name = "week_start", nullable = false)
    private LocalDate weekStart;

    // Simple model: store hours per day in fields
    private double monday;
    private double tuesday;
    private double wednesday;
    private double thursday;
    private double friday;
    private double saturday;
    private double sunday;

    public double getTotalHours() {
        return monday + tuesday + wednesday + thursday + friday + saturday + sunday;
    }
}

