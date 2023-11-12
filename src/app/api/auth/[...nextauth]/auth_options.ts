import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios/auth/axios";
import { AxiosError, AxiosResponse } from "axios";
import jwt from "jsonwebtoken";

const APP_SECRET = process.env.NEXTAUTH_SECRET ?? "";

interface TokensType {
  access: string;
  refresh: string;
}

const authOptions = {
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  jwt: {
    maxAge: 60 * 60 * 4,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      // console.log("=========== signIn: ", {
      //   user,
      //   account,
      //   profile,
      //   email,
      //   credentials,
      // });

      if (user) {
        const {
          user: userData,
          tokens: { access, refresh },
        } = user;
        if (userData.id && access && refresh) {
          return true;
        }
      }

      return false;
    },
    async redirect({ url, baseUrl }: any) {
      // console.log("=========== redirect: ", { url, baseUrl });
      return baseUrl;
    },
    async session({ session, user, token }: any) {
      console.log("=========== session: ", { session, user, token });

      let tokens: TokensType | null = null;
      try {
        tokens = JSON.parse(atob(token.token));
      } catch (error) {
        tokens = null;
      }

      console.log({ tokens });

      if (tokens !== null) {
        session.tokens = tokens;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      console.log("=========== JWT: ", {
        token,
        user,
        account,
        profile,
        isNewUser,
      });

      if (user && user.user && token) {
        const { user: userData, tokens } = user;

        const tokensJson = JSON.stringify(tokens);

        token.id = userData.id;
        token.username = userData.email;
        token.email = userData.email;
        token.roles = userData.roles;
        token.token = btoa(tokensJson);
      }

      if (token) {
        const tokens = JSON.parse(atob(token.token));
        const accessToken = jwt.verify(tokens.access, APP_SECRET);

        console.log("Access Token: ============", { accessToken });

        if (typeof accessToken !== "string") {
          const { exp } = accessToken;
          const currentTimestamp = Math.round(new Date().getTime() / 1000);
          console.log({ exp, currentTimestamp });
          if (!exp) {
            return null;
          }
          if (exp <= currentTimestamp) {
            console.log("Returning null");
            return null;
          }
        }
      }

      return token;
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credential, req) {
        // console.log({ credential, req });
        // Add logic here to look up the user from the credentials supplied

        console.log("Credential: ", credential);

        const userAndTokens = await axios
          .post("/login", {
            username: credential?.username,
            password: credential?.password,
          })
          .then(function (response: AxiosResponse) {
            const { status, data } = response;

            console.log({ status, data });

            if (status == 200) {
              return data;
            }

            return null;
          })
          .catch(function (error: AxiosError) {
            console.error(error.message);
            return null;
          });

        console.log({ userAndTokens });

        if (userAndTokens !== null && userAndTokens.user !== undefined) {
          // Any object returned will be saved in `user` property of the JWT
          return userAndTokens;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
};

export default authOptions;
