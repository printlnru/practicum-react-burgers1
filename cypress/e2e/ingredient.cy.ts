describe("test ingredient detail", function () {
  before("should be available on baseUrl", function () {
    cy.visit("/");
  });

  it("click first ingredient and click modal close btn", function () {
    cy.get('[class^="item-ingredient_item"]').first().click();
    cy.get('[class^="modal_close"]').click();
  });
});
