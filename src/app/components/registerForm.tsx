export default function RegisterForm() {
  return (
    <div>
      <form action="post">
        <label htmlFor="title">Account Register Form</label>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" />
        <label htmlFor="address">Address</label>
        <input type="text" name="address" />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" name="phoneNumber" />
      </form>
    </div>
  );
}
