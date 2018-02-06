package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mycompany.myapp.domain.enumeration.QuestionType;

import com.mycompany.myapp.domain.enumeration.QuestionDifficult;

/**
 * A BaseQuestion.
 */
@Entity
@Table(name = "base_question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BaseQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "content")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private QuestionType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "difficult")
    private QuestionDifficult difficult;

    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "expose_times")
    private Long exposeTimes;

    @Column(name = "right_times")
    private Long rightTimes;

    @Column(name = "wrong_times")
    private Long wrongTimes;

    @Column(name = "tips")
    private String tips;

    @Column(name = "tags")
    private String tags;

    @Column(name = "judge_result")
    private Boolean judgeResult;

    @Lob
    @Column(name = "text_result")
    private String textResult;

    @OneToMany(mappedBy = "question")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BaseAnswer> answers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public BaseQuestion name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public BaseQuestion content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public QuestionType getType() {
        return type;
    }

    public BaseQuestion type(QuestionType type) {
        this.type = type;
        return this;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public QuestionDifficult getDifficult() {
        return difficult;
    }

    public BaseQuestion difficult(QuestionDifficult difficult) {
        this.difficult = difficult;
        return this;
    }

    public void setDifficult(QuestionDifficult difficult) {
        this.difficult = difficult;
    }

    public Long getCourseId() {
        return courseId;
    }

    public BaseQuestion courseId(Long courseId) {
        this.courseId = courseId;
        return this;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getExposeTimes() {
        return exposeTimes;
    }

    public BaseQuestion exposeTimes(Long exposeTimes) {
        this.exposeTimes = exposeTimes;
        return this;
    }

    public void setExposeTimes(Long exposeTimes) {
        this.exposeTimes = exposeTimes;
    }

    public Long getRightTimes() {
        return rightTimes;
    }

    public BaseQuestion rightTimes(Long rightTimes) {
        this.rightTimes = rightTimes;
        return this;
    }

    public void setRightTimes(Long rightTimes) {
        this.rightTimes = rightTimes;
    }

    public Long getWrongTimes() {
        return wrongTimes;
    }

    public BaseQuestion wrongTimes(Long wrongTimes) {
        this.wrongTimes = wrongTimes;
        return this;
    }

    public void setWrongTimes(Long wrongTimes) {
        this.wrongTimes = wrongTimes;
    }

    public String getTips() {
        return tips;
    }

    public BaseQuestion tips(String tips) {
        this.tips = tips;
        return this;
    }

    public void setTips(String tips) {
        this.tips = tips;
    }

    public String getTags() {
        return tags;
    }

    public BaseQuestion tags(String tags) {
        this.tags = tags;
        return this;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Boolean isJudgeResult() {
        return judgeResult;
    }

    public BaseQuestion judgeResult(Boolean judgeResult) {
        this.judgeResult = judgeResult;
        return this;
    }

    public void setJudgeResult(Boolean judgeResult) {
        this.judgeResult = judgeResult;
    }

    public String getTextResult() {
        return textResult;
    }

    public BaseQuestion textResult(String textResult) {
        this.textResult = textResult;
        return this;
    }

    public void setTextResult(String textResult) {
        this.textResult = textResult;
    }

    public Set<BaseAnswer> getAnswers() {
        return answers;
    }

    public BaseQuestion answers(Set<BaseAnswer> baseAnswers) {
        this.answers = baseAnswers;
        return this;
    }

    public BaseQuestion addAnswers(BaseAnswer baseAnswer) {
        this.answers.add(baseAnswer);
        baseAnswer.setQuestion(this);
        return this;
    }

    public BaseQuestion removeAnswers(BaseAnswer baseAnswer) {
        this.answers.remove(baseAnswer);
        baseAnswer.setQuestion(null);
        return this;
    }

    public void setAnswers(Set<BaseAnswer> baseAnswers) {
        this.answers = baseAnswers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BaseQuestion baseQuestion = (BaseQuestion) o;
        if (baseQuestion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), baseQuestion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BaseQuestion{" +
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
