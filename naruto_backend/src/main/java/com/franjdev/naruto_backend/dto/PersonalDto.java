package com.franjdev.naruto_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PersonalDto {

    private String birthdate;
    private String sex;
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    @JsonSetter(nulls = Nulls.AS_EMPTY)
    private List<String> clan = new ArrayList<>();

    public PersonalDto() {
    }

    public PersonalDto(String birthdate, String sex, List<String> clan) {
        this.birthdate = birthdate;
        this.sex = sex;
        this.clan = clan;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public List<String> getClan() {
        return clan;
    }

    public void setClan(List<String> clan) {
        this.clan = clan;
    }
}
