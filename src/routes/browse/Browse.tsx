import { Listbox } from "@headlessui/react";
import * as React from "react";
import CheckboxDropdown from "../../components/CheckboxDropdown";
import DatePicker from "../../components/DatePicker";
import SelectDropdown from "../../components/SelectDropdown";

import { ApiInfo } from "../../lib/apiInfo";

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

const sortOpts: {
  value: string;
  tooltip?: string;
  isDefault?: boolean;
}[] = [
  {
    value: "Recent",
    isDefault: true,
  },
  {
    value: "Relevant",
  },
  {
    value: "Something else idk",
  },
];

export default function Browse() {
  const [selectedAPIs, setSelectedAPIs] = React.useState();
  const [fromDate, setFromDate] = React.useState<Date>();
  const [toDate, setToDate] = React.useState<Date>();
  const [sortBy, setSortBy] = React.useState(sortOpts[0]);

  const apiSelector = (
    <CheckboxDropdown dropdownText="Select Source APIs" values={apis} />
  );

  const dateRangeSelector = (
    <fieldset className="flex items-center mx-4">
      <DatePicker labelText="From" inputName="from" setDate={setFromDate} />
      <DatePicker labelText="To" inputName="to" setDate={setToDate} />
    </fieldset>
  );

  const sortBySelector = <SelectDropdown />;

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
      <div>Hello from Browse</div>
    </>
  );
}
