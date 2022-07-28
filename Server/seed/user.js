const { faker } = require('@faker-js/faker');

async function createUsers (num) {
    for(var i = 0; i <= num; i++){
        let user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        await fetch('http://localhost:8080/createUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
            })

    }
}

createUsers(100);