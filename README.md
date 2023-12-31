## Meal Planner - What's in your fridge?

Your easy-to-use, handy application to track ingredients (or food in general) in your fridge. Don't know what to cook? Browse through suggested recipes and get inspired to prepare your next meal. Best viewed on desktop.<br />

Why this application? I simply love food. As a busy working adult juggling many responsibilities, I do get frustrated when my fridge is cluttered - certain foods expire and are forgotten (sometimes).

## Project Brief

### MVP - Minimum Viable Product

<ul>
 <li>Built using React framework with at least</li>
 - 5 components<br />
 - 4 props<br />
 - 2 useStates<br />
 - 2 react router routes<br />
 - 1 lifting state, which is used to implement CRUD on the client side<br />
 <li>Use of a 3rd party API and Airtable</li>
 <li>Deployed online using Vercel</li>
 <li>Implementation of a full-CRUD (Create, Read, Update & Delete) single model operations within the application's features</li>
 <li>Daily commits onto GitHub</li>
</ul>

## Getting Started

What's in your fridge? is deployed on Vercel, click here to view the application - https://mealplanner-nu.vercel.app/

### Technologies Used

- HTML
- CSS
- Bootstrap
- React
- Material UI
- Airtable
- TheMealDB (API)
- Git/GitHub

### Project Planning and Development

Time given to complete this project is about 1 week.<br />

I outlined the steps I took to build this project below:
1. Using a Kanban board, I planned out the Ice Box items that I wanted to implement in my project. I placed myself in the shoes of potential users of my application, and as an application user myself, I crafted the layout, design, features, and React components. View my Trello board here - https://trello.com/b/mH0NGpRU/meal-planner
2. Build the skeleton and components of the application using HTML, CSS (and Bootstrap), and React. Components include:
- Fridge (Main)
- Form to create ingredient
- Ingredient Card
- Form to update ingredient details
- Delete Button to remove ingredient
- Recipe List
- Recipe Card
3. Integration of Airtable in the application. Ingredient data keyed in by the user will be stored, retrieved, and updated using the GET, PUT, PATCH, and DELETE methods.
Debugging was a challenge especially when dates were involved which took up a significant amount of my time. The date format generated by the system was similar to "2023-09-21T16:00:00.000Z" and as such, one of the mentioned methods above would not work when I tried to re-format the dates to reflect "dd/mm/yyyy" format for readability. I had to make sure all data fetched, entered/updated, and imported onto Airtable reflects the same format for this to work.
4. Integration of 3rd party API, TheMealDB to fetch recipe information.
5. Adding validations for the forms such that the user is unable to submit the form if, for example, the expiry date is earlier than the purchase date and vice versa, or the fields are empty, etc.

## Screenshots

### Main Page
(The <em>portal</em> is through the fridge)<br /><br />
![image](https://github.com/evangelenesiyin/mealplanner/assets/108106809/0b5c7924-f9fc-47f9-9295-da368587c9c7)

### Ingredients Tracker
"Add New Ingredient" activates a form in which the user can fill in the name, type, purchase, and expiry dates.<br />
"Recipe Randomizer" leads the user to a list of suggested recipes for consideration.<br />

Click on the pencil and cross icons on each ingredient card to edit and delete the entry.<br/>

![image](https://github.com/evangelenesiyin/mealplanner/assets/108106809/6db6fc7f-09f8-4a19-a514-a79cb0cb3adf)

### Recipe Randomizer
![image](https://github.com/evangelenesiyin/mealplanner/assets/108106809/5b591b7b-deeb-4b89-8334-0b90fe59c65b)

## Next Steps

- Add a filter and sort feature to categorise the listed ingredients e.g. filter by type, sort by ingredients which are expiring soon
- Mobile optimisation
