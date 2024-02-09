## 🍉 What's In Your Fridge? - Meal Planner App

What's In Your Fridge? is an easy-to-use, handy application to track ingredients (or food in general) in your fridge. Don't know what to cook? Browse through suggested recipes and get inspired to prepare your next meal. Best viewed on desktop.<br />

Why this application? I simply love food. As a busy working adult juggling many responsibilities, I do get frustrated when my fridge is cluttered - certain foods expire and are forgotten (sometimes).

## ✨ Features

- 🍎 Create a new ingredient record by filling in the ingredient name, type, purchase and expiry dates
- 🥥 View all saved records upon reloading the page
- 🍊 Edit an existing record
- 🍇 Delete an existing record
- 🍳 Generate randomised recipes via the use of API

## 🛠️ Built With

- `Vite`
- `React`
- `CSS`
- `Bootstrap`
- `Material-UI`
- `Airtable`
- `TheMealDB (API)`

## 📝 Process

This is my second project during my course at General Assembly. The time given to complete this project was about a week. I was required to include at least 5 components, 4 props, 2 useStates, 2 react-router routes and 1 lifting state. It was also required for me to integrate a 3rd party API, and Airtable to store my data, and implement a full CRUD (`Create`, `Read`, `Update` and `Delete`) in my application.

I started by planning the Ice Box items that I wanted to implement in my project using a Kanban board. I placed myself in the shoes of potential users of my application, and as an application user myself. [[Trello]](https://trello.com/b/mH0NGpRU/meal-planner)

As this was my first time using Airtable, I learnt how to implement CRUD using the `GET`, `PUT`, `PATCH`, and `DELETE` methods. 

Debugging was a challenge especially when dates, combined with Airtable, were involved and it took a significant amount of my time during the project. I learnt that the system uses the ISO-8601 date representation by default and as such, one of the methods above would not work when I tried to re-format the dates to reflect "dd/mm/yyyy" format for readability. I had to ensure that all data fetched, entered/updated, and imported onto Airtable reflects the same format for this to work.


> Dev Log #1 (Jan 2024): As I have completed my course, I aim to improve the application to be user-friendly and I derailed from the project requirements stated above. For example, instead of routing to another page when editing an ingredient record (a standalone page), it appears as a pop-up in the main page.

## 💭 Improvements

- Filter and sort feature to categorise the listed ingredients e.g. filter by type, sort by ingredients which are expiring soon. Due to the lack of time during the course, I did not manage to implement this, and this feature would definitely add more value to my application.
- Optimise the application for mobile viewing - I would imagine most people to use it on their mobile as they track ingredients near their fridge, as compared to using desktop to do so.
- Replacing Airtable with a SQL database. I pick SQL as it is suitable for structured data that doesn't change much overtime in terms of scalability, and is most suitable for a small project like this. As a start, I pick PostgreSQL to learn more about SQL. With the implementation of database, I plan to use Express and Node.js as part of my backend infrastructure.
- Sign up and login feature

## 📸 Demo Images

### Main Page
(The <em>portal</em> is through the fridge)<br /><br />
![image](https://github.com/evangelenesiyin/mealplanner/assets/108106809/0b5c7924-f9fc-47f9-9295-da368587c9c7)

### Ingredients Tracker

![image](https://github.com/evangelenesiyin/mealplanner/assets/108106809/6db6fc7f-09f8-4a19-a514-a79cb0cb3adf)

### Recipe Randomizer
![image](https://github.com/evangelenesiyin/mealplanner/assets/108106809/5b591b7b-deeb-4b89-8334-0b90fe59c65b)
