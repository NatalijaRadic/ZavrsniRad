/// <reference types="Cypress" />

import { loginPage} from '../page_object/loginPagePOM'
const user = require('../fixtures/user.json')

describe('Login', () => {
    it('Successful login', () => {
        cy.visit('/login');
        loginPage.emailInputField.type(user.email);
        loginPage.passwordInputField.type(user.password);
        loginPage.submitBtn.click();
    });
    xit('Login with invalid email', () => {
        cy.visit('/login');
        loginPage.emailInputField.type('radic.1111@gmail.com');
        loginPage.passwordInputField.type(user.password);
        loginPage.submitBtn.click();
    });
    xit('Login without password', () => {
        cy.visit('/login');
        loginPage.emailInputField.type('radic.1111@gmail.com');
        loginPage.passwordInputField.clear;
        loginPage.submitBtn.click();

    });
    it('Create new board', () => {
        cy.visit('https://cypress.vivifyscrum-stage.com/login');
        loginPage.emailInputField.type(user.email);
        loginPage.passwordInputField.type(user.password);
        loginPage.submitBtn.click();
        cy.contains('Add New').click();
        cy.contains('Add Board').click();
        cy.get('input[icon="caret-top"]').type('Vivify');
        cy.get('input[name="name"]').type('Vivify');
        cy.get('button[name="next_btn"]').click();
        cy.get('span[name="type_scrum"]').click();
        cy.get('button[name="next_btn"]').contains('Next').click();
        cy.get('button[name="next_btn"]').contains('Next').click();
        cy.get('button[name="next_btn"]').contains('Next').click();
        cy.get('button[name="next_btn"]').contains('Finish').click();
        cy.url().should('contains', 'https://cypress.vivifyscrum-stage.com/boards');
    });
    it.only('Delete board', () => {
        cy.visit('https://cypress.vivifyscrum-stage.com/login');
        cy.get('input[type="email"]').type('radic.natalija+novi.mail@gmail.com');
        cy.get('input[type="password"]').type('Naftalija1986');
        cy.get('button[type="submit"]').click();
        cy.get('span').contains('Vivify');
        cy.get('li[data-type="board"]').first().click();
        cy.get('[data-cy="board-configuration"] > span > div > .vs-c-site-logo').click();
        //cy.get('a[href="/boards/15788"]').click();
        //cy.get('a[href="/boards/15803/settings"]').click();
        cy.get('button').contains('Delete').scrollIntoView().click();
        cy.get('button[name="save-btn"]').click();
        cy.url().should('not.contain', 'Vivify');


    });
    it('Delete  via API', () => {
        loginPage.loginUser(user.email, user.password)
        cy.request({
            method: 'DELETE',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards/15800'
        }).then((responseLog) => {
            cy.log();
            expect(responseLog.status).eq(200);
            expect(responseLog.token).eq();

        }
 
    
    });

})