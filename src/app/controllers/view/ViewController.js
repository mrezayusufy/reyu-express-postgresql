class ViewController {
  async index(req, res) {
    return res.render('index', {
      title: 'Hey',
      message: 'Hello there!',
      name: 'reza',
    });
  }
}

export default new ViewController();
