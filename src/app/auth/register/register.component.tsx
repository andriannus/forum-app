import { FC } from "react";

import { AppBar, Banner, Button, Scaffold, TextField } from "@/components";

import { useRegister } from "./register.hook";

import "./register.component.scss";

const Register: FC = () => {
  const {
    formState,
    handleRegisterFormSubmit,
    handleSubmit,
    register,
    values,
  } = useRegister();

  return (
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
            {...register("name", { required: true })}
          />

          <TextField
            id="TxtEmail"
            autoCapitalize="off"
            autoComplete="email"
            className="mx-bs mb-md"
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
            {...register("password", { minLength: 8, required: true })}
          />
        </div>

        <Button
          id="BtnSubmit"
          color="primary"
          disabled={!formState.isValid}
          fullWidth
          type="submit"
        >
          Daftar
        </Button>
      </form>
    </Scaffold>
  );
};

export default Register;
