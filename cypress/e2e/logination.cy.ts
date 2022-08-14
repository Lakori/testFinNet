describe('requests to logination endpoint', () => {

  it('All keys with valid values', () => {
    const login = "bob";
    const password = "P@55w0rd";
    const statusCode = 200;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
        password: password
      }
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  it('Empty values', () => {
    const login = "";
    const password = "";
    const statusCode = 401;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
        password: password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  // BUG ID 2 
  // more information in bugReports.txt
  // in check list https://docs.google.com/spreadsheets/d/1D5EA-VY79cq_5BcVgJR4VcoDfdhV8WJsTrVN_C-I4M8/edit#gid=0
  // Test failed
  it('Valid username and invalid password', () => {
    const login = "bob";
    const password = "P@55w0r";
    const statusCode = 401;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
        password: password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  // BUG ID 3 
  // more information in bugReports.txt
  // in check list https://docs.google.com/spreadsheets/d/1D5EA-VY79cq_5BcVgJR4VcoDfdhV8WJsTrVN_C-I4M8/edit#gid=0
  // Test failed
  it('Valid username and empty password', () => {
    const login = "bob";
    const password = "";
    const statusCode = 401;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
        password: password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  it('Invalid username and valid password', () => {
    const login = "bob1";
    const password = "P@55w0rd";
    const statusCode = 401;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
        password: password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  it('Empty username and valid password', () => {
    const login = "";
    const password = "P@55w0rd";
    const statusCode = 401;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
        password: password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  it('Without username key', () => {
    const password = "P@55w0rd";
    const statusCode = 401;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        password: password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  // BUG ID 4 
  // more information in bugReports.txt 
  // check list https://docs.google.com/spreadsheets/d/1D5EA-VY79cq_5BcVgJR4VcoDfdhV8WJsTrVN_C-I4M8/edit#gid=0
  // Test failed
  it('Without password key', () => {
    const login = "bob";
    const statusCode = 401;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  it('Without keys', () => {
    const statusCode = 401;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  //Test Failed
  // check list https://docs.google.com/spreadsheets/d/1D5EA-VY79cq_5BcVgJR4VcoDfdhV8WJsTrVN_C-I4M8/edit#gid=0
  // NO Bug report because cross site scripting didn't work
  // BUG ID 2 for invalid password
  // more information in bugReports.txt 
  it('Cross site scripting', () => {
    const login = "bob";
    const password = "<script>alert(hi)</script>";
    const statusCode = 401;
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
        password: password
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).equal(statusCode)
    })
  })

  // BUG ID 5 
  // more information in bugReports.txt 
  // check list https://docs.google.com/spreadsheets/d/1D5EA-VY79cq_5BcVgJR4VcoDfdhV8WJsTrVN_C-I4M8/edit#gid=0
  // Test failed
  it('Token change', () => {
    const login = "bob";
    const password = "P@55w0rd";
    let token = '';
    cy.request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
        password: password
      },
    }).then(response => {
      token = response.body.result;
    }).request({
      method: 'POST',
      url: '/loginaction',
      headers: {
        username: login,
        password: password
      },
    }).then(response => {
      expect(response.body.result).not.equal(token);
    })
  })


})