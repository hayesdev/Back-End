const bcrypt = require("bcryptjs");
const db = require("../database/config");

function find() {
  return db("operators");
}

function findBy(id) {
  return db("operators").where({ id }).first();
}

async function add(operator) {
  // hash password with time complexity of 10
  operator.password = await bcrypt.hash(operator.password, 2);
  const [id] = await db("operators").insert(operator);
  return findBy(id);
}

// function add(operator) {
//   return db("foodtrucks")
//     .insert(operator, "id")
//     .then(([id]) => findBy(id));
// }

function remove(id) {
  return db("operators").where({ id }).delete();
}

module.exports = {
  find,
  findBy,
  add,
  remove,
};
