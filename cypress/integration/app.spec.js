/// <reference types="cypress" />

const { url } = require("inspector");

describe("Navigation", () => {
  it("should navigate to the app", () => {
    cy.visit("http://localhost:3000/");
    // cy.get("button").contains("Sign In with Google");
    // cy.contains("button", "Sign In with Google").click();
    // cy.login("email@gmail.com", "password");
  });
});
describe("fetches data", () => {
  it("should contain data", () => {
    cy.intercept("GET", "api/getrestaurants", { fixture: "example.json" });
    cy.request("/api/getrestaurants").its("body").should("be.an", "string"); // This takes care of the async task.

    // cy.get("@response").should((response) => {

    //   // cy.log(response.body);
    //   cy.contains(response).its("body").should("have.property", "data");
    //   cy.conatins(JSON.parse(response.body).data[1].name).should("exist");
    // });
  });
});

describe("Contains Elements", () => {
  it("should contain Elements", () => {
    cy.contains("Cart");
    cy.contains("McDonald's");
    cy.contains("Absolut Citron");
    cy.contains("Checkout");
  });
});

describe("Contains card with data", () => {
  it("should contain card", () => {
    cy.get("h4").should("contain", "Almonds Ground Blanched");
    // cy.contains("2G Japanese Brasserie").trigger("mouseover");
    cy.get(
      "[data-testid=incrementCount3e119cd4-89a8-4f26-b960-2f6d7dd41c1b]"
    ).should("exist");
    cy.get(
      "[data-testid=incrementCount3e119cd4-89a8-4f26-b960-2f6d7dd41c1b]"
    ).click();
    cy.get("[data-testid=select-category]").select("5-Star specials");
    cy.get("[data-testid=update-category]").click();
    cy.get("[data-testid=card-category]").should("contain", "5-Star specials");
    cy.get(
      "[data-testid=card-button-37f1242a-e1f5-4222-9c35-94d2f44fdcd1]"
    ).click();
    cy.get("[data-testid=select-category]").select("Meat-lovers");
    cy.get("[data-testid=update-category]").click();
    cy.get("[data-testid=card-category]").should("contain", "Meat-lovers");
  });
});

describe("Contains new category for selection", () => {
  it("should contain new category", () => {
    cy.get(
      "[data-testid=card-button-37f1242a-e1f5-4222-9c35-94d2f44fdcd1]"
    ).click();
    cy.get(
      "[data-testid=card-button-37f1242a-e1f5-4222-9c35-94d2f44fdcd1]"
    ).click();
    cy.get(
      "[data-testid=card-button-37f1242a-e1f5-4222-9c35-94d2f44fdcd1]"
    ).click();
    cy.get("[data-testid=inputCount]").should("have.value", "3");
  });
});

describe("check for next data", () => {
  it("should contain more cards", () => {
    cy.get("[test-id=checkout]").should("exist");
    cy.get("[test-id=checkout]").click();
    cy.get(url).contains("cart");
  });
});
