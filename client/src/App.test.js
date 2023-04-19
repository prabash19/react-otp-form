const { render } = require("@testing-library/react");
const App = require("./App").default;

test("renders all OTP input fields", () => {
  const { getAllByRole } = render(<App />);
  const otpFields = getAllByRole("textbox", { name: /otp/i });
  expect(otpFields.length).toBe(6);
});
