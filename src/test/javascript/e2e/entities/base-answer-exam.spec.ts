import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BaseAnswer e2e test', () => {

    let navBarPage: NavBarPage;
    let baseAnswerDialogPage: BaseAnswerDialogPage;
    let baseAnswerComponentsPage: BaseAnswerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BaseAnswers', () => {
        navBarPage.goToEntity('base-answer-exam');
        baseAnswerComponentsPage = new BaseAnswerComponentsPage();
        expect(baseAnswerComponentsPage.getTitle())
            .toMatch(/Base Answers/);

    });

    it('should load create BaseAnswer dialog', () => {
        baseAnswerComponentsPage.clickOnCreateButton();
        baseAnswerDialogPage = new BaseAnswerDialogPage();
        expect(baseAnswerDialogPage.getModalTitle())
            .toMatch(/Create or edit a Base Answer/);
        baseAnswerDialogPage.close();
    });

    it('should create and save BaseAnswers', () => {
        baseAnswerComponentsPage.clickOnCreateButton();
        baseAnswerDialogPage.setContentInput('content');
        expect(baseAnswerDialogPage.getContentInput()).toMatch('content');
        baseAnswerDialogPage.getResultInput().isSelected().then((selected) => {
            if (selected) {
                baseAnswerDialogPage.getResultInput().click();
                expect(baseAnswerDialogPage.getResultInput().isSelected()).toBeFalsy();
            } else {
                baseAnswerDialogPage.getResultInput().click();
                expect(baseAnswerDialogPage.getResultInput().isSelected()).toBeTruthy();
            }
        });
        baseAnswerDialogPage.questionSelectLastOption();
        baseAnswerDialogPage.save();
        expect(baseAnswerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BaseAnswerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-base-answer-exam div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BaseAnswerDialogPage {
    modalTitle = element(by.css('h4#myBaseAnswerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    contentInput = element(by.css('input#field_content'));
    resultInput = element(by.css('input#field_result'));
    questionSelect = element(by.css('select#field_question'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setContentInput = function(content) {
        this.contentInput.sendKeys(content);
    };

    getContentInput = function() {
        return this.contentInput.getAttribute('value');
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
