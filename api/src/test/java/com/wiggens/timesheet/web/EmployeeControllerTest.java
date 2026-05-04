package com.wiggens.timesheet.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wiggens.timesheet.dto.EmployeeDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class EmployeeControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;

    @Test
    void createAndListEmployees() throws Exception {
        EmployeeDto dto = EmployeeDto.builder().firstName("Ada").lastName("Lovelace").build();
        mockMvc.perform(post("/codex-example/api/v1/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists());

        mockMvc.perform(get("/codex-example/api/v1/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].firstName", org.hamcrest.Matchers.hasItem("Ada")));
    }

    @Test
    void searchUpdateAndDeleteEmployee() throws Exception {
        // create
        EmployeeDto dto = EmployeeDto.builder().firstName("Grace").lastName("Hopper").build();
        String createdBody = mockMvc.perform(post("/codex-example/api/v1/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        EmployeeDto created = mapper.readValue(createdBody, EmployeeDto.class);

        // search
        mockMvc.perform(get("/codex-example/api/v1/employees").param("q", "hop"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].lastName", org.hamcrest.Matchers.hasItem("Hopper")));

        // update
        EmployeeDto updated = EmployeeDto.builder().firstName("Grace").lastName("Murray Hopper").build();
        mockMvc.perform(put("/codex-example/api/v1/employees/" + created.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lastName").value("Murray Hopper"));

        // delete
        mockMvc.perform(delete("/codex-example/api/v1/employees/" + created.getId()))
                .andExpect(status().isNoContent());

        // verify no longer present
        mockMvc.perform(get("/codex-example/api/v1/employees/" + created.getId()))
                .andExpect(status().isNotFound());
    }
}
