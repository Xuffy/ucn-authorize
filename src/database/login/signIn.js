export default {
  email: {
    _rules: {
      type: 'Email',
      required: true
    }
  },
  password: {
    _rules: {
      required: true,
      minLength: 6
    }
  }
}
