import axios from 'axios';

class Fetch {
  constructor(options) {
    // const jwt = Cookies.get('jwt');
    const headers = {
      // Authorization: 'Bearer ' + jwt,
      'Cache-Control': 'no-cache',
    };
    this.instance = axios.create({
      ...options,
      headers,
      // withCredentials: true,
      crossDomain: true,
    });
  }

  async get(...params) {
    return await this.instance.get(...params);
  }

  async post(...params) {
    return await this.instance.post(...params);
  }

  async put(...params) {
    return await this.instance.put(...params);
  }

  async delete(...params) {
    return await this.instance.delete(...params);
  }
}

export default Fetch;
