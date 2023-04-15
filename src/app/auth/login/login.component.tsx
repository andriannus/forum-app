import type { FC } from "react";

import { AppBar, Banner, Button, Scaffold, SEO, TextField } from "@/components";

import { useLogin } from "./login.hook";

import "./login.component.scss";

const Login: FC = () => {
  const {
    formState,
    handleLoginFormSubmit,
    handleSubmit,
    isLoading,
    register,
    values,
  } = useLogin();

  return (
    <>
      <SEO title="Masuk - We The Thread" />

      <Scaffold
        appBar={
          <AppBar>
            <AppBar.BackButton to="/" />
          </AppBar>
        }
      >
        <form className="Login" onSubmit={handleSubmit(handleLoginFormSubmit)}>
          <div className="Login-body">
            <Banner subtitle="Silahkan masukkan" title="Masuk" />

            <TextField
              id="TxtEmail"
              autoCapitalize="off"
              autoComplete="email"
              className="mx-bs my-md"
              placeholder="Email"
              type="email"
              value={values.email}
              {...register("email", {
                pattern: /\S+@\S+\.\S+/,
                required: true,
              })}
            />

            <TextField
              id="TxtPassword"
              autoComplete="current-password"
              className="mx-bs"
              placeholder="Password"
              type="password"
              value={values.password}
              {...register("password", { required: true })}
            />
          </div>

          <Button
            id="BtnSubmit"
            color="primary"
            disabled={isLoading || !formState.isValid}
            fullWidth
            type="submit"
          >
            {isLoading ? "Sedang memuat..." : "Masuk"}
          </Button>
        </form>
      </Scaffold>
    </>
  );
};

export default Login;
