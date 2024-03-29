"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { XMarkIcon } from "@heroicons/react/24/outline";
import CheckboxDropdown from "./CheckboxDropdown";
import DatePicker from "./DatePicker";
import ImagePreview from "./ImagePreview";
import SelectDropdown from "./SelectDropdown";
import { ApiInfo } from "../lib-client/apiInfo";
import type { ImageAsset } from "../../stare-into-the-void-functions/src/models/image-assets";
import { useRouter } from "next/navigation";
import { RiImageEditLine } from "react-icons/ri";
import DownloadLink from "./DownloadLink";
import { FaDownload, FaSave } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";
import { imageToQueryParams } from "../lib-client/util";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageQueryResults } from "../lib-server/nasa-api";

const LOCAL_STORAGE_KEY = "recent";
const MAX_RECENT_IMAGES = 50;

const apis: {
  value: string;
  tooltip: string;
  isDefault: boolean;
}[] = [];
for (const key in ApiInfo) {
  const apiVal = {
    value: key,
    label: ApiInfo[key].name,
    tooltip: ApiInfo[key].desc,
    isDefault: true,
  };
  if (
    ApiInfo[key].name === ApiInfo.ImageAndVideoLibrary.name ||
    ApiInfo[key].name === ApiInfo.APOD.name
  ) {
    apis.push(apiVal);
  }
}

const sortOpts = ["Relevant", "Recent", "Oldest"];

export default function ImageBrowser({
  imgResults,
  title,
  presorted = false,
  prefiltered = false,
  saved = false,
  onDeleteImage = () => {},
}: {
  imgResults: ImageQueryResults;
  title: React.ReactNode;
  presorted?: boolean;
  prefiltered?: boolean;
  saved?: boolean;
  onDeleteImage?: (img: ImageAsset) => void;
}) {
  const { images, loadMore } = imgResults;
  const [recent, setRecent] = useLocalStorage<ImageAsset[]>(
    LOCAL_STORAGE_KEY,
    [],
    (val) => Array.isArray(val)
  );
  const router = useRouter();
  const [selectedAPIs, setSelectedAPIs] = useState<Set<string>>();
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [sortBy, setSortBy] = useState(sortOpts[0]);
  const [selectedPreview, setSelectedPreview] = useState<number | null>();
  const [topElement, setTopElement] = useState<HTMLElement>();

  // If image drawer is not open, will be null or undefined, else will be url of selected img
  const [filteredImages, setFilteredImages] = useState<ImageAsset[]>([]);

  useEffect(() => {
    let filtered = images;
    if (!prefiltered) {
      filtered = images.filter((img) => {
        const from = fromDate?.valueOf() ?? new Date("0001-01-01").valueOf();
        const to = toDate?.valueOf() ?? new Date().valueOf();
        return (
          img.date.valueOf() >= from &&
          img.date.valueOf() <= to &&
          selectedAPIs?.has(img.sourceAPI)
        );
      });
    }
    if (!presorted) {
      if (sortBy === "Recent") {
        filtered.sort((a, b) => {
          return b.date.valueOf() - a.date.valueOf();
        });
      } else if (sortBy === "Oldest") {
        filtered.sort((a, b) => {
          return a.date.valueOf() - b.date.valueOf();
        });
      }
    }
    setFilteredImages(filtered);
  }, [images, fromDate, toDate, sortBy, selectedAPIs, prefiltered, presorted]);

  useEffect(() => {
    topElement?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedPreview, topElement]);

  useEffect(() => {
    if (selectedPreview != null) {
      const recentIdx = recent.findIndex(
        (val) => val.urls.orig === filteredImages[selectedPreview].urls.orig
      );
      if (recentIdx !== -1 && recentIdx !== 0) {
        recent.splice(recentIdx, 1);
      }
      if (recentIdx !== 0) {
        recent.unshift(filteredImages[selectedPreview]);
      }
      if (recent.length > MAX_RECENT_IMAGES) {
        recent.pop();
      }
      setRecent(recent);
    }
  }, [selectedPreview, filteredImages, recent, setRecent]);

  const apiSelector = (
    <CheckboxDropdown
      dropdownText="Select Source APIs"
      values={apis}
      setValues={setSelectedAPIs}
    />
  );

  const dateRangeSelector = (
    <fieldset className="flex items-center mx-4">
      <DatePicker labelText="From" inputName="from" setDate={setFromDate} />
      <DatePicker labelText="To" inputName="to" setDate={setToDate} />
    </fieldset>
  );

  const sortBySelector = (
    <SelectDropdown
      dropdownText="Sort By:"
      values={sortOpts}
      setValue={setSortBy}
    />
  );

  const getImgs = () => {
    const imgResults: JSX.Element[] = [];
    filteredImages.forEach((img, idx) => {
      imgResults.push(
        <ImagePreview
          img={img}
          onClick={(e) => {
            setSelectedPreview(idx);
            setTopElement(e.currentTarget);
          }}
          key={img.urls.orig}
          selected={selectedPreview === idx}
          onDelete={() => {
            onDeleteImage(img);
          }}
          saved={saved}
        />
      );
    });

    return imgResults;
  };

  const imgElems = getImgs();
  const mobileElemsLeft: JSX.Element[] = [];
  const mobileElemsRight: JSX.Element[] = [];
  imgElems.forEach((val, idx) => {
    idx % 2 ? mobileElemsRight.push(val) : mobileElemsLeft.push(val);
  });

  return (
    <>
      <div className="bg-gray-800">
        {(!presorted || !prefiltered) && (
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <form className="relative h-16 flex items-center text-gray-300 3xl:text-xl">
              {!prefiltered && apiSelector}
              {!prefiltered && dateRangeSelector}
              {!presorted && sortBySelector}
            </form>
          </div>
        )}
      </div>
      <div className="xl:py-12 3xl:py-24 mx-auto">
        <div className="w-full xl:w-10/12 bg-charcoal bg-opacity-80 xl:rounded-xl max-h-max mx-auto p-4 xl:p-8">
          <h2 className="text-white text-xl 3xl:text-3xl 3xl:p-4 text-center">
            {title}
          </h2>
          <div
            className={`${
              selectedPreview ? "w-7/12 3xl:w-9/12" : "w-full"
            } hidden md:flex flex-row flex-wrap justify-around items-center md:items-start`}
          >
            {imgElems}
          </div>
          <div className="md:hidden flex">
            <div className="flex flex-col">{mobileElemsLeft}</div>
            <div className="flex flex-col">{mobileElemsRight}</div>
          </div>
        </div>
      </div>
      <div
        className={`${
          selectedPreview != null ? "w-full md:w-5/12 3xl:w-3/12" : "w-0"
        } fixed right-0 bottom-0 md:bottom-12 h3xl:bottom-auto top-0 md:top-12 h3xl:top-72 h3xl:min-h-[75rem] overflow-y-scroll shadow-lg shadow-black/40 md:rounded-l-xl bg-gray-500 text-white transition-all`}
      >
        {selectedPreview != null && (
          <>
            <div className="absolute flex flex gap-1 ml-1 mt-1 3xl:mt-4 3xl:ml-4 3xl:gap-4">
              <button onClick={() => setSelectedPreview(null)}>
                <XMarkIcon
                  className="block h-6 w-6 3xl:h-12 3xl:w-12"
                  aria-hidden="true"
                />
              </button>
              <button
                aria-label="Open image in editor"
                onClick={() => {
                  router.push(
                    `/edit${imageToQueryParams(
                      filteredImages[selectedPreview]
                    )}`
                  );
                }}
              >
                <RiImageEditLine
                  aria-hidden={true}
                  className="h-6 w-6 3xl:h-12 3xl:w-12"
                />
              </button>
              <DownloadLink
                className="relative left-[0.125rem] py-[0.125rem]"
                href={filteredImages[selectedPreview].urls.orig}
                imgTitle={filteredImages[selectedPreview].title}
              >
                <FaDownload
                  aria-hidden={true}
                  className="w-5 h-5 3xl:h-10 3xl:w-10"
                />
              </DownloadLink>
              <button
                className="relative left-[0.125rem] py-[0.25rem]"
                aria-label="Save image on account"
              >
                <FaSave
                  aria-hidden={true}
                  className="w-5 h-5 3xl:h-10 3xl:w-10"
                />
              </button>
            </div>
            <div className="flex flex-col items-center 3xl:mt-12">
              <div className="my-8 mx-auto w-10/12 bg-gray-700 rounded-lg shadow-black/40 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rounded-lg object-scale-down mx-auto"
                  src={filteredImages[selectedPreview].urls.thumb}
                  alt={filteredImages[selectedPreview].title}
                  width={600}
                  height={200}
                />
              </div>
              <div className="w-10/12 flex justify-between mb-4 items-end">
                <span className="font-bold text-xl 3xl:text-3xl">
                  {filteredImages[selectedPreview].title}
                </span>
                <span className="3xl:text-2xl">
                  {filteredImages[selectedPreview].date
                    .toUTCString()
                    .slice(0, 16)}
                </span>
              </div>
              <p className="w-10/12 break-words leading-relaxed 3xl:text-2xl mb-8">
                {filteredImages[selectedPreview].description}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
