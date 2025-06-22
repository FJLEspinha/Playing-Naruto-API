package com.franjdev.naruto_backend.dto;

import java.util.List;

public class ListCharactersDto {

    List<CharacterDto> characters;

    public ListCharactersDto() {
    }

    public ListCharactersDto(List<CharacterDto> characters) {
        this.characters = characters;
    }

    public List<CharacterDto> getCharacters() {
        return characters;
    }

    public void setCharacters(List<CharacterDto> characters) {
        this.characters = characters;
    }
}
