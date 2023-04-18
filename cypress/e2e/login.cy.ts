/**
 * Test scenario for Login
 *
 * - Login
 * -- should enable submit button when input email with correct format
 * -- should disable submit button when input email with wrong format
 * -- should login successfully
 */

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");

    cy.get('[data-cy="input-email"]').as("input-email");
    cy.get('[data-cy="input-password"]').as("input-password");
    cy.get('[data-cy="button-submit"]').as("button-submit");

    cy.get("@input-email").clear();
    cy.get("@input-password").clear();
  });

  it("should enable submit button when input email with correct format", () => {
    cy.get("@button-submit").should("be.disabled");

    cy.get("@input-email").type("email@mail.com");
    cy.get("@input-password").type("abcdefg");

    cy.get("@button-submit").should("be.enabled");
  });

  it("should disable submit button when input email with wrong format", () => {
    cy.get("@button-submit").should("be.disabled");

    cy.get("@input-email").type("email@mail.com");
    cy.get("@input-password").type("abcdefg");

    cy.get("@button-submit").should("be.enabled");

    cy.get("@input-email").clear();
    cy.get("@input-email").type("email@mail");

    cy.get("@button-submit").should("be.disabled");
  });

  it("should login successfully", () => {
    cy.get("@input-email").type("email@mail.com");
    cy.get("@input-password").type("asdfasdf");

    cy.get("@button-submit").click();

    cy.url().should("include", "/threads");
    cy.get('[data-cy="app-bar"]').should("contain", "We The Thread");
  });
});
