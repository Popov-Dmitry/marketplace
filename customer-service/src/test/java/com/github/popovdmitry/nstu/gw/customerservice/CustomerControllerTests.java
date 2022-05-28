package com.github.popovdmitry.nstu.gw.customerservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.popovdmitry.nstu.gw.customerservice.controller.CustomerController;
import com.github.popovdmitry.nstu.gw.customerservice.dto.CustomerDto;
import com.github.popovdmitry.nstu.gw.customerservice.model.Sex;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class CustomerControllerTests {

    @Autowired
    private CustomerController customerController;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void createCustomerTest() throws Exception {
        mockMvc.perform(post("/")
                        .content(asJsonString(new CustomerDto("first", "second", "email@te2.st",
                                "password", Sex.MALE, 1, 1, 2000)))
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("email@te2.st"));
    }

    @Test
    public void getCustomerTest() throws Exception {
        mockMvc.perform(get("/14"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(14));
    }

    @Test
    public void getCustomerFailureTest() throws Exception {
        mockMvc.perform(get("/1"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    public void updateCustomerTest() throws Exception {
        mockMvc.perform(patch("/58")
                        .content(asJsonString(new CustomerDto("first", "second", "email@te.st",
                                "updatedPassword", Sex.MALE, 1, 1, 2000)))
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("email@te.st"));
    }

    @Test
    public void deleteCustomerTest() throws Exception {
        mockMvc.perform(delete("/59"))
                .andDo(print())
                .andExpect(status().isOk());
    }


    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
