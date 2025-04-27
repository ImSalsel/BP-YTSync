describe('Home Screen', () => {
    beforeEach(() => {
      // Visit the Home screen before each test
      cy.setCookie('userId', 'test-user-id');
      cy.visit('/');
    });
  
    it('should render the Home screen correctly', () => {
      // Check if the Home screen container is visible
      cy.get('div').contains('SalselDJ').should('be.visible');
  
      // Check if the "Add Room" button is visible
      cy.contains('+ Add Room').should('be.visible');
    });
  
    it('should display a list of rooms', () => {
      
      cy.get('[data-testid="room-tile"]').should('be.visible');
    });
  
    it('should open the "Add Room" modal when clicking the button', () => {
      // Click the "Add Room" button
      cy.get('[data-testid="add-room-tile"]').should('be.visible').click();

  
      // Check if the modal is visible
      cy.get('[data-testid="create-room-modal"]').should('be.visible');
    });
  
    it('should allow clicking on a room tile', () => {
      // Click on the first room tile
      cy.get('[data-testid="room-tile"]').first().click();
  
      // Verify that the room click handler is triggered (mock or check navigation)
      cy.url().should('include', '/room/');
    });

    it('should allow creating a new public room', () => {
      // Click the "Add Room" button
      cy.get('[data-testid="add-room-tile"]').should('be.visible').click();
  
      // Fill in the room name and type
      cy.get('[data-testid="create-room-input"]').type('Test Room');
  
      // Submit the form
      cy.get('[data-testid="create-room-button"]').click();
  
      // Verify that the new room is created and visible in the list
      cy.contains('Test Room').should('be.visible');
    });

    it('should allow creating a new private room and display code', () => {
      // Click the "Add Room" button
      cy.get('[data-testid="add-room-tile"]').should('be.visible').click();
  
      // Fill in the room name and type
      cy.get('[data-testid="create-room-input"]').type('Test private room');
      cy.get('[data-testid="private-room"]').click();
      // Submit the form
      cy.get('[data-testid="create-room-button"]').click();
  
      // Verify that the new room is created and visible in the list
      cy.contains('Test private room').should('be.visible');
      cy.get('[data-testid="code-display"]').should('be.visible').click();
    });
  });