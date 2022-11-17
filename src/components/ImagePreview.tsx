import React from "react";

interface ImagePreviewProps {
  title: string;
  url: string;
  imgAltText?: string;
  lastOpened?: string;
  cols?: number;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function ImagePreview({
  title,
  url,
  imgAltText,
  lastOpened,
  selected,
  onClick,
}: ImagePreviewProps) {
  return (
    <div
      className={`flex flex-col items-center p-4 h-fit max-w-2xs`}
      onClick={onClick}
    >
      <div className="m-2 w-full h-full">
        {selected && (
          <div className="absolute -translate-x-2 -translate-y-2 h-[15rem] w-[15rem] md:h-[13rem] rounded-md bg-indigo-300/25 border-indigo-300 border-solid border-2" />
        )}
        <img
          className="rounded-md shadow-md shadow-black/40 object-cover h-56 w-56 md:h-48"
          src={url}
          alt={imgAltText ?? ""}
          loading="lazy"
        />
      </div>
      <span className="text-md text-white text-center">{title}</span>
      <span className="text-sm text-white text-center">{lastOpened ?? ""}</span>
    </div>
  );
}
