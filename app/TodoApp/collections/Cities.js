
const Cities = new Rethink.Table('cities');

if (Cities.count().run() === 0) {

    Cities.insert([{
        name: 'Wenzhou',
        population: 3039439,
        country: 'China'
    }, {
        name: 'Addis Ababa',
        population: 3103673,
        country: 'Ethiopia'
    }, {
        name: 'Ürümqi',
        population: 3112559,
        country: 'China'
    }, {
        name: 'Shanghai',
        population: 24150000,
        country: 'China'
    }, {
        name: 'Karachi',
        population: 20000000,
        country: 'Pakistan'
    }]).run();
}

export default Cities;
