const lodash = require('lodash');
const chance = new require('chance')();
const { Expert, Project } = require('../models');

/**
 * Generate dummy experts
 *
 * @param {number} [count=20]
 */
async function initialProjectGenerator(ownerId) {
    const projectsCount = await Project.count({ ownerId }).exec();

    if (projectsCount === 0) {
        const experts = await Expert.find().exec();
        let index = 0;
        // Initialize new Projects
        for (index; index < 3; index++) {
            let project = new Project({
                title: chance.name(),
                status: 'new',
                ownerId,
            });
            await project.save();
        }
        for (index; index < 6; index++) {
            let related = pick(experts, chance.integer({ min: 0, max: 9 })).map(
                i => i.id
            );
            let approved = pick(related, chance.integer({ min: 0, max: 3 }));
            let rejected = pick(
                lodash.difference(related, approved),
                chance.integer({ min: 0, max: 2 })
            );
            let project = new Project({
                title: chance.name(),
                status: 'unfinished',
                experts: {
                    related,
                    approved,
                    rejected,
                },
                ownerId,
            });

            await project.save();
        }

        for (index; index < 9; index++) {
            let related = pick(experts, chance.integer({ min: 0, max: 9 })).map(
                i => i.id
            );
            let approved = pick(related, chance.integer({ min: 0, max: 3 }));
            let rejected = pick(
                lodash.difference(related, approved),
                chance.integer({ min: 0, max: 2 })
            );
            let project = new Project({
                title: chance.name(),
                status: 'unfinished',
                startDate: +new Date() - 86400 * 4 * 1000,
                experts: {
                    related,
                    approved,
                    rejected,
                },
                ownerId,
            });
            await project.save();
        }
    }
}
/**
 * pick helper
 *
 * @param {Array} arr
 * @param {Number} int
 * @returns {Array} Picked Array
 */
function pick(arr, int) {
    if (!arr.length) return arr;
    return chance.pickset(arr, int);
}
module.exports = initialProjectGenerator;
