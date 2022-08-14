describe('requests to sumaction endpoint', () => {

    let token = '';

    beforeEach(() => {
        const login = "bob";
        const password = "P@55w0rd";
        cy.request({
            method: 'POST',
            url: '/loginaction',
            headers: {
                username: login,
                password: password
            }
        }).then(response => {
            token = response.body.result;
        })
    })

    it('All values with numbers', () => {
        const first = 1;
        const second = 2;
        const checkValue = 3;
        const statusCode = 200;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second: 2
            }
        }).then(response => {
            expect(response.status).equal(statusCode)
            expect(response.body.result).equal(checkValue)
        })
    })

    // BUG ID 6
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    it('Empty valeus', () => {
        const first = "";
        const second = "";
        const checkValue = null;
        const statusCode = 200;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            }
        }).then(response => {
            expect(response.status).equal(statusCode)
            expect(response.body.result).equal(checkValue)
        })
    })

    // BUG ID 7
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    it('Without token', () => {
        const first = 400;
        const second = 1;
        const checkValue = 401
        const statusCode = 401;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
            },
            body: {
                first,
                second,
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).equal(statusCode)
            expect(response.body.result).not.equal(checkValue)
        })
    })

    // BUG ID 8
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    it('With wrong token', () => {
        const first = 400;
        const second = 1;
        const checkValue = 401
        const statusCode = 401;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token: 'hi'
            },
            body: {
                first,
                second,
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).equal(statusCode)
            expect(response.body.result).not.equal(checkValue)
        })
    })

    it('First value a number and second not a number', () => {
        const first = 1;
        const second = "fd";
        const checkValue = null
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })

    it('First value not a number and second value a number', () => {
        const first = "fd";
        const second = 1;
        const checkValue = null
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            },
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })

    it('Without first key', () => {
        const second = 1;
        const checkValue = null
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                second,
            },
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })

    it('Without second key', () => {
        const first = 1;
        const checkValue = null
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first
            },
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })

    it('Empty body', () => {
        const statusCode = 500;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).equal(statusCode)
        })
    })

    // BUG ID 9
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    it('Empty JSON object in the body', () => {
        const statusCode = 500;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {},
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).equal(statusCode)
        })
    })

    // BUG ID 10
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    it('Loss of precision ', () => {
        const first = 0.1;
        const second = 0.2;
        const checkValue = 0.3
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            },
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })

    // BUG ID 11
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    // BUG even in cypress!! 9999999999999999 + 0 not equal 10000000000000000
    it('Big numbers', () => {
        const first = 9999999999999999;
        const second = 0;
        const checkValue = 10000000000000000;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            },
        }).then(response => {
            expect(response.body.result).not.equal(checkValue)
        })
    })

    // BUG ID 12
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    it('Letters in values', () => {
        const first = "0xff";
        const second = 5;
        const checkValue = null;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            },
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })

    // BUG ID 13
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    it('Unlimited 0', () => {
        const first = "000000.1";
        const second = 5;
        const checkValue = null;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            },
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })

    // BUG ID 14
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    it('Dot before number', () => {
        const first = ".1";
        const second = 5;
        const checkValue = null;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            },
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })

    it('Cross site scripting', () => {
        const first = "1";
        const second = "<script>alert(1)</script>";
        const checkValue = null;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            },
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })

    // BUG ID 15
    // more information in bugReports.txt 
    // check list https://docs.google.com/spreadsheets/d/1pthPOhPSFgzqznwRNsa7tI8DewDig0TRMfikbu59FyM/edit#gid=0
    // Test failed
    it('Spaces in values', () => {
        const first = " ";
        const second = 5;
        const checkValue = null;
        cy.request({
            method: 'POST',
            url: '/sumaction',
            headers: {
                token,
            },
            body: {
                first,
                second,
            },
        }).then(response => {
            expect(response.body.result).equal(checkValue)
        })
    })
})