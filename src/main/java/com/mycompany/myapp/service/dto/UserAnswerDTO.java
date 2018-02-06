package com.mycompany.myapp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the UserAnswer entity.
 */
public class UserAnswerDTO implements Serializable {

    private Long id;

    private Long userId;

    private Boolean judgeAnswer;

    @Lob
    private String textAnswer;

    private String choiceAnswerIds;

    private Boolean result;

    private Long questionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Boolean isJudgeAnswer() {
        return judgeAnswer;
    }

    public void setJudgeAnswer(Boolean judgeAnswer) {
        this.judgeAnswer = judgeAnswer;
    }

    public String getTextAnswer() {
        return textAnswer;
    }

    public void setTextAnswer(String textAnswer) {
        this.textAnswer = textAnswer;
    }

    public String getChoiceAnswerIds() {
        return choiceAnswerIds;
    }

    public void setChoiceAnswerIds(String choiceAnswerIds) {
        this.choiceAnswerIds = choiceAnswerIds;
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

        UserAnswerDTO userAnswerDTO = (UserAnswerDTO) o;
        if(userAnswerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userAnswerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserAnswerDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", judgeAnswer='" + isJudgeAnswer() + "'" +
            ", textAnswer='" + getTextAnswer() + "'" +
            ", choiceAnswerIds='" + getChoiceAnswerIds() + "'" +
            ", result='" + isResult() + "'" +
            "}";
    }
}
