# Testing TypeScript React (.tsx) Files with Jest

This guide will walk you through how to write tests for a TypeScript React
(`.tsx`) file using Jest. We'll focus on testing components by selecting elements
using their `id` attributes, which is a common and reliable way to target specific
elements in your tests.

### Configure Jest for TypeScript

In your `package.json`, add the following Jest configuration:

```json
"jest": {
  "preset": "ts-jest",
  "testEnvironment": "jsdom"
}
```

Alternatively, you can create a `jest.config.js` file:

```js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
```

## Writing a Simple React Component

Let's start by creating a simple React component in TypeScript.

### `Button.tsx`

```tsx
import React from "react";
interface ButtonProps {
  label: string;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button id="submit-button" onClick={onClick}>
      {label}
    </button>
  );
};
export default Button;
```

In this example, we have a `Button` component that accepts a `label` and an `onClick` handler. The button has an `id` of `submit-button`, which we will use in our tests.

## Writing Jest Tests

Now, let's write some tests for the `Button` component using Jest and React Testing Library.

### `Button.test.tsx`

```tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for additional matchers like "toBeInTheDocument"
import Button from "./Button";
describe("Button Component", () => {
  test("renders the button with the correct label", () => {
    const { getByText } = render(<Button label="Submit" onClick={() => {}} />);

    // Check if the button with the label "Submit" is rendered
    expect(getByText("Submit")).toBeInTheDocument();
  });
  test("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label="Submit" onClick={handleClick} />,
    );

    // Simulate a click event
    fireEvent.click(getByText("Submit"));

    // Check if the onClick handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("finds the button by its id", () => {
    const { getByTestId } = render(
      <Button label="Submit" onClick={() => {}} />,
    );

    // Check if the button with the id "submit-button" is rendered
    const button = getByTestId("submit-button");
    expect(button).toBeInTheDocument();
  });
});
```

### Explanation of the Tests

1. **Rendering the Button with the Correct Label**:
   - We use `getByText` to find the button by its label text and check if it is rendered in the document.
2. **Click Event Handling**:
   - We use `jest.fn()` to create a mock function for the `onClick` handler.
   - We simulate a click event using `fireEvent.click` and check if the mock function was called.
3. **Finding the Button by ID**:
   - We use `getByTestId` to find the button by its `id` attribute. This is useful when you want to target specific elements in your tests.

### Using `data-testid` for Better Targeting

While using `id` attributes is a valid approach, it's often recommended to use `data-testid` attributes for testing purposes. This keeps your `id` attributes free for other uses and makes it clear that the attribute is intended for testing.

#### Updated `Button.tsx` with `data-testid`

```tsx
import React from "react";
interface ButtonProps {
  label: string;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button data-testid="submit-button" onClick={onClick}>
      {label}
    </button>
  );
};
export default Button;
```

#### Updated Test Using `data-testid`

```tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";
describe("Button Component", () => {
  test("renders the button with the correct label", () => {
    const { getByText } = render(<Button label="Submit" onClick={() => {}} />);
    expect(getByText("Submit")).toBeInTheDocument();
  });
  test("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label="Submit" onClick={handleClick} />,
    );
    fireEvent.click(getByText("Submit"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("finds the button by its data-testid", () => {
    const { getByTestId } = render(
      <Button label="Submit" onClick={() => {}} />,
    );
    const button = getByTestId("submit-button");
    expect(button).toBeInTheDocument();
  });
});
```

### Explanation of `data-testid`

- **`data-testid`**: This attribute is specifically designed for testing purposes. It allows you to target elements in your tests without affecting the actual functionality or styling of your component.

## Running the Tests

To run your tests, simply use the following command:

```bash
npm test
```

Jest will automatically find and run all test files that match the pattern `*.test.tsx`.

## Learn More

- **Jest Documentation**: [https://jestjs.io/docs/en/getting-started](https://jestjs.io/docs/en/getting-started)
- **React Testing Library Documentation**: [https://testing-library.com/docs/react-testing-library/intro](https://testing-library.com/docs/react-testing-library/intro)
- **TypeScript with Jest**: [https://kulshekhar.github.io/ts-jest/](https://kulshekhar.github.io/ts-jest/)
- **Jest Matchers**: [https://jestjs.io/docs/en/expect](https://jestjs.io/docs/en/expect)
- **React Testing Library Queries**: [https://testing-library.com/docs/queries/about](https://testing-library.com/docs/queries/about)
