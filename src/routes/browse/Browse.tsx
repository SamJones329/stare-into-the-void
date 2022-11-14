/* eslint-disable @typescript-eslint/no-unused-vars */
import { Listbox } from "@headlessui/react";
import * as React from "react";
import CheckboxDropdown from "../../components/CheckboxDropdown";
import DatePicker from "../../components/DatePicker";
import ImagePreview from "../../components/ImagePreview";
import SelectDropdown from "../../components/SelectDropdown";
import { FunctionsService } from "../../lib/firebase-services"
import { ApiInfo } from "../../lib/apiInfo";
import { title } from "process";
import { type ImageAsset } from "../../../stare-into-the-void-functions/src/models/image-assets";

const apis: {
  value: string;
  tooltip: string;
  isDefault: boolean;
}[] = [];
for (const key in ApiInfo) {
  const apiVal = {
    value: ApiInfo[key].name,
    tooltip: ApiInfo[key].desc,
    isDefault: true,
  };
  apis.push(apiVal);
}

const sortOpts = ["Recent", "Relevant", "Something else idk"];

const testImgInfo = [
  {
    imgUrl: "https://picsum.photos/500/500",
    dispText: "Random Picture",
  },
  {
    imgUrl: "https://picsum.photos/300/500",
    dispText: "Random Picture 2",
  },
  {
    imgUrl: "https://picsum.photos/500/300",
    dispText: "Random Picture 3",
  },
  {
    imgUrl: "https://picsum.photos/250/250",
    dispText: "Random Picture 4",
  },
  {
    imgUrl: "https://picsum.photos/1000/1000",
    dispText: "Random Picture 5",
  },
  {
    imgUrl: "https://picsum.photos/640/480",
    dispText: "Random Picture 6",
  },
  {
    imgUrl: "https://picsum.photos/480/640",
    dispText: "Random Picture 6",
  },
];

export default function Browse() {
  const [selectedAPIs, setSelectedAPIs] = React.useState<Set<string>>();
  const [fromDate, setFromDate] = React.useState<Date>();
  const [toDate, setToDate] = React.useState<Date>();
  const [sortBy, setSortBy] = React.useState(sortOpts[0]);

  // If image drawer is not open, will be null or undefined, else will be url of selected img
  const [openImg, setOpenImg] = React.useState<string>("");
  const [imgs, setImgs] = React.useState<ImageAsset[]>([]);

  React.useEffect(() => {
    FunctionsService.instance.getNIVLWithQuery("earth").then((val) => {
      setImgs(val);
    });
  }, [])

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
    <SelectDropdown values={sortOpts} setValue={setSortBy} />
  );

  const getImgs = () => imgs.map((img, idx) => <ImagePreview key={idx} {...img} />)

  return (
    <>
      <div className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <form className="relative h-16 flex items-center text-gray-300">
            {apiSelector}
            {dateRangeSelector}
            {sortBySelector}
          </form>
        </div>
      </div>
      <div className="w-10/12 bg-charcoal bg-opacity-80 rounded-xl max-h-max mx-auto my-12 p-8 flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start">
        {getImgs()}
      </div>
      {openImg && (
        <div className="absolute right-0 bg-gray-500">
          <img src={openImg} alt="" />
          <span>Random Picture</span>
          <span>Taken: </span>
          <span>11/10/2022</span>
          <button>Download</button>
          <button>Edit</button>
        </div>
      )}
    </>
  );
}
