const chance = new require('chance')();
const { Expert } = require('../models');
/**
 * Generate dummy experts
 *
 * @param {number} [count=20]
 */
async function initialExpertGenerator(count = 20) {
    const expertCount = await Expert.count().exec();
    if (expertCount < 20) {
        for (let index = 0; index < 20; index++) {
            let expert = new Expert({
                name: chance.name(),
            });
            await expert.save();
        }
    }
}
module.exports = initialExpertGenerator;
