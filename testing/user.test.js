const Users = require('../models/users');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/College';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Schema', () => {
    it('Should be able create a User', () => {
        let user = {
            'firstname': 'user',
            'lastname': 'user',
            'email':'user@gm.com'
        };

        return Users.create(user)
            .then((user_1) => {
                expect(user_1.firstname).toEqual('user');
            });
    });

})