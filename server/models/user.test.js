const assert = require('assert');
const mongoose = require('mongoose');
const User = require('./user');
const connectionString =
    process.env.TEST_DB_CONN || 'mongodb://127.0.0.1:27017/lynk-demo-test';

describe('Testing User Model', () => {
    before(async function() {
        // Cconnect Database
        await new Promise((resolve, reject) => {
            mongoose.connect(connectionString, err => {
                if (err) {
                    console.error('MongoDB connection Error');
                    console.error(err);
                    reject(err);
                }
                resolve();
            });
        });
        await User.deleteMany({}).exec();
    });

    const userData = {
        email: 'test@test.com',
        password: 'password',
    };
    let initUser = new User(userData);
    let persistedUser;

    it('Should able to create initial User without error', async () => {
        persistedUser = await initUser.save();
    });

    it('Should thow error when create user with duplicated email', async () => {
        try {
            await new User(userData).save();
            return Promise.reject('Did not throw');
        } catch (err) {
            return Promise.resolve();
        }
    });

    it('Should properly presist password, and able to check password', async () => {
        assert.notEqual(
            persistedUser.password,
            userData.password,
            'Persisted password should not equal initial password'
        );
        const correctPassword = await persistedUser.checkPassword(
            userData.password
        );
        const falsePassword = await persistedUser.checkPassword('incorrect');
        assert.ok(correctPassword);
        assert.ok(!falsePassword);
    });
});
