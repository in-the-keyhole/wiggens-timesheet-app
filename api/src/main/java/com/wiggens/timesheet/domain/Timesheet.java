package com.wiggens.timesheet.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "timesheets",
        uniqueConstraints = @UniqueConstraint(name = "uq_timesheet_employee_week", columnNames = {"employee_id", "week_start"}))
@Getter
@Setter
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

    @Column(nullable = false)
    private double mon;
    @Column(nullable = false)
    private double tue;
    @Column(nullable = false)
    private double wed;
    @Column(nullable = false)
    private double thu;
    @Column(nullable = false)
    private double fri;
    @Column(nullable = false)
    private double sat;
    @Column(nullable = false)
    private double sun;

    public double totalHours() {
        return mon + tue + wed + thu + fri + sat + sun;
    }
}

