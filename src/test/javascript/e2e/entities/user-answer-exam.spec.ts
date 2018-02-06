import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UserAnswer e2e test', () => {

    let navBarPage: NavBarPage;
    let userAnswerDialogPage: UserAnswerDialogPage;
    let userAnswerComponentsPage: UserAnswerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserAnswers', () => {
        navBarPage.goToEntity('user-answer-exam');
        userAnswerComponentsPage = new UserAnswerComponentsPage();
        expect(userAnswerComponentsPage.getTitle())
            .toMatch(/User Answers/);

    });

    it('should load create UserAnswer dialog', () => {
        userAnswerComponentsPage.clickOnCreateButton();
        userAnswerDialogPage = new UserAnswerDialogPage();
        expect(userAnswerDialogPage.getModalTitle())
            .toMatch(/Create or edit a User Answer/);
        userAnswerDialogPage.close();
    });

    it('should create and save UserAnswers', () => {
        userAnswerComponentsPage.clickOnCreateButton();
        userAnswerDialogPage.setUserIdInput('5');
        expect(userAnswerDialogPage.getUserIdInput()).toMatch('5');
        userAnswerDialogPage.getJudgeAnswerInput().isSelected().then((selected) => {
            if (selected) {
                userAnswerDialogPage.getJudgeAnswerInput().click();
                expect(userAnswerDialogPage.getJudgeAnswerInput().isSelected()).toBeFalsy();
            } else {
                userAnswerDialogPage.getJudgeAnswerInput().click();
                expect(userAnswerDialogPage.getJudgeAnswerInput().isSelected()).toBeTruthy();
            }
        });
        userAnswerDialogPage.setTextAnswerInput('textAnswer');
        expect(userAnswerDialogPage.getTextAnswerInput()).toMatch('textAnswer');
        userAnswerDialogPage.setChoiceAnswerIdsInput('choiceAnswerIds');
        expect(userAnswerDialogPage.getChoiceAnswerIdsInput()).toMatch('choiceAnswerIds');
        userAnswerDialogPage.getResultInput().isSelected().then((selected) => {
            if (selected) {
                userAnswerDialogPage.getResultInput().click();
                expect(userAnswerDialogPage.getResultInput().isSelected()).toBeFalsy();
            } else {
                userAnswerDialogPage.getResultInput().click();
                expect(userAnswerDialogPage.getResultInput().isSelected()).toBeTruthy();
            }
        });
        userAnswerDialogPage.questionSelectLastOption();
        userAnswerDialogPage.save();
        expect(userAnswerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserAnswerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-answer-exam div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class UserAnswerDialogPage {
    modalTitle = element(by.css('h4#myUserAnswerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userIdInput = element(by.css('input#field_userId'));
    judgeAnswerInput = element(by.css('input#field_judgeAnswer'));
    textAnswerInput = element(by.css('textarea#field_textAnswer'));
    choiceAnswerIdsInput = element(by.css('input#field_choiceAnswerIds'));
    resultInput = element(by.css('input#field_result'));
    questionSelect = element(by.css('select#field_question'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setUserIdInput = function(userId) {
        this.userIdInput.sendKeys(userId);
    };

    getUserIdInput = function() {
        return this.userIdInput.getAttribute('value');
    };

    getJudgeAnswerInput = function() {
        return this.judgeAnswerInput;
    };
    setTextAnswerInput = function(textAnswer) {
        this.textAnswerInput.sendKeys(textAnswer);
    };

    getTextAnswerInput = function() {
        return this.textAnswerInput.getAttribute('value');
    };

    setChoiceAnswerIdsInput = function(choiceAnswerIds) {
        this.choiceAnswerIdsInput.sendKeys(choiceAnswerIds);
    };

    getChoiceAnswerIdsInput = function() {
        return this.choiceAnswerIdsInput.getAttribute('value');
    };

    getResultInput = function() {
        return this.resultInput;
    };
    questionSelectLastOption = function() {
        this.questionSelect.all(by.tagName('option')).last().click();
    };

    questionSelectOption = function(option) {
        this.questionSelect.sendKeys(option);
    };

    getQuestionSelect = function() {
        return this.questionSelect;
    };

    getQuestionSelectedOption = function() {
        return this.questionSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
