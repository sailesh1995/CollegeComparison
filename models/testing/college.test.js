const Colleges = require('../models/college');
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

describe('College Schema', () => {
    it('Should be able create a College', () => {
        let college = {
            'college_name': 'CC',
            'location': 'Hero with shield',
            'total_student': '2222',
            'affiliation': 'Hero with shield',
            'courses': 'Hero with shield',
            'credit_hours': '333',
            'desc':'Niceeee',
            'Fees': '10000',
            'Scholarship_criteria': 'Hero with shield'



        };
        // const hero_1 = await Heroes.create(hero);
        return Colleges.create(college)
            .then((college_1) => {
                expect(college_1.college_name).toEqual('CC');
            });
    });

})