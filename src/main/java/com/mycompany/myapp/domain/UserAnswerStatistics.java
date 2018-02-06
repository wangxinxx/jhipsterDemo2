package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UserAnswerStatistics.
 */
@Entity
@Table(name = "user_answer_statistics")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserAnswerStatistics implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "right_times")
    private Long rightTimes;

    @Column(name = "wrong_times")
    private Long wrongTimes;

    @Column(name = "continuous_right_times")
    private Long continuousRightTimes;

    @Column(name = "continuous_wrong_times")
    private Long continuousWrongTimes;

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

    public UserAnswerStatistics userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRightTimes() {
        return rightTimes;
    }

    public UserAnswerStatistics rightTimes(Long rightTimes) {
        this.rightTimes = rightTimes;
        return this;
    }

    public void setRightTimes(Long rightTimes) {
        this.rightTimes = rightTimes;
    }

    public Long getWrongTimes() {
        return wrongTimes;
    }

    public UserAnswerStatistics wrongTimes(Long wrongTimes) {
        this.wrongTimes = wrongTimes;
        return this;
    }

    public void setWrongTimes(Long wrongTimes) {
        this.wrongTimes = wrongTimes;
    }

    public Long getContinuousRightTimes() {
        return continuousRightTimes;
    }

    public UserAnswerStatistics continuousRightTimes(Long continuousRightTimes) {
        this.continuousRightTimes = continuousRightTimes;
        return this;
    }

    public void setContinuousRightTimes(Long continuousRightTimes) {
        this.continuousRightTimes = continuousRightTimes;
    }

    public Long getContinuousWrongTimes() {
        return continuousWrongTimes;
    }

    public UserAnswerStatistics continuousWrongTimes(Long continuousWrongTimes) {
        this.continuousWrongTimes = continuousWrongTimes;
        return this;
    }

    public void setContinuousWrongTimes(Long continuousWrongTimes) {
        this.continuousWrongTimes = continuousWrongTimes;
    }

    public BaseQuestion getQuestion() {
        return question;
    }

    public UserAnswerStatistics question(BaseQuestion baseQuestion) {
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
        UserAnswerStatistics userAnswerStatistics = (UserAnswerStatistics) o;
        if (userAnswerStatistics.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userAnswerStatistics.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserAnswerStatistics{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", rightTimes=" + getRightTimes() +
            ", wrongTimes=" + getWrongTimes() +
            ", continuousRightTimes=" + getContinuousRightTimes() +
            ", continuousWrongTimes=" + getContinuousWrongTimes() +
            "}";
    }
}
