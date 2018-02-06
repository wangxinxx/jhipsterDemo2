import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UserAnswerStatistics e2e test', () => {

    let navBarPage: NavBarPage;
    let userAnswerStatisticsDialogPage: UserAnswerStatisticsDialogPage;
    let userAnswerStatisticsComponentsPage: UserAnswerStatisticsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserAnswerStatistics', () => {
        navBarPage.goToEntity('user-answer-statistics-exam');
        userAnswerStatisticsComponentsPage = new UserAnswerStatisticsComponentsPage();
        expect(userAnswerStatisticsComponentsPage.getTitle())
            .toMatch(/User Answer Statistics/);

    });

    it('should load create UserAnswerStatistics dialog', () => {
        userAnswerStatisticsComponentsPage.clickOnCreateButton();
        userAnswerStatisticsDialogPage = new UserAnswerStatisticsDialogPage();
        expect(userAnswerStatisticsDialogPage.getModalTitle())
            .toMatch(/Create or edit a User Answer Statistics/);
        userAnswerStatisticsDialogPage.close();
    });

    it('should create and save UserAnswerStatistics', () => {
        userAnswerStatisticsComponentsPage.clickOnCreateButton();
        userAnswerStatisticsDialogPage.setUserIdInput('5');
        expect(userAnswerStatisticsDialogPage.getUserIdInput()).toMatch('5');
        userAnswerStatisticsDialogPage.setRightTimesInput('5');
        expect(userAnswerStatisticsDialogPage.getRightTimesInput()).toMatch('5');
        userAnswerStatisticsDialogPage.setWrongTimesInput('5');
        expect(userAnswerStatisticsDialogPage.getWrongTimesInput()).toMatch('5');
        userAnswerStatisticsDialogPage.setContinuousRightTimesInput('5');
        expect(userAnswerStatisticsDialogPage.getContinuousRightTimesInput()).toMatch('5');
        userAnswerStatisticsDialogPage.setContinuousWrongTimesInput('5');
        expect(userAnswerStatisticsDialogPage.getContinuousWrongTimesInput()).toMatch('5');
        userAnswerStatisticsDialogPage.questionSelectLastOption();
        userAnswerStatisticsDialogPage.save();
        expect(userAnswerStatisticsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserAnswerStatisticsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-answer-statistics-exam div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class UserAnswerStatisticsDialogPage {
    modalTitle = element(by.css('h4#myUserAnswerStatisticsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userIdInput = element(by.css('input#field_userId'));
    rightTimesInput = element(by.css('input#field_rightTimes'));
    wrongTimesInput = element(by.css('input#field_wrongTimes'));
    continuousRightTimesInput = element(by.css('input#field_continuousRightTimes'));
    continuousWrongTimesInput = element(by.css('input#field_continuousWrongTimes'));
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

    setRightTimesInput = function(rightTimes) {
        this.rightTimesInput.sendKeys(rightTimes);
    };

    getRightTimesInput = function() {
        return this.rightTimesInput.getAttribute('value');
    };

    setWrongTimesInput = function(wrongTimes) {
        this.wrongTimesInput.sendKeys(wrongTimes);
    };

    getWrongTimesInput = function() {
        return this.wrongTimesInput.getAttribute('value');
    };

    setContinuousRightTimesInput = function(continuousRightTimes) {
        this.continuousRightTimesInput.sendKeys(continuousRightTimes);
    };

    getContinuousRightTimesInput = function() {
        return this.continuousRightTimesInput.getAttribute('value');
    };

    setContinuousWrongTimesInput = function(continuousWrongTimes) {
        this.continuousWrongTimesInput.sendKeys(continuousWrongTimes);
    };

    getContinuousWrongTimesInput = function() {
        return this.continuousWrongTimesInput.getAttribute('value');
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
