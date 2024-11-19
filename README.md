GitHub Repository:
https://github.com/tusharbansal19/channelblend-sneakers


Source Code: the entire project to the GitHub repository, including both the frontend (React app) and any backend code (if applicable).
README Instructions: In the README file include the following sections:

a. Project Setup Instructions:


Frontend Setup:
Clone the repository to local machine:
git clone <repository-url>
Navigate to the project folder:
cd sneakers-collection
Install the required dependencies:
npm install
To run the frontend locally, use the following command:
npm start

This will start the React development server. Open the browser and go to http://localhost:5173 to view the application.




Backend Setup (if applicable):
If the project includes a backend (Node.js and Express), include steps to set up the backend.
Install backend dependencies (e.g., npm install for Express).
Start the backend server (e.g., npm run server).


The backend API should be hosted locally (e.g., http://localhost:5000).


b. API Endpoints (if backend is included):
If your project includes a backend with API endpoints, document the following:


Endpoint 1: /api/products:

Method: GET
Description: Fetches the list of products.
Response: A JSON array containing product details (name, price, image, description, etc.).

Endpoint 2: /api/products/:id (optional):

Method: GET
Description: Fetches a single product by its ID.
Response: JSON data with the details of the requested product.
Design Decisions:

UI/UX Design: 

I used a simple and modern design with a focus on ease of use. The homepage includes a search bar for users to find specific sneakers. There’s also a filter dropdown to narrow results by brand. I implemented a modal for viewing more details of each product, which keeps the interface clean.
Responsive Design: I made sure the app is fully responsive by using CSS Grid and Flexbox for layout management. This ensures that the app works on both desktop and mobile devices.
Routing with React Router: React Router was used to handle navigation between different pages, such as the homepage and product detail pages.


Challenges Faced:


Challenge 1: Filtering Products by Brand: Filtering the products based on the selected brand was tricky because the brand names had inconsistent formatting. I resolved this by normalizing the brand names (converting them to lowercase) before comparison.
How I Overcame the Challenges:

For the modal, I used React's useState and useEffect hooks to manage the modal state and show/hide it dynamically.
For the brand filter, I added a check for case-insensitivity and made sure the dropdown only displayed unique brand names.