package com.mycompany.myapp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BaseAnswer entity.
 */
public class BaseAnswerDTO implements Serializable {

    private Long id;

    private String content;

    private Boolean result;

    private Long questionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean isResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long baseQuestionId) {
        this.questionId = baseQuestionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BaseAnswerDTO baseAnswerDTO = (BaseAnswerDTO) o;
        if(baseAnswerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), baseAnswerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BaseAnswerDTO{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", result='" + isResult() + "'" +
            "}";
    }
}
