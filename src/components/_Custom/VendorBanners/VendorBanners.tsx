import { useMutation } from "@apollo/client";
import Icon from "components/_Custom/Icon/Icon";
import SortableGrid from "components/_Custom/SortableGrid";
import Uploader, { IUploaderImage } from "components/_Custom/Uploader/Uploader";
import { gqlVendor } from "gql";
import { IUpdateVendorInput } from "gql/Vendor/mutations";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { BlockPicker } from "react-color";
import {
  Button,
  Input,
  InputGroup,
  Popover,
  SelectPicker,
  Whisper,
} from "rsuite";
import { Swiper, SwiperSlide } from "swiper/react";
import { IVendor, IVendorBanner } from "types/Vendor.types";
import { blobToBase64 } from "utils/files";

import {
  BannersContainer,
  BannersSlide,
  BannersSlideContainer,
  SortableImage,
} from "./styles";

interface ISiteBanners {
  currentBanners: IVendorBanner[];
  onChange?: (banners: IVendorBanner[]) => void;
}

const VendorBanners = (props: ISiteBanners) => {
  const { currentBanners, onChange } = props;
  const [init, setInit] = useState<boolean>(false);
  const [banners, setBanners] = useState<IVendorBanner[]>([]);
  const [swiperIndex, setSwiperIndex] = useState<number>(0);
  const { t } = useTranslation("common");

  const [updateVendor, { loading }] = useMutation<
    { updateVendor: IVendor },
    { updateVendorInput: IUpdateVendorInput }
  >(gqlVendor.mutations.UPDATE_VENDOR);

  const onInputChange = (
    value: string,
    type:
      | "title"
      | "description"
      | "cta"
      | "btnColor"
      | "btnText"
      | "align"
      | "modal",
    bannerIndex: number,
  ) => {
    const newBanners = [...banners];

    newBanners[bannerIndex] = {
      ...newBanners[bannerIndex],
      [type]: value,
    };

    setBanners(newBanners);
  };

  const data = [
    {
      value: "",
      label: "Ninguno",
    },
    {
      value: "AddCertificationModal",
      label: "Modal - Agregar Certification",
    },
  ];

  const speakerBtnModal = (bannerIndex: number) => (
    <Popover className="rs-user-badge">
      <SelectPicker
        id={`banner-modal-${bannerIndex}`}
        labelKey="label"
        valueKey="value"
        data={data}
        style={{ width: 360 }}
        value={banners[bannerIndex].modal}
        searchable={false}
        cleanable={false}
        onSelect={(value) => {
          onInputChange(value, "modal", bannerIndex);
        }}
      />
    </Popover>
  );

  const speakerBtnCtaColor = (bannerIndex: number) => (
    <Popover className="rs-user-badge">
      <BlockPicker
        className="mt-3"
        color={banners[bannerIndex].btnColor || "#2D2CB0"}
        onChangeComplete={(v) =>
          onInputChange(v?.hex as string, "btnColor", bannerIndex)
        }
      />
    </Popover>
  );

  const speakerBtnCTA = (bannerIndex: number) => (
    <Popover className="rs-user-badge">
      <InputGroup>
        <InputGroup.Button style={{ fontSize: 12 }}>
          <Icon icon={["fas", "link"]} />
        </InputGroup.Button>
        <Input
          style={{ width: "20rem", fontSize: 12 }}
          value={banners[bannerIndex].cta}
          onChange={(v: string) => onInputChange(v, "cta", bannerIndex)}
        />
      </InputGroup>
    </Popover>
  );

  // * Load current banners
  useEffect(() => {
    if (currentBanners?.length) {
      setBanners(currentBanners);
      setInit(false);
    }
    // eslint-disable-next-line
  }, [currentBanners]);

  // * Callback for when banners update
  useEffect(() => {
    if (banners) {
      if (!init) {
        // * this is to avoid calling it when banners are set at the beginning
        setInit(true);
      } else if (onChange) {
        onChange(banners);
      }
    }
    // eslint-disable-next-line
  }, [banners, onChange]);

  const sortBanners = (newOrder: string[]) => {
    const newBanners: IVendorBanner[] = [];
    const oldBanners = [...banners];

    newOrder.forEach((bannerUrl) => {
      oldBanners.some((banner, index) => {
        if (bannerUrl === banner.bannerUrl) {
          newBanners.push(banner);
          oldBanners.splice(index, 1);
          return true;
        }
        return false;
      });
    });

    setBanners(newBanners);
  };

  const toggleAlign = (bannerIndex: number) => {
    // * Toggle align between left and right and center
    const newBanners = [...banners];

    if (
      newBanners[bannerIndex].align === "start" ||
      !newBanners[bannerIndex].align
    ) {
      newBanners[bannerIndex].align = "center";
      onInputChange("center", "align", bannerIndex);
    } else if (newBanners[bannerIndex].align === "center") {
      newBanners[bannerIndex].align = "end";
      onInputChange("end", "align", bannerIndex);
    } else {
      newBanners[bannerIndex].align = "start";
      onInputChange("start", "align", bannerIndex);
    }
  };

  const onUpload = async (files: IUploaderImage[]) => {
    let imgUrl: string = "";

    if (files[0]) {
      if (files[0]?.preview?.startsWith("blob:")) {
        imgUrl = await blobToBase64({ blob: files[0] });
      } else {
        imgUrl = files[0].preview;
      }
    }

    setBanners([
      ...banners,
      {
        bannerUrl: imgUrl,
      },
    ]);
  };

  const handleUpdateVendor = () => {
    updateVendor({
      variables: {
        updateVendorInput: {
          banners,
        },
      },
    });
  };

  return (
    <>
      <BannersContainer className="relative">
        <Swiper
          className="swiper swiperBanners"
          navigation
          pagination={{ clickable: true }}
          observer
          observeParents
          allowTouchMove={false}
          touchRatio={0}
          noSwiping
          onSlideChange={(index) => {
            setSwiperIndex(index.realIndex);
          }}
        >
          {banners.map(({ bannerUrl, title, description }, index) => (
            <SwiperSlide key={bannerUrl}>
              <Button
                size="sm"
                appearance="default"
                className="mb-2 absolute right-2 top-2 rounded-full cursor-pointer "
                style={{
                  zIndex: 37,
                  width: 30,
                  height: 30,
                }}
                onClick={() => {
                  toggleAlign(index);
                }}
              >
                {banners[index].align === "start" || !banners[index].align ? (
                  <Icon icon={["fas", "align-left"]} />
                ) : banners[index].align === "center" ? (
                  <Icon icon={["fas", "align-center"]} />
                ) : (
                  <Icon icon={["fas", "align-right"]} />
                )}
              </Button>
              <BannersSlideContainer>
                <div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Image
                      src={bannerUrl}
                      objectFit="cover"
                      layout="fill"
                      className="rounded-md"
                    />
                  </div>
                  <div
                    className={`absolute top-0 left-0 h-full w-full px-16 mx-auto flex flex-col  z-20  justify-center items-${banners[index].align} bg-gradient-to-t from-gray-800 dark:from-black`}
                  >
                    <Input
                      className="w-1/2  mt-5 text-center text-white "
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        border: 0,
                      }}
                      placeholder={t("Título")}
                      value={title || ""}
                      onChange={(v: string) => onInputChange(v, "title", index)}
                    />
                    <Input
                      placeholder={t("Descripción")}
                      className="w-1/3 mt-3 text-center text-white "
                      style={{ backgroundColor: "rgba(0,0,0,0.4)", border: 0 }}
                      as="textarea"
                      rows={3}
                      value={description || ""}
                      onChange={(v: string) =>
                        onInputChange(v, "description", index)
                      }
                    />

                    <div className="w-1/3 mt-3">
                      <InputGroup inside style={{ border: 0 }}>
                        <Whisper
                          placement="bottom"
                          speaker={speakerBtnModal(index)}
                          trigger="click"
                          enterable
                          controlId={`${index}__whisper`}
                        >
                          <Button className="my-1 overflow-hidden ">
                            <Icon icon={["fas", "poll"]} />
                          </Button>
                        </Whisper>

                        <Whisper
                          placement="bottom"
                          speaker={speakerBtnCTA(index)}
                          trigger="click"
                          enterable
                        >
                          <Button className="m-1 overflow-hidden ">
                            <Icon icon={["fas", "link"]} />
                          </Button>
                        </Whisper>
                        <Input
                          className="text-center m-1 text-gray-300"
                          placeholder={t("Button text")}
                          style={{
                            padding: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            backgroundColor:
                              banners.length && banners[index]?.btnColor
                                ? banners[index].btnColor
                                : "#2D2CB0",
                          }}
                          value={banners.length && banners[index]?.btnText}
                          onChange={(v: string) =>
                            onInputChange(v, "btnText", index)
                          }
                        />
                        <Whisper
                          placement="bottomEnd"
                          speaker={speakerBtnCtaColor(index)}
                          trigger="click"
                          enterable
                        >
                          <Button className="m-1 overflow-hidden">
                            <Icon icon={["fas", "eye-dropper"]} />
                          </Button>
                        </Whisper>
                      </InputGroup>
                    </div>
                  </div>
                </div>
              </BannersSlideContainer>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <BannersSlideContainer>
              <BannersSlide islast>
                <Uploader
                  onChange={onUpload}
                  icon={<Icon icon={["fas", "plus-hexagon"]} size="3x" />}
                  showThumbs={false}
                  multiple={false}
                />
              </BannersSlide>
            </BannersSlideContainer>
          </SwiperSlide>
        </Swiper>
        <SortableGrid
          items={banners.map(({ bannerUrl }) => bannerUrl)}
          style={{
            padding: "1rem 0",
          }}
          onChange={(sortedItems) => {
            sortBanners(sortedItems as string[]);
          }}
          deletable
          renderItem={({ item, currentIndex }) => (
            <SortableImage>
              <img
                src={item as string}
                alt="product"
                className={`rounded-md ${
                  currentIndex === swiperIndex
                    ? "border-2 border-current-700"
                    : ""
                }`}
                style={{
                  objectFit: "cover",
                }}
              />
            </SortableImage>
          )}
        />
      </BannersContainer>
      <Button
        appearance="primary"
        loading={loading}
        onClick={handleUpdateVendor}
      >
        Actualizar
      </Button>
    </>
  );
};

export default VendorBanners;
