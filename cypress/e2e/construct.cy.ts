describe("service is available", function () {
  before("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });




  it('should open and close some ingredient', function() {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[class^="modal_close"]').click();
});




  it("should be available on localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });
});
