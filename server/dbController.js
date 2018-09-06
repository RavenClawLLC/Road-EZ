const Sequelize = require('sequelize');

// create database
const sequelize = new Sequelize('dogwalker', 'dogwalker', 'dogwalker', {
    host: 'localhost',
    dialect: 'postgres'
});

// TEST DB CONNECTION
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

let User = sequelize.define('user', {
    name: { type: Sequelize.STRING, unique: true },
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
});

let Dog = sequelize.define('dog', {
    name: { type: Sequelize.STRING, unique: true},
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: Sequelize.STRING, allowNull: false },
    walkTime: { type: Sequelize.INTEGER, allowNull: true },
    earliest_walk_time: {type: Sequelize.STRING, allowNull: false},
    latest_walk_time: {type: Sequelize.STRING, allowNull: true}
});

// 1:M
Dog.belongsToMany(User, {
    through: 'dog_walker'
});
User.belongsToMany(Dog, {
    through: 'dog_walker'
});
// Room.create({name: 'Main'});

sequelize.sync({force: true});

const databaseController = {
    createUser: (req, res) => {
        User.create({name: req.body.name}).then(res.send(200));;
    },

    createDog: (req, res, next) => {
        Dog.create({
            name: req.body.dogName,
            address: req.body.address,
            earliest_walk_time: req.body.walkTime
        }).then(() => {
            next();
        });
    },

    getYourDogs: (req, res) => {
        console.log('getting dogs');
        Dog.findAll(
            // include: [{
            //     model: User,
            //     through: {
            //         attributes: ['id']
            //     },
            //     where: {
            //         name: req.cookies.name
            //     }
            // }]
        ).then((dogs) => {
            dogs.sort((dogA,dogB) => {
                const a = dogA.earliest_walk_time;
                const b = dogB.earliest_walk_time;
                const testA = a.substring(0, a.indexOf('-'));
                const testB = b.substring(0, b.indexOf('-'));
                let aVal = Number(testA.substring(0, testA.length-2));
                let bVal = Number(testB.substring(0, testB.length-2));
                if (testA.substring(testA.length-2) === 'PM') {
                    aVal += 12;
                }
                if (testB.substring(testB.length-2) === 'PM') {
                    bVal += 12;
                }
                if (bVal < aVal) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            res.send(dogs);
        });
    }
};

module.exports = databaseController;
