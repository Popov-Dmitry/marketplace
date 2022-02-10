package com.github.popovdmitry.nstu.gw.sellerservice.exceprion;

import com.github.popovdmitry.nstu.gw.sellerservice.dto.ApiErrorDto;
import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotUniqueEmailException.class)
    public ResponseEntity<ApiErrorDto> handleNotUniqueEmailException(NotUniqueEmailException e) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiErrorDto(e.getMessage()));
    }

    @ExceptionHandler(NotUniqueEmailException.class)
    public ResponseEntity<ApiErrorDto> handleNotUniqueInnException(NotUniqueInnException e) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiErrorDto(e.getMessage()));
    }

    @ExceptionHandler(NotUniqueEmailException.class)
    public ResponseEntity<ApiErrorDto> handleNotUniqueShopNameException(NotUniqueShopNameException e) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiErrorDto(e.getMessage()));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiErrorDto> handleNotFoundException(NotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ApiErrorDto(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorDto> handleException(Exception e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ApiErrorDto(e.getMessage()));
    }
}
