# eRestaurantv2

So, this new and improved Repo (I hope), it actually just has React and Express integrated together.
I am not a genius, I just spent some time watching Youtube videos and reading articles.

In order to properly access the servers, you'll have to install React and Express onto
you systems. I'll try to go step by step and explain things as best as I can, but if you need further
clarification on anything, please message me.

1. Add the repo to your own GitHub Desktop.
2. Download npm, if you don't have it installed onto your computer already. 
   - npm is a package manager for the node.js platform (Express framework) and it basically manages
     the dependencies of the server
3. Open your Terminal/Command Prompt and type the command 'cd eRestaurantv2'.
   - This should be the same for both Mac and Windows devices
4. Type 'npm install'
   - This is installing all the dependencies and files for the react framework
5. Type 'npm run client-install'
   - This is a custom script that is design the "cd" (go into) the client folder, and then install
   the express framework dependencies
   - NOTE: If this doesn't work, the script doesn't work (HAHAHAHAHA) Instead, run the commands
   separately, i.e. 'cd client' and then, 'npm install'.
6. Type 'npm run dev' to run both the react and express servers, simultaneously.
   - It should open up a separate web browser to localhost:3000, and show the sample data I put in there.
   	- SIDE NOTE: Since we're in quaratine, I recommend watching Marvel's Runaways, whose characters'
	   names I put as the sample data. Unfortunately, only Season 1 is available on Disney+, and it sadly, only has
	   a  total of 3 seasons. Enjoy :)
   - To view the database, open a new tab, and go to 'localhost:5000/api/customers
7. To stop your servers, in your terminal/command line, just press 'Ctrl + C' twice - this basically suspends everything

The main html and js files are in client/src
- Currently, App.js is the initial loaded page

----------------------------------------------------------------------------------------------------------------------------
UPDATE - 27/03/2020
- Have integrated Firebase into our servers (Woooohoooo! But still don't know how to properly use it)
- Will try to reorganise files/folders soon, because right now it looks so messy and I am not a fan.
 

