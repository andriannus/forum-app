import { FC } from "react";

import { AppBar, Banner, Button, Scaffold, TextField } from "@/components";

import { useLogin } from "./login.hook";

import "./login.component.scss";

const Login: FC = () => {
  const { formState, handleLoginFormSubmit, handleSubmit, register, values } =
    useLogin();

  return (
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
          disabled={!formState.isValid}
          fullWidth
          type="submit"
        >
          Masuk
        </Button>
      </form>
    </Scaffold>
  );
};

export default Login;
