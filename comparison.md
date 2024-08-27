function fetchUserData() {
  axios.get('https://api.example.com/users')
    .then(response => {
      console.log(response.data); // Handle the data
    })
    .catch(error => {
      console.error(error); // Handle any errors
    });
}

async function fetchData() {
  try {
    const userResponse = await axios.get('https://api.example.com/users');
    const userId = userResponse.data.id;
    const postsResponse = await axios.get(`https://api.example.com/users/${userId}/posts`);
    console.log(postsResponse.data);
  } catch (error) {
    console.error(error);
  }
}
