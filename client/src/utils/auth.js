export const login = async ({ email, password }) => {
    try {
        const response = await fetch(graphqlEndpoint, { // Ensure this URL is correct
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              query: `
                  mutation LoginUser($email: String!, $password: String!) {
                      loginUser(email: $email, password: $password) {
                          success
                          message
                          user {
                              id
                              email
                          }
                          token
                      }
                  }
              `,
              variables: {
                  email,
                  password,
              },
          }),
      });
      const { data } = await response.json();
      if (!data.loginUser.success) {
          throw new Error(data.loginUser.message);
      }
      return data.loginUser;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  