package com.wiggens.timesheet.repository;

import com.wiggens.timesheet.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}

