package com.wiggens.timesheet.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

public class TimesheetDtos {
    @Data
    public static class EntryDto {
        @NotNull
        private LocalDate workDate;
        @NotNull
        private Double hours;
    }

    @Data
    public static class TimesheetRequest {
        @NotNull
        private Long employeeId;
        @NotNull
        private LocalDate weekStart;
        @Valid
        @NotNull
        private List<EntryDto> entries;
    }

    @Data
    public static class TimesheetSummary {
        private Long timesheetId;
        private Long employeeId;
        private String employeeName;
        private LocalDate weekStart;
        private Double totalHours;
    }
}

