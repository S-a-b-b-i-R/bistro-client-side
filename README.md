# bistroBoss Client Side

## Description

This project is in accordance to a coruse project. The project is a web application that allows users to order food from a restaurant. The application is built using ReactJS.

## Technologies Used

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-%23000000.svg?style=for-the-badge&logo=axios&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) ![Stripe](https://img.shields.io/badge/Stripe-%233D3631.svg?style=for-the-badge&logo=Stripe&logoColor=white)

## Features

-   [x] **Authentication**
        User can sign up and login to the app using their email and password. User can also sign in using their Google account as well as GitHub account.
-   [x] **Create, Read, Update, Delete (CRUD) operations**
        Admin can create, read, update and delete menu. User can view the menu items and order from them
-   [x] **Filter By Category**
        Category based filter using tabs is implemented.
-   [x] **Real time data render using TanStack Query**
        I have used React Query to fetch data from the back-end and render it in the front-end. React Query also caches the data and updates it in real time.
-   [x] **JWT Tokens**
        I have used JWT tokens to authenticate users. When a user signs up or logs in, a JWT token is generated and stored in the cookies. When the user logs out, the token is removed. This token is used to authenticate users and protect routes where token is validated before returning data.
-   [x] **Firebase**
        The app is using Firebase for authentication. Firebase is a Backend-as-a-Service (BaaS) app development platform that provides hosted backend services such as a realtime database, cloud storage, authentication, crash reporting, machine learning, remote configuration, and hosting for your static files. I have used Firebase to create a user authentication system for the app.
-   [x] **Payment Gateway**
        I have used Stripe to implement payment gateway. Stripe is a payment gateway that allows users to pay using their credit/debit cards.
-   [x] **Notifications**
        I have used sweetalert to show notifications to the user. The notifications are shown when the user adds an item to the cart, removes an item from the cart, places an order, and when the user logs in or logs out.
-   [x] **Route Protections**
        I have used react-router-dom to protect routes. Some routes are protected and can only be accessed by authenticated users. If a user tries to access a protected route without logging in, they are redirected to the login page. Some routes are also protected for admin users. If a user tries to access a protected route without being an admin, they are logged out and redirected to the login page.
-   [x] **Pagination**
        Pagintaion is implemented in some admin routes
-   [x] **Responsive Design**
        The app is responsive and works on mobile, tab and desktop screen sizes. I have used TailwindCSS and DaisyUI to make the app responsive.
