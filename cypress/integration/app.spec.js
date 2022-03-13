/// <reference types="cypress" />
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
    cy.contains("Log out");
    cy.contains("My categories");
    cy.contains("Create a Category");
    cy.get("select").contains("Name");
    cy.get("option").contains("Opening time");
  });
});

describe("Contains card with data", () => {
  it("should contain card", () => {
    cy.get("h2").should("contain", "2G Japanese Brasserie");
    // cy.contains("2G Japanese Brasserie").trigger("mouseover");
    cy.get("[data-testid=card-category]").should("exist");
    cy.get(
      "[data-testid=card-button-37f1242a-e1f5-4222-9c35-94d2f44fdcd1]"
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

describe("filter data", () => {
  it("should filter cards", () => {
    cy.get("[data-testid=searchInput]").should("exist");
    cy.get("[data-testid=searchInput]").type("Alhamra");
    cy.get("h2").contains("Alhamra").should("be.visible");
    cy.get("[data-testid=removeFilters]").click();
    cy.get("p").contains("Veg-lovers").click();
    cy.get("h2").contains("All Season Restaurant").should("be.visible");
    cy.get("[data-testid=removeFilters]").click();
  });
});

//one time setup for the test suite - will have the added category afterwards and need to delete it from db for reuse in testing or simply enter some garbage value each time

// describe("add new category", () => {
//   it("should add category", () => {
//     cy.contains("Create a Category");
//     cy.get("[data-testid=addCategory]").click();
//     cy.get("[data-testid=input-category]").should("be.visible");
//     cy.get("button").contains("Add New Category").should("exist");
//     cy.get("[data-testid=input-category]").type("My-specials");
//     cy.get("[data-testid=card-button-My-specials]").should("exist");
//     cy.get("[data-testid=card-button-My-specials]").click();
//   });
// });

describe("Contains new category for selection", () => {
  it("should contain new category", () => {
    cy.get(
      "[data-testid=card-button-37f1242a-e1f5-4222-9c35-94d2f44fdcd1]"
    ).click();

    cy.get("[data-testid=select-category]")
      .select(3)
      .should("have.value", "My-specials");
    cy.get("[data-testid=update-category]").click();
    cy.get("[data-testid=card-category]").should("contain", "My-specials");
  });
});

describe("check for next data", () => {
  it("should contain more cards", () => {
    cy.get("[test-id=next]").should("exist");
    cy.get("[test-id=next]").click();
    cy.get("[test-id=next]").click();
    cy.get("[test-id=next]").click();
    cy.get("[test-id=next]").click();
    cy.contains("Bow Hon Restaurant").should("be.visible");
  });
});
