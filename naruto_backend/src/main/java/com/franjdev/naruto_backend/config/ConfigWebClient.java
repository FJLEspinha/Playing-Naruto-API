package com.franjdev.naruto_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class ConfigWebClient {
    String url = "https://dattebayo-api.onrender.com";

    @Bean
    WebClient webClient() {
        return  WebClient.builder().baseUrl(url).build();
    }
}
