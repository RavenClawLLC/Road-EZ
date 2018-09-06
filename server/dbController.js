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
    walk_time: { type: Sequelize.INTEGER, allowNull: false },
    earliest_walk_time: {type: Sequelize.TIME, allowNull: true},
    latest_walk_time: {type: Sequelize.TIME, allowNull: true}
});

// 1:M
Dog.belongsToMany(User, {
    through: 'dog_walker'
});
User.belongsToMany(Dog, {
    through: 'dog_walker'
});
// Room.create({name: 'Main'});

sequelize.sync();

const databaseController = {
    createUser: (req, res) => {
        User.create({name: req.body.name}).then(res.send(200));;
    },

    createDog: (req, res) => {
        Dog.create({
            name: req.body.name,
            address: req.body.address,
            walk_time: req.body.walk_time,
            earliest_walk_time: req.body.earliest_walk_time,
            latest_walk_time: req.body.latest_walk_time
        }).then(res.send(200));
    },

    getYourDogs: (req, res) => {
        Dog.findAll({
            include: [{
                model: User,
                through: {
                    attributes: ['id']
                },
                where: {
                    name: req.cookies.name
                }
            }]
        }).then((dogs) => {
            dogs.sort((a,b) => {
                if (b.earliest_walk_time < a.earliest_walk_time) {
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
