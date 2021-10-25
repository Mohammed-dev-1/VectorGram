const profile = JSON.parse(localStorage.getItem('profile'));

class Header {
  profile() {
    return profile ? profile : null;
  }
}

export default new Header();