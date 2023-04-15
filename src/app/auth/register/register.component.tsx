import type { FC } from "react";

import { AppBar, Banner, Button, SEO, Scaffold, TextField } from "@/components";

import { useRegister } from "./register.hook";

import "./register.component.scss";

const Register: FC = () => {
  const {
    formState,
    handleRegisterFormSubmit,
    handleSubmit,
    isLoading,
    registerField,
    values,
  } = useRegister();

  return (
    <>
      <SEO title="Daftar - We The Thread" />

      <Scaffold
        appBar={
          <AppBar>
            <AppBar.BackButton to="/" />
          </AppBar>
        }
      >
        <form
          className="Register"
          onSubmit={handleSubmit(handleRegisterFormSubmit)}
        >
          <div className="Register-body">
            <Banner subtitle="Silakan masukkan" title="Daftar" />

            <TextField
              id="TxtName"
              autoCapitalize="off"
              autoComplete="name"
              className="mx-bs my-md"
              placeholder="Nama"
              value={values.name}
              {...registerField("name", { required: true })}
            />

            <TextField
              id="TxtEmail"
              autoCapitalize="off"
              autoComplete="email"
              className="mx-bs mb-md"
              placeholder="Email"
              type="email"
              value={values.email}
              {...registerField("email", {
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
              {...registerField("password", { minLength: 8, required: true })}
            />
          </div>

          <Button
            id="BtnSubmit"
            color="primary"
            disabled={isLoading || !formState.isValid}
            fullWidth
            type="submit"
          >
            {isLoading ? "Sedang memuat..." : "Daftar"}
          </Button>
        </form>
      </Scaffold>
    </>
  );
};

export default Register;
