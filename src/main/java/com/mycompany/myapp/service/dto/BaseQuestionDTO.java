package com.mycompany.myapp.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import com.mycompany.myapp.domain.enumeration.QuestionType;
import com.mycompany.myapp.domain.enumeration.QuestionDifficult;

/**
 * A DTO for the BaseQuestion entity.
 */
public class BaseQuestionDTO implements Serializable {

    private Long id;

    private String name;

    @Lob
    private String content;

    private QuestionType type;

    private QuestionDifficult difficult;

    private Long courseId;

    private Long exposeTimes;

    private Long rightTimes;

    private Long wrongTimes;

    private String tips;

    private String tags;

    private Boolean judgeResult;

    @Lob
    private String textResult;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public QuestionDifficult getDifficult() {
        return difficult;
    }

    public void setDifficult(QuestionDifficult difficult) {
        this.difficult = difficult;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getExposeTimes() {
        return exposeTimes;
    }

    public void setExposeTimes(Long exposeTimes) {
        this.exposeTimes = exposeTimes;
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

    public String getTips() {
        return tips;
    }

    public void setTips(String tips) {
        this.tips = tips;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Boolean isJudgeResult() {
        return judgeResult;
    }

    public void setJudgeResult(Boolean judgeResult) {
        this.judgeResult = judgeResult;
    }

    public String getTextResult() {
        return textResult;
    }

    public void setTextResult(String textResult) {
        this.textResult = textResult;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BaseQuestionDTO baseQuestionDTO = (BaseQuestionDTO) o;
        if(baseQuestionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), baseQuestionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BaseQuestionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", content='" + getContent() + "'" +
            ", type='" + getType() + "'" +
            ", difficult='" + getDifficult() + "'" +
            ", courseId=" + getCourseId() +
            ", exposeTimes=" + getExposeTimes() +
            ", rightTimes=" + getRightTimes() +
            ", wrongTimes=" + getWrongTimes() +
            ", tips='" + getTips() + "'" +
            ", tags='" + getTags() + "'" +
            ", judgeResult='" + isJudgeResult() + "'" +
            ", textResult='" + getTextResult() + "'" +
            "}";
    }
}
