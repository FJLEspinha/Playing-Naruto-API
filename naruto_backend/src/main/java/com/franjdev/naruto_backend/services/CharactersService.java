package com.franjdev.naruto_backend.services;

import com.franjdev.naruto_backend.dto.CharacterDto;
import com.franjdev.naruto_backend.dto.ListCharactersDto;
import com.franjdev.naruto_backend.dto.ResponseCharactersApi;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class CharactersService {

    private  static final int TOTAL_PAGES = 72;

    private final WebClient webClient;

    public CharactersService(WebClient webClient) {
        this.webClient = webClient;
    }

    // Obtain All characters
    public Flux<ListCharactersDto> getAllCharacters(int page) {
        return webClient.get().uri(uriBuilder -> uriBuilder
                .path("/characters")
                .queryParam("page", page)
                .build()).retrieve().bodyToFlux(ListCharactersDto.class);
    }

    // Obteain character by id
    public Mono<CharacterDto> getCharacterById(Integer id) {
        return webClient.get().uri("/characters/" + id).retrieve().bodyToMono(CharacterDto.class);
    }


    // Obtain character by name
    public Flux<CharacterDto> findCharactersByName(String name) {
        return Flux.range(1, TOTAL_PAGES)
                .flatMap(pageNum ->
                        webClient.get().uri("characters?page="+pageNum)
                                .retrieve()
                                .bodyToMono(ResponseCharactersApi.class)
                                .flatMapMany(response -> Flux.fromIterable(response.getCharacters()))
                )
                .filter(character -> character.getName() != null &&
                        character.getName().toLowerCase().contains(name.toLowerCase()));

    }
}