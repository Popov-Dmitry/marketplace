package com.github.popovdmitry.nstu.gw.moderservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class Swagger2Config {

    public static final String TAG_MODER = "Moder Controller";

    @Value("${documentation.base-url}")
    private String baseUrl;

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class)).build()
                .tags(new Tag(TAG_MODER, ""))
                .host(baseUrl)
                .useDefaultResponseMessages(false)
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Moder service api")
                .description("For using this service you must have a moder role")
                .version("1.0.0")
                .contact(new Contact("Popov Dmitry", "https://github.com/Popov-Dmitry", ""))
                .build();
    }
}
