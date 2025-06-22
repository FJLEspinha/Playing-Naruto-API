package com.franjdev.naruto_backend.dto;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

public class CharacterDto {

    private Integer id;
    private String name;
    private List<String> images;
    private List<String> jutsu;
    private Object personal;


    public PersonalDto getPersonalSafe() {
        if (personal instanceof java.util.Map) {
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY,true);
            PersonalDto personalDto = mapper.convertValue(personal,PersonalDto.class);

            if(personalDto.getClan() == null){
                Object clanRaw = ((Map<?,?>) personal).get("clan");
                if(clanRaw instanceof String) {
                    personalDto.setClan(List.of((String) clanRaw ));
                }
            }
            return personalDto;
        }

        return new PersonalDto();
    }

    public CharacterDto() {
    }

    public CharacterDto(Integer id, String name, List<String> images, List<String> jutsu, Object personalDto) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.jutsu = jutsu;
        this.personal = personalDto;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getJutsu() {
        return jutsu;
    }

    public void setJutsu(List<String> jutsu) {
        this.jutsu = jutsu;
    }

    public Object getPersonal() {
        return personal;
    }

    public void setPersonal(Object personal) {
        this.personal = personal;
    }
}
