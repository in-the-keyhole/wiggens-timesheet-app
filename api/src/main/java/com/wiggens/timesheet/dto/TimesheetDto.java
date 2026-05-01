package com.wiggens.timesheet.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimesheetDto {
    private Long id;
    @NotNull
    private Long employeeId;
    @NotNull
    private LocalDate weekStart;
    @Valid
    @Builder.Default
    private List<TimesheetEntryDto> entries = new ArrayList<>();
}

