
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./public/cm-icon.svg" alt="Logo">
  </a>

  <h1 align="center" style="margin-top: 20px;">Climate Mind - Frontend</h1>

  <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>

  <p align="center">
    Thank you for your interest in contributing to ClimateMind. Within this document, you'll find instructions to set up your development environment and information that may be useful when you create a pull request.
    <br />     
  </p>

  <a href="https://github.com/ClimateMind/climatemind-frontend/issues">Report Bug</a>
  ·
  <a href="https://github.com/ClimateMind/climatemind-frontend/issues">Request Feature</a>

</div>

<br />

## Prerequisites
Before you consider participating to this project, make sure you are familiar with the following topics.
<ul>
   <li>HTML / CSS / TypeScript</li>
   <li>Node.js</li>
   <li>React</li>
   <li>cypress / jest </li>
</ul>

<br/>

## Setup a Development Environment
To properly work at the frontend application, you'll need to setup the backend environment first. Have a look at the documentation [here](https://contribute.climatemind.org/v/rest-api/contribute/installation) and return once you have that up and running.

Now to get started with setting up a frontend environment, make sure you have a recent version of Node.js installed, as well as Docker desktop.

Clone the repository. It is recommended to not use spaces in your folders name, as it may raise problems in realation to docker. Afterwards you can go into the project folder and install all the required npm packages.

```bash
git clone https://github.com/ClimateMind/climatemind-frontend

// cd climatemind-frontend
npm install
```

Now you can start the application, but make sure that the backend containers are running in docker desktop, otherwise the following command might fail. In your project older, execute the command below, based on the operating system you use.
```bash
npm run docker:dev:run:pc     (windows)
npm run docker:dev:run:mac    (mac)
npm run docker:dev:run:linux  (linux)
```

With both the backend and frontend running, you should be able to open the website (standard is http://localhost:3000) and start working on your first issue!

<br/>

## Open a Pull Request
Once you have a possible solution for an issue, you can create a pull request to get it merged into the develop branch. But before you do that, you should run the command `npm run prettier`, which will format your code based on some guidelines to ensure a similar style throughout the codebase.

Once the pull request is created, automated tests will run to ensure that the changes won't break any existing features. You can run these tests also in your local environment, if you want to use it for debugging or verification before pushing new changes. The commands you would consider in that case are `npm run cypress` and `npm run test`. The cypress tests take quite a long time (~ 10 min). If you know that a specific file resulted in errors and you want to test if those errors are resolved, you can run the specific file with the command `npm run cypress -- --spec <path-to-file>` (eg. path: 'cypress/integration/register.spec.ts'). 