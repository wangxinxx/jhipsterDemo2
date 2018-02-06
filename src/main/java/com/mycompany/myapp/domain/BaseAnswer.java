package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BaseAnswer.
 */
@Entity
@Table(name = "base_answer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BaseAnswer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String content;

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

    public String getContent() {
        return content;
    }

    public BaseAnswer content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean isResult() {
        return result;
    }

    public BaseAnswer result(Boolean result) {
        this.result = result;
        return this;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    public BaseQuestion getQuestion() {
        return question;
    }

    public BaseAnswer question(BaseQuestion baseQuestion) {
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
        BaseAnswer baseAnswer = (BaseAnswer) o;
        if (baseAnswer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), baseAnswer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BaseAnswer{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", result='" + isResult() + "'" +
            "}";
    }
}
