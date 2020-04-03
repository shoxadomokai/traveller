import { getDates } from "../src/client/js/formHandler";
const fs = require("fs");

const path = require("path");

test("it should take a date range and convert it an array of all the dates in between in unix form", () => {
  const start = "2 Apr, 2020";
  const end = "5 Apr, 2020";
  const output = 4;
  expect(getDates(start, end)).toHaveLength(output);
});

test("fetch data from file should return an array even if data doesn't exist one should be created", () => {
  const getTripsFromFile = cb => {
    fs.readFile(__dirname, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

  getTripsFromFile(trips => {
    expect(Array.isArray(trips)).toBe(true);
  });
});
