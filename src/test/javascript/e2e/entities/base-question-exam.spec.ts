import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BaseQuestion e2e test', () => {

    let navBarPage: NavBarPage;
    let baseQuestionDialogPage: BaseQuestionDialogPage;
    let baseQuestionComponentsPage: BaseQuestionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BaseQuestions', () => {
        navBarPage.goToEntity('base-question-exam');
        baseQuestionComponentsPage = new BaseQuestionComponentsPage();
        expect(baseQuestionComponentsPage.getTitle())
            .toMatch(/Base Questions/);

    });

    it('should load create BaseQuestion dialog', () => {
        baseQuestionComponentsPage.clickOnCreateButton();
        baseQuestionDialogPage = new BaseQuestionDialogPage();
        expect(baseQuestionDialogPage.getModalTitle())
            .toMatch(/Create or edit a Base Question/);
        baseQuestionDialogPage.close();
    });

    it('should create and save BaseQuestions', () => {
        baseQuestionComponentsPage.clickOnCreateButton();
        baseQuestionDialogPage.setNameInput('name');
        expect(baseQuestionDialogPage.getNameInput()).toMatch('name');
        baseQuestionDialogPage.setContentInput('content');
        expect(baseQuestionDialogPage.getContentInput()).toMatch('content');
        baseQuestionDialogPage.typeSelectLastOption();
        baseQuestionDialogPage.difficultSelectLastOption();
        baseQuestionDialogPage.setCourseIdInput('5');
        expect(baseQuestionDialogPage.getCourseIdInput()).toMatch('5');
        baseQuestionDialogPage.setExposeTimesInput('5');
        expect(baseQuestionDialogPage.getExposeTimesInput()).toMatch('5');
        baseQuestionDialogPage.setRightTimesInput('5');
        expect(baseQuestionDialogPage.getRightTimesInput()).toMatch('5');
        baseQuestionDialogPage.setWrongTimesInput('5');
        expect(baseQuestionDialogPage.getWrongTimesInput()).toMatch('5');
        baseQuestionDialogPage.setTipsInput('tips');
        expect(baseQuestionDialogPage.getTipsInput()).toMatch('tips');
        baseQuestionDialogPage.setTagsInput('tags');
        expect(baseQuestionDialogPage.getTagsInput()).toMatch('tags');
        baseQuestionDialogPage.getJudgeResultInput().isSelected().then((selected) => {
            if (selected) {
                baseQuestionDialogPage.getJudgeResultInput().click();
                expect(baseQuestionDialogPage.getJudgeResultInput().isSelected()).toBeFalsy();
            } else {
                baseQuestionDialogPage.getJudgeResultInput().click();
                expect(baseQuestionDialogPage.getJudgeResultInput().isSelected()).toBeTruthy();
            }
        });
        baseQuestionDialogPage.setTextResultInput('textResult');
        expect(baseQuestionDialogPage.getTextResultInput()).toMatch('textResult');
        baseQuestionDialogPage.save();
        expect(baseQuestionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BaseQuestionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-base-question-exam div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BaseQuestionDialogPage {
    modalTitle = element(by.css('h4#myBaseQuestionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    contentInput = element(by.css('textarea#field_content'));
    typeSelect = element(by.css('select#field_type'));
    difficultSelect = element(by.css('select#field_difficult'));
    courseIdInput = element(by.css('input#field_courseId'));
    exposeTimesInput = element(by.css('input#field_exposeTimes'));
    rightTimesInput = element(by.css('input#field_rightTimes'));
    wrongTimesInput = element(by.css('input#field_wrongTimes'));
    tipsInput = element(by.css('input#field_tips'));
    tagsInput = element(by.css('input#field_tags'));
    judgeResultInput = element(by.css('input#field_judgeResult'));
    textResultInput = element(by.css('textarea#field_textResult'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setContentInput = function(content) {
        this.contentInput.sendKeys(content);
    };

    getContentInput = function() {
        return this.contentInput.getAttribute('value');
    };

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    };
    setDifficultSelect = function(difficult) {
        this.difficultSelect.sendKeys(difficult);
    };

    getDifficultSelect = function() {
        return this.difficultSelect.element(by.css('option:checked')).getText();
    };

    difficultSelectLastOption = function() {
        this.difficultSelect.all(by.tagName('option')).last().click();
    };
    setCourseIdInput = function(courseId) {
        this.courseIdInput.sendKeys(courseId);
    };

    getCourseIdInput = function() {
        return this.courseIdInput.getAttribute('value');
    };

    setExposeTimesInput = function(exposeTimes) {
        this.exposeTimesInput.sendKeys(exposeTimes);
    };

    getExposeTimesInput = function() {
        return this.exposeTimesInput.getAttribute('value');
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

    setTipsInput = function(tips) {
        this.tipsInput.sendKeys(tips);
    };

    getTipsInput = function() {
        return this.tipsInput.getAttribute('value');
    };

    setTagsInput = function(tags) {
        this.tagsInput.sendKeys(tags);
    };

    getTagsInput = function() {
        return this.tagsInput.getAttribute('value');
    };

    getJudgeResultInput = function() {
        return this.judgeResultInput;
    };
    setTextResultInput = function(textResult) {
        this.textResultInput.sendKeys(textResult);
    };

    getTextResultInput = function() {
        return this.textResultInput.getAttribute('value');
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
