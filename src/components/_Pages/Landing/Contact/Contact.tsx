import TextInput from "components/Inputs/TextInput";
import { ICreateContactInput } from "gql/Contact/mutations";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

import { FormWrapper, Main, Top } from "./Contact.style";

export const Contact = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateContactInput>();

  const controllerProps = {
    control,
    rules: { required: true },
  };

  const handleCreateComment = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Main>
      <Top className="p-8">
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>

        <p>
          Vestibulum saggitis mollis leo et vestibulum. Curabitur auctor felis
          quis felis ullamcorper
        </p>

        <FormWrapper className="m-8 w-6/12">
          <form className="w-full flex">
            <div className="flex flex-col mr-5 w-5/12">
              <label>Nombre</label>
              <Controller
                {...controllerProps}
                defaultValue=""
                name="name"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Ingresar su nombre"
                    error={errors?.name && "Debes ingresar el nombre"}
                  />
                )}
              />

              <label>Ciudad</label>
              <Controller
                {...controllerProps}
                defaultValue=""
                name="city"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Ingresar su ciudad"
                    error={errors?.city && "Debes ingresar ciudad"}
                  />
                )}
              />

              <label>Email</label>
              <Controller
                {...controllerProps}
                defaultValue=""
                name="email"
                rules={{
                  required: true,
                  validate: (value) => isEmail(value),
                }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Ingresar su email"
                    error={errors?.email && "Debes ingresar email"}
                  />
                )}
              />
            </div>
            <div className="flex flex-col w-7/12">
              <label>Comentario</label>
              <Controller
                {...controllerProps}
                name="comment"
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    placeholder="Ingresa el comentario"
                    error={errors?.comment && "Debes ingresar el comentario"}
                    as="textarea"
                  />
                )}
              />
            </div>
          </form>
        </FormWrapper>

        <button
          className="px-8 py-2 mt-10 mb-4"
          onClick={handleSubmit(handleCreateComment)}
        >
          Call to action
        </button>
      </Top>
    </Main>
  );
};
