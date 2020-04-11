# eRestaurantv2

## UPDATE - 27/03/2020
- Have integrated Firebase into our servers (Woooohoooo! But still don't know how to properly use it)
- Will try to reorganise files/folders soon, because right now it looks so messy and I am not a fan.
 
## UPDATE - 10/04/2020
Alright, so hopefully, these instructions are a bit better than the first ones... (my bad guys)

1. Please download the following:
   - __Node.js__ & __npm__ -> https://nodejs.org/en/
      - NOTE: npm is automatically installed when you install node.js
   - GitHub Desktop (this is a personal choice, but I would recommend it, as it makes pushing & pulling changes easier)
2. Clone the repo to your own computer (either via GitHub Desktop or through your terminal)
3. Open you terminal and install the __Concurrently__ npm package using either command
   - **npm install -g concurrently**
   - **npm install concurrently** --save (using npm scripts - I don't know what this exactly means)
4. Install the __nodemon__ package -> npm install -g nodemon
4. By using the **cd** command, go to where ever you saved the repo and type 'cd eRestaurantv2'
5. Type **npm install** - this should now be installing the React framework
6. Type **npm run client-install** - this is going into the client folder & installing the Express framework dependencies
7. Hopefully, that all worked out fine. So if you run **npm run dev** in your terminal, or in the terminal provided in VSCode, 
   you should be able to access the servers, which run our frontend and backend
   - http://localhost:3000/ -> frontend; should open up automatically
   - http://localhost:5000/api/employees -> database
   - NOTE: you shouldn't need to restart the servers when looking at your code changes, as they should occur when you **save**.
     But, if not, just try refreshing the page. 
8. To stop/end the servers, in your terminal, press **ctrl+c**, which is a signal that ends processes
