import "@4tw/cypress-drag-drop";

describe("create burger and send order", function () {
  before("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });

  it("drag-and-drop", function () {
    cy.get('[class^="item-ingredient_item"]').eq(1).drag('[class^="burger-constructor"]');
    cy.get('[class^="item-ingredient_item"]').eq(6).drag('[class^="burger-constructor"]');
    cy.get('[class^="item-ingredient_item"]').eq(8).drag('[class^="burger-constructor"]');

    cy.wait(100);

    cy.get("button").contains("Оформить").click();
    cy.wait(1000);

    cy.get('[data-cy="auth_input_login"]').type("test1@yandex.ru");
    cy.get('[data-cy="auth_input_password"]').type("password");
    cy.get('[data-cy="auth_btn_submit"]').click();
    cy.wait(2000);


    cy.get('[data-cy="main_order_btn_submit"]').click();
    cy.wait(20000);

    cy.get('[data-cy="modal_btn_close"]').click();
    cy.wait(1000);

  });

  
});
