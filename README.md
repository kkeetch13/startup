## Elevator Pitch:
My website portfolio showcases my journey as a political science and computer science double major, blending analytical problem-solving with technical expertise. It highlights projects in programming, data analysis, and web development, along with an interactive game reflecting my creative approach. Take a look into my portfolio to see who I am as a person, my resume, and my techincal project history.
## Key Features:
Overview of projects completed showcasing technical skills, a resume, a game created by me, and an about me page.
## HTML: 
Basic parts of the website for navigation, layout, etc.
## CSS: 
Colors, images, font, overall design focus to make it look professional
## JavaScript: 
I plan to make a simple game, which will require JavaScript to function, such as hangman, a reaction time test, typing test, or mastermind game.
## React: 
Game: Implement the interactive game, reactive to user actions.
## Web Service: 
Save visitor interactions, like game scores or comments.
## Authentication: 
Enabling users to log in and save their high scores from the implemented game.
## Database Data:
Store visitor login credentials for personalized access and save user interactions, like game scores or form submissions.
## WebSocket:
Add a real-time feature: When a visitor interacts with the portfolio (e.g., submits a game score or leaves a comment), broadcast it to all other users viewing the portfolio in real time.
## Mock-up Design
![image](https://github.com/user-attachments/assets/17617de8-9dba-492b-af13-9ca025bcc09a)

4/1/25 Added CSS for each page, ensuring to fulfill each requirement

## HTML
Created the structure of the Startup site with key sections including navigation, a home page layout, and placeholders for future interactive content. Set up semantic HTML elements to organize the site's content.

## CSS
Styled the website with consistent branding and layout, including fonts, colors, margins, and responsive design. Added visual polish to the navigation bar, buttons, and overall layout to make the site more visually appealing and user-friendly.

## React Part 1 – Routing
Converted the static site into a React app with client-side routing using React Router. Implemented separate components for different pages (Home, Play, Projects, About), allowing seamless navigation between them.

## React Part 2 – Interactivity
Added interactive elements to the site, such as a functioning login system and responsive components. Implemented stateful behavior using hooks, and made components dynamic to respond to user actions like input and button clicks.

## Startup Service
I built a full‑stack Mastermind game application where I created a Node.js/Express backend with endpoints for authentication and high score submissions, and a React frontend that consumes these endpoints. I implemented secure login, registration, and logout functionalities while also integrating a high score submission feature based on the fastest time solved. Through this project, I learned how to manage state across components and routes, and how to seamlessly connect backend services with a modern, interactive frontend. 

## Database
By integrating MongoDB into my startup project, I learned how to persist user authentication and game data securely using a cloud database. I implemented login, registration, and session management with token-based authentication, ensuring that only authorized users could access and post scores. I also created and connected API endpoints to perform secure reads and writes from the database. This experience gave me a deeper understanding of backend development and how to connect frontend logic to a real-world database.

## WebSocket
 I set up a WebSocket server that connects to the frontend, allowing real-time communication between client and server. To enhance interactivity, I added frontend logic to send and display WebSocket messages, such as when a player submits a score.