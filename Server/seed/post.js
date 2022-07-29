const { faker } = require('@faker-js/faker');

async function createPosts (num) {
    let users = await fetch('http://localhost:8080/getAllUsers').then(res => res.json());
    // console.log(users[2]);

    for(var i = 0; i <= num; i++){
        let post = {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(50),
            user: users[Math.floor(Math.random()*users.length)]._id
        }
        // console.log(post);
        await fetch('http://localhost:8080/createPostWithoutToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
            })

    }
}

createPosts(500);