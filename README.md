# Digital_Library_Management_System
Design and implement a RESTful API for a digital library management system that helps 
track books, user borrowings, and reading analytics.Using Node.js, Express,MongoDB

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sripranya/Digital_Library_Management_System_Backend.git
   cd Digital_Library_Management_System_Backend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start the Server**:
   ```bash
   npm start
   ```
API Documentation 

Books:
 - GET /api/books - List all books with pagination and filters
- GET /api/books/:id - Get book details with availability
- POST /api/books - Add new book
- PUT /api/books/:id - Update book details
- GET /api/books/genre/:genre - Get books by genre
  
Members:
- GET /api/members - List members with pagination
- GET /api/members/:id - Get member details with current borrowings
- POST /api/members - Register new member
- PUT /api/members/:id - Update member details
- GET /api/members/:id/history - Get borrowing history
  
Borrowings: 
- GET /api/borrowings - List all borrowings with pagination
- POST /api/borrowings - Create new borrowing
- PUT /api/borrowings/:id/return - Process return
- GET /api/borrowings/overdue - Get overdue borrowings
- GET /api/borrowings/member/:memberId - Get member’s borrowings
  
Reading Progress:
- GET /api/progress/:borrowingId - Get reading progress
- POST /api/progress - Update reading progress
- GET /api/progress/analytics/member/:memberId - Get member’s reading analytics

## Database schema diagram 
![image alt](https://github.com/Sripranya/Digital_Library_Management_System_Backend/blob/e62d351c83e90ac088da38d4f2501e54eb76bfc2/Screenshot%202024-11-10%20233139.png)
## Example API requests and responses 
1.Books
-Get All Books

   -Endpoint: GET /api/books
   -Description: Retrieves a list of all books.
   ### Response:
      
   ![image alt](https://github.com/Sripranya/Digital_Library_Management_System_Backend/blob/b25633f8d7ab6dc445358d95abadd044fb63ae06/Book_img.png)
2.Members
-Register a New Member

   -Endpoint: POST /api/members
   =Description: Adds a new member to the library.
   -Request Body:

   Response:

      

    
  
