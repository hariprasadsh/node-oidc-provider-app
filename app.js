const { Provider } = require("oidc-provider");

const port = 3000;

// set the basic configuratrion
const configuration = {
  features: {
    introspection: { enabled: true },
    revocation: { enabled: true },
    sessionManagement: { enabled: true },
  },
  formats: {
    AccessToken: "jwt",
  },
  clients: [
    {
      client_id: "test_implicit_app",
      grant_types: ["implicit"],
      response_types: ["id_token"],
      redirect_uris: ["https://testapp/signin-oidc"],
      token_endpoint_auth_method: "none",
    },
  ],
  claims: {
    email: ["email", "email_verified"],
    phone: ["phone_number", "phone_number_verified"],
    profile: [
      "birthdate",
      "family_name",
      "gender",
      "given_name",
      "locale",
      "middle_name",
      "name",
      "nickname",
      "picture",
      "preferred_username",
      "profile",
      "updated_at",
      "website",
      "zoneinfo",
    ],
  },
  scopes: ["api1"],
  async findById(ctx, id) {
    return {
      accountId: id,
      async claims() {
        return { sub: id };
      },
    };
  },
};

const oidc = new Provider(`http://localhost:${port}`, configuration);

// express style callback for use in express applications
oidc.callback;

oidc.listen(port, () => {
  console.log(
    `OIDC provider is listening to port ${port}, check http://localhost:${port}/.well-known/openid-configuration`
  );
});
