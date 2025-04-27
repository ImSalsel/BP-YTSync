describe('Room Screen', () => {
beforeEach(() => {

    cy.setCookie('userId', 'test-user-id');
    

    cy.visit('/room/music');
  });

  it('should render the Room page correctly', () => {
    // Check if the Room container is visible
    cy.get('[data-testid="room-container"]').should('be.visible');

    // Check if the search bar is visible
    cy.get('[data-testid="search-bar"]').should('be.visible');

    // Check if the video player is visible
    cy.get('[data-testid="video-player"]').should('be.visible');

    // Check if the queue container is visible
    cy.get('[data-testid="queue-container"]').should('be.visible');
  });

  it('should allow searching for a video and after 10s skip video', () => {
    // Type a search term into the search bar
    cy.get('[data-testid="search-bar"]').type('Test Video{enter}');

    cy.get('[data-testid="video-player"] iframe')
    .should('be.visible')
    .and('have.attr', 'src')
    .and('include', 'youtube.com');

    cy.wait(10000); // Wait for the video to load
    cy.get('[data-testid="dislike"]').first().should('be.visible').click();
   
  });

});