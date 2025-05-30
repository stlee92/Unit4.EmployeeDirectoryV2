import express from "express";
const router = express.Router();
import employees, { addEmployee } from "#db/employees";
export default router;

router.route("/").get((req, res) => {
  res.send("Hello employees!");
});

router.route("/employees").get((req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.route("/employees/:id").get((req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  res.send(employee);
});

router.route("/employees").post((req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ err: "Please provide a name." });
  } else {
    res.status(201).json(addEmployee(name));
  }
});
