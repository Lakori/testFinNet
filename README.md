# Io FinNet code example

## About

  

This repo contains a example code to facilitate in the interview process.

The code should be deployable locally.

We expect the candidate to follow the instructions carefully, write some good automated tests to cover the expected functionality and to highlight any issues found along the way. This is a white-box testing exercise and you have full access to the code for reference.

  

### Built With

  

-  [typescript](https://www.npmjs.com/package/typescript) - Typed language for application-scale

JavaScript.

-  [serverless](https://www.npmjs.com/package/serverless) - SDK for building, deploying and managing

serverless cloud services.

-  [cucumber.js](https://www.npmjs.com/package/@cucumber/cucumber) - Tool for running automated tests

written in plain language.

  

## Getting Started

  

### Prerequisites

  

1. Install Serverless

  

```sh

npm -g install serverless@2.72.2

```

  

2. Install Node Modules

  

```sh

npm i

```

  

2. Deploy locally

  

```sh

serverless offline

```

### Bug Reports and Check List

1. Bug Reports located in bugReports.txt file in the root of the project
2. Check List located on this link https://docs.google.com/spreadsheets/d/1D5EA-VY79cq_5BcVgJR4VcoDfdhV8WJsTrVN_C-I4M8/edit#gid=0


### Running offline itnegration tests

1. Run local integration tests

```bash

npx cypress open
```

2. Open tests

1. In opened window click on E2E Testing
2. Click Start E2E Testing in 'chosen browser'
3. In opened window click on logination.cy.ts to check tests for logination
   or click on sumaction.cy.ts to check tests for sumaction.
4. Tests will automatically start
  

## Instructions for the candidate

  

We would like the candidate to complete the following exercise.

 

1. Clone the repo and deploy the lambda locally (Instructions above)

2. Then it would be wise to test this lambda is working correctly using a http client tool such as **POSTMAN** (Requirements below).

3. We would then like the candidate to write some working automation tests to test the lambda functionality.

-- At this point, we invite the candidate to use any libraries/technologies they wish to test the lambda function as per the requirements

-- We have a basic one step passing scenario running in `spec/cucumber/example.steps.ts` to help you get started.


4. We have defined the lambda functionality in the Requirements section but it must be noted that some functionality may deviate from the requirements. If this is the case then please let us know what you find!
5. Finally, please send your solution back to Io FinNet in the form of a branch/Packaged solution so that we can access your solution and run your tests.

  
  

## Requirements (How should the lamda work)

  

1. The lambda function once deployed should have two functioning endpoints (the output of ***serverless offline*** will specify the url)

- http://localhost:3000/loginaction

- http://localhost:3000/sumaction

  

The '`loginaction`' endpoint requires the user to authenticate with a username and password. Construct a **POST** request with the following two **headers**.

    username: bob

    password: P@55w0rd

On successful authentication, you will receive a **200** http response and you will also be returned a token which can be used later.

On unsuccessful authentication, you will receive a **401** http response.

  

The '`sumaction`' endpoint will simply SUM the value of two numerical inputs in the form of a JSON Object in the body. The two JSON attributes are

    first: <first_numerical_value>

    second: <second_numerival_value>

  

To use this endpoint, you must add the value of the token into the request header that was returned from the '`loginaction`' endpoint. The **header** value should look like this

    token: <token_value_that_is_returned>

  

Upon successful authentication and execution of the '`sumaction`' endpoint, you will be returned with a **200** http response and the summed value of the two provided numbers. Example 2+2. Result will = 4.

  

Non-numerical values will return null after being summed.