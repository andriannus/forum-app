import { FC } from "react";

import { AppBar, Button, Scaffold, TextArea, TextField } from "@/components";

import { useCreateThread } from "./create-thread.hook";

import "./create-thread.component.scss";

const CreateThread: FC = () => {
  const {
    formState,
    handleCreateThreadFormSubmit,
    handleSubmit,
    isLoading,
    register,
    values,
  } = useCreateThread();

  return (
    <Scaffold
      appBar={
        <AppBar>
          <AppBar.BackButton to="/" />
          <AppBar.Title>Membuat Diskusi</AppBar.Title>
        </AppBar>
      }
    >
      <form
        className="CreateThread"
        onSubmit={handleSubmit(handleCreateThreadFormSubmit)}
      >
        <div className="CreateThread-body">
          <TextField
            id="TxtTitle"
            className="my-md"
            placeholder="Judul"
            value={values.title}
            {...register("title", { required: true })}
          />

          <TextField
            id="TxtCategory"
            className="mb-md"
            placeholder="Kategori"
            value={values.category}
            {...register("category")}
          />

          <TextArea
            id="TxtBody"
            className="mb-bs"
            placeholder="Mau diskusi tentang apa?"
            value={values.body}
            {...register("body", { required: true })}
          />
        </div>

        <Button
          id="BtnSubmit"
          color="primary"
          disabled={isLoading || !formState.isValid}
          fullWidth
          type="submit"
        >
          {isLoading ? "Sedang memuat..." : "Simpan"}
        </Button>
      </form>
    </Scaffold>
  );
};

export default CreateThread;
