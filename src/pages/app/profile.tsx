import { useMutation } from "@apollo/client";
import { useNotification } from "context/notification/notification.provider";
import { useProfile } from "context/profile/profile.context";
import { gqlUser } from "gql";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Icon, Input, Loader, Panel, Row, Uploader } from "rsuite";
import { FileType } from "rsuite/lib/Uploader";
import {
  ProfileFormItem,
  ProfileImage,
  ProfileImageContent,
  ProfileWrapper,
} from "components/Styles/Profile/profile.style";
import { useModal } from "context/modal/modal.provider";
import CropImage, { CropImageType } from "components/Modal/CropImage";

const Profile = () => {
  const { fireNotification } = useNotification();
  const [updateProfile, { loading: updateProfileLoading }] = useMutation(
    gqlUser.mutations.UPDATE_USER_PROFILE,
    {
      refetchQueries: ["user"],
      onCompleted() {
        fireNotification({
          title: "¡Listo!",
          description: "Perfil actualizado correctamente",
          type: "success",
        });
      },
      onError() {
        fireNotification({
          title: "Oops!",
          description: "Ocurrió un error al actualizar",
          type: "error",
        });
      },
    },
  );

  const { openModal } = useModal();
  const { user } = useProfile();

  const { control, handleSubmit } = useForm();

  const handleUpdate = (data) => {
    updateProfile({
      variables: {
        updateProfileInput: {
          ...data,
        },
      },
    });
  };

  const cropCallback = (base64Result: string) => {
    updateProfile({
      variables: {
        updateProfileInput: {
          profileImage: base64Result,
        },
      },
    });
  };

  const handleProfileImageChange = (fileList: Array<FileType>) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileList[fileList.length - 1].blobFile as File);
    reader.onloadend = () => {
      const base64Img = reader.result as string;
      openModal({
        modalProps: { backdrop: "static" },
        modalComponent: (
          <CropImage
            {...{
              base64Img,
              callback: cropCallback,
              cropShape: CropImageType.ROUND,
            }}
          />
        ),
      });
    };
  };

  return (
    <ProfileWrapper className="p-5">
      <Row>
        <Col md={12} lg={8}>
          <Panel className="bg-gray-50 dark:bg-gray-900 shadow-sm">
            <ProfileImage className=" rs-avatar-circle mb-4">
              <Uploader
                fileListVisible={false}
                accept="image/png, image/jpeg"
                onChange={handleProfileImageChange}
              >
                <button
                  className="rs-avatar-circle"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "50%",
                    padding: 0,
                  }}
                >
                  {updateProfileLoading && <Loader backdrop center />}
                  {user?.profileImage ? (
                    <ProfileImageContent
                      style={{
                        backgroundImage: `url(${user.profileImage})`,
                      }}
                      className="border-2 border-current-500"
                    />
                  ) : (
                    <Icon icon="avatar" size="5x" />
                  )}
                </button>
              </Uploader>
            </ProfileImage>
            {user && (
              <form onSubmit={handleSubmit(handleUpdate)}>
                <ProfileFormItem>
                  <label>Nombre</label>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={user.name || ""}
                    render={({ field }) => (
                      <Input placeholder="Ingresa tu nombre" {...field} />
                    )}
                    rules={{ required: true }}
                  />
                </ProfileFormItem>
                <ProfileFormItem>
                  <label>Apellido</label>
                  <Controller
                    name="lastname"
                    control={control}
                    defaultValue={user.lastname || ""}
                    render={({ field }) => (
                      <Input placeholder="Ingresa tu apellido" {...field} />
                    )}
                    rules={{ required: true }}
                  />
                </ProfileFormItem>

                <ProfileFormItem>
                  <label>E-mail</label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={user.email || ""}
                    render={({ field }) => (
                      <Input placeholder="Ingresa tu email" {...field} />
                    )}
                    rules={{ required: true }}
                  />
                </ProfileFormItem>

                <ProfileFormItem className="flex justify-end mt-4">
                  <Button
                    type="submit"
                    appearance="primary"
                    disabled={updateProfileLoading}
                    loading={updateProfileLoading}
                  >
                    Actualizar Datos
                  </Button>
                </ProfileFormItem>
              </form>
            )}
          </Panel>
        </Col>
      </Row>
    </ProfileWrapper>
  );
};

export default Profile;

export async function getStaticProps() {
  return {
    props: {},
  };
}
