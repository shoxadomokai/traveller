import { urlValidate } from "../src/client/js/formHandler";
import { calc } from "../src/client/js/DOMManipulation";

test("it should check if a user's input is a URL", () => {
  const input = "https://www.url1.dev";
  const output = true;
  expect(urlValidate(input)).toBe(output);
});

test("it should let me know the degree of confidence of the sentiment analysis", () => {
  const inputs = [1 / 3, 2 / 3, 1];
  const outputs = ["low", "neutral", "high"];
  for (let index in inputs) {
    expect(calc(inputs[index])).toBe(outputs[index]);
  }
});
