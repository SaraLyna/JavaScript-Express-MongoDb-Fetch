class RootController {
  constructor() {
    this.handleRootRequest = this.handleRootRequest.bind(this);
  }

  handleRootRequest(req, res) {
    res.status(200).send('Welcome to the root endpoint!');
  }
}

module.exports = new RootController();

