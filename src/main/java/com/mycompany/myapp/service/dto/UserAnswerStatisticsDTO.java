package com.mycompany.myapp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the UserAnswerStatistics entity.
 */
public class UserAnswerStatisticsDTO implements Serializable {

    private Long id;

    private Long userId;

    private Long rightTimes;

    private Long wrongTimes;

    private Long continuousRightTimes;

    private Long continuousWrongTimes;

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

    public Long getRightTimes() {
        return rightTimes;
    }

    public void setRightTimes(Long rightTimes) {
        this.rightTimes = rightTimes;
    }

    public Long getWrongTimes() {
        return wrongTimes;
    }

    public void setWrongTimes(Long wrongTimes) {
        this.wrongTimes = wrongTimes;
    }

    public Long getContinuousRightTimes() {
        return continuousRightTimes;
    }

    public void setContinuousRightTimes(Long continuousRightTimes) {
        this.continuousRightTimes = continuousRightTimes;
    }

    public Long getContinuousWrongTimes() {
        return continuousWrongTimes;
    }

    public void setContinuousWrongTimes(Long continuousWrongTimes) {
        this.continuousWrongTimes = continuousWrongTimes;
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

        UserAnswerStatisticsDTO userAnswerStatisticsDTO = (UserAnswerStatisticsDTO) o;
        if(userAnswerStatisticsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userAnswerStatisticsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserAnswerStatisticsDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", rightTimes=" + getRightTimes() +
            ", wrongTimes=" + getWrongTimes() +
            ", continuousRightTimes=" + getContinuousRightTimes() +
            ", continuousWrongTimes=" + getContinuousWrongTimes() +
            "}";
    }
}
