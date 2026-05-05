package com.wiggens.timesheet.service;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.dto.ReportItemDTO;
import com.wiggens.timesheet.dto.TimesheetDTO;
import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TimesheetService {
    private final TimesheetRepository repository;
    private final EmployeeRepository employeeRepository;

    public TimesheetDTO createOrUpdate(TimesheetDTO dto) {
        Employee employee = employeeRepository.findById(dto.getEmployeeId()).orElseThrow();
        Timesheet ts = repository.findByEmployeeAndWeekStart(employee, dto.getWeekStart())
                .orElse(new Timesheet());
        ts.setEmployee(employee);
        ts.setWeekStart(dto.getWeekStart());
        ts.setMon(dto.getMon());
        ts.setTue(dto.getTue());
        ts.setWed(dto.getWed());
        ts.setThu(dto.getThu());
        ts.setFri(dto.getFri());
        ts.setSat(dto.getSat());
        ts.setSun(dto.getSun());
        Timesheet saved = repository.save(ts);
        return toDTO(saved);
    }

    public List<TimesheetDTO> byEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        return repository.findAll().stream()
                .filter(t -> t.getEmployee().getId().equals(employee.getId()))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ReportItemDTO> reportByWeek(LocalDate weekStart) {
        return repository.findByWeekStart(weekStart).stream()
                .map(t -> ReportItemDTO.builder()
                        .employeeId(t.getEmployee().getId())
                        .employeeName(t.getEmployee().getFirstName() + " " + t.getEmployee().getLastName())
                        .totalHours(t.getTotal())
                        .build())
                .collect(Collectors.toList());
    }

    private TimesheetDTO toDTO(Timesheet t) {
        return TimesheetDTO.builder()
                .id(t.getId())
                .employeeId(t.getEmployee().getId())
                .weekStart(t.getWeekStart())
                .mon(t.getMon())
                .tue(t.getTue())
                .wed(t.getWed())
                .thu(t.getThu())
                .fri(t.getFri())
                .sat(t.getSat())
                .sun(t.getSun())
                .total(t.getTotal())
                .build();
    }
}

