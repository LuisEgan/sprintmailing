import { useMutation } from "@apollo/client";
import Icon from "components/_Custom/Icon/Icon";
import UserAvatar from "components/_Custom/UserAvatar/UserAvatar";
import CropImage, { CropImageType } from "components/Context/Modal/CropImage";
import {
  ProfileFormItem,
  ProfileImage,
} from "components/Site/Styles/Profile/profile.style";
import { useModal } from "context/modal/modal.provider";
import { useNotification } from "context/notification/notification.provider";
import { useProfile } from "context/profile/profile.context";
import { gqlUser } from "gql";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Input, Loader, Row, Uploader } from "rsuite";
import { FileType } from "rsuite/esm/Uploader/Uploader";

const ProfilePage = () => {
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
  const { t } = useTranslation("common");
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
        backdrop: "static",
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
    <>
      <div className="flex items-center justify-center flex-col">
        <div className=" h-52 bg-gray-100 dark:bg-gray-900 w-full rounded-md" />
        <ProfileImage className="rs-avatar-circle -mt-16 border">
          <Uploader
            fileListVisible={false}
            accept="image/png, image/jpeg"
            onChange={handleProfileImageChange}
          >
            <button
              className="rounded-full"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                padding: 0,
              }}
            >
              {updateProfileLoading && <Loader backdrop center />}
              {user?.profileImage ? (
                <UserAvatar {...{ user, showName: false, size: 120 }} />
              ) : (
                <Icon icon="plus" />
              )}
            </button>
          </Uploader>
        </ProfileImage>
      </div>
      <div className="p-5">
        <Row>
          <Col xs={24} lg={8}>
            {user && (
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md">
                <ProfileFormItem>
                  <label>{t("profile.name")}</label>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={user.name || ""}
                    render={({ field }) => (
                      <Input
                        placeholder={t("profile.namePlaceholder")}
                        {...field}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </ProfileFormItem>
                <ProfileFormItem>
                  <label>{t("profile.lastname")}</label>
                  <Controller
                    name="lastname"
                    control={control}
                    defaultValue={user.lastname || ""}
                    render={({ field }) => (
                      <Input
                        placeholder={t("profile.lastnamePlaceholder")}
                        {...field}
                      />
                    )}
                    rules={{ required: true }}
                  />
                </ProfileFormItem>

                <ProfileFormItem>
                  <label>{t("profile.email")}</label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={user.email || ""}
                    render={({ field }) => (
                      <Input
                        placeholder={t("profile.emailPlaceholder")}
                        {...field}
                      />
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
                    onClick={handleSubmit(handleUpdate)}
                  >
                    {t("profile.updateBtn")}
                  </Button>
                </ProfileFormItem>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfilePage;
