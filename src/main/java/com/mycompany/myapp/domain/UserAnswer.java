package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UserAnswer.
 */
@Entity
@Table(name = "user_answer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserAnswer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "judge_answer")
    private Boolean judgeAnswer;

    @Lob
    @Column(name = "text_answer")
    private String textAnswer;

    @Column(name = "choice_answer_ids")
    private String choiceAnswerIds;

    @Column(name = "result")
    private Boolean result;

    @ManyToOne
    private BaseQuestion question;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public UserAnswer userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Boolean isJudgeAnswer() {
        return judgeAnswer;
    }

    public UserAnswer judgeAnswer(Boolean judgeAnswer) {
        this.judgeAnswer = judgeAnswer;
        return this;
    }

    public void setJudgeAnswer(Boolean judgeAnswer) {
        this.judgeAnswer = judgeAnswer;
    }

    public String getTextAnswer() {
        return textAnswer;
    }

    public UserAnswer textAnswer(String textAnswer) {
        this.textAnswer = textAnswer;
        return this;
    }

    public void setTextAnswer(String textAnswer) {
        this.textAnswer = textAnswer;
    }

    public String getChoiceAnswerIds() {
        return choiceAnswerIds;
    }

    public UserAnswer choiceAnswerIds(String choiceAnswerIds) {
        this.choiceAnswerIds = choiceAnswerIds;
        return this;
    }

    public void setChoiceAnswerIds(String choiceAnswerIds) {
        this.choiceAnswerIds = choiceAnswerIds;
    }

    public Boolean isResult() {
        return result;
    }

    public UserAnswer result(Boolean result) {
        this.result = result;
        return this;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    public BaseQuestion getQuestion() {
        return question;
    }

    public UserAnswer question(BaseQuestion baseQuestion) {
        this.question = baseQuestion;
        return this;
    }

    public void setQuestion(BaseQuestion baseQuestion) {
        this.question = baseQuestion;
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
        UserAnswer userAnswer = (UserAnswer) o;
        if (userAnswer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userAnswer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserAnswer{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", judgeAnswer='" + isJudgeAnswer() + "'" +
            ", textAnswer='" + getTextAnswer() + "'" +
            ", choiceAnswerIds='" + getChoiceAnswerIds() + "'" +
            ", result='" + isResult() + "'" +
            "}";
    }
}
