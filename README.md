# Io FinNet code example

## About

This repo contains code for a QA challenge for company io FinNet from Broit Anastasiia

### Bug Reports and Check List

1. Bug Reports located in bugReports.txt file in the root of the project
2. Check List located on this link https://docs.google.com/spreadsheets/d/1D5EA-VY79cq_5BcVgJR4VcoDfdhV8WJsTrVN_C-I4M8/edit#gid=0

    

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
  
 Please pay Attention! A lot of tests fail because of founded bugs that need to be fixed. That is how it should be. Details about every bug is in bugReports.txt


  
  


  