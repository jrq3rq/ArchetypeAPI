const app = require("./app");

const PORT = process.env.PORT || 3000; // You may want to change this to 5500 if that's your intended port

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  //   console.log(`Swagger UI available at http://localhost:${PORT}/swagger-ui`);
});
