package com.wiggens.timesheet.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "timesheet_entries")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimesheetEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Timesheet timesheet;

    @Column(nullable = false)
    private LocalDate workDate;

    @Column(nullable = false)
    private Double hours; // 0.0 - 24.0
}

