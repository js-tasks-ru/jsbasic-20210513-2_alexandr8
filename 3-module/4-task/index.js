function showSalary(users, age) {
  // ваш код...
  let result = [];

  for (let user of users) {
    age >= user.age && result.push(`${user.name}, ${user.balance}`);
  }

  return result.join('\n');
}
