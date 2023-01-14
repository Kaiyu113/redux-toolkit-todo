const todos = require("./data/todos");

module.exports = {
  path: "/getTodo/:id",
  method: "GET",
  template: function (pathParameters) {
    return todos.find((todo) => todo.id === pathParameters.id);
  },
};
