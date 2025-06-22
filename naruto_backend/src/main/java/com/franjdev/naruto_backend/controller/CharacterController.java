package com.franjdev.naruto_backend.controller;

import com.franjdev.naruto_backend.dto.CharacterDto;
import com.franjdev.naruto_backend.dto.ListCharactersDto;
import com.franjdev.naruto_backend.services.CharactersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/characters")
public class CharacterController {

    private final CharactersService charactersService;

    public CharacterController(CharactersService charactersService) {
        this.charactersService = charactersService;
    }

    @GetMapping
    public ResponseEntity<Flux<ListCharactersDto>> getCharacters(@RequestParam(name = "page", defaultValue = "1", required = false) int page) {
        return new ResponseEntity<>(charactersService.getAllCharacters(page), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mono<CharacterDto>> getCharacterById(@PathVariable Integer id) {
        return new ResponseEntity<>(charactersService.getCharacterById(id), HttpStatus.OK);
    }
    @GetMapping("/search")
    public  Flux<CharacterDto> searchCharacterByName(@RequestParam String name) {
        return charactersService.findCharactersByName(name);
    }
}
