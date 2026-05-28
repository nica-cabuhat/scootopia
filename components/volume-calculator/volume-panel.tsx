"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const INPUT_CLASS =
  "h-full border-0 focus:border-0 focus-visible:border-0 text-2xl md:text-4xl";
const INPUT_EDITABLE_CLASS =
  "bg-scootopia-gray-90 dark:bg-scootopia-gray-90 focus:ring-2 focus:ring-scootopia-accent focus-visible:ring-2 focus-visible:ring-scootopia-accent";
const INPUT_READONLY_CLASS =
  "bg-scootopia-gray-80 dark:bg-scootopia-gray-70 focus:ring-0 focus-visible:ring-0";

const VolumePanel = () => {
  const [bannerVolume, setBannerVolume] = useState("");
  const [videoVolume, setVideoVolume] = useState("");
  const [nativeVolume, setNativeVolume] = useState("");
  const [isVideoCopied, setIsVideoCopied] = useState(false);
  const [isNativeCopied, setIsNativeCopied] = useState(false);

  const videoRef = useRef<HTMLInputElement>(null);
  const nativeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const parsed = Number(bannerVolume);
    setVideoVolume(bannerVolume ? `${Math.round(parsed * 0.58)}m` : "");
    setNativeVolume(bannerVolume ? `${Math.round(parsed * 0.6 * 0.26)}m` : "");
  }, [bannerVolume]);

  const copyToClipboard = async (
    ref: React.RefObject<HTMLInputElement | null>,
    setCopied: (v: boolean) => void,
  ) => {
    const value = ref.current?.value;
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      // clipboard unavailable
    }
  };

  const volumeData = [
    {
      type: "Banner Volume",
      value: bannerVolume,
      onChange: (v: string) => setBannerVolume(v),
    },
    {
      type: "Video Volume",
      value: videoVolume,
      placeholder: "0m",
      readOnly: true,
      ref: videoRef,
      isCopied: isVideoCopied,
      onCopy: () => copyToClipboard(videoRef, setIsVideoCopied),
    },
    {
      type: "Native Volume",
      value: nativeVolume,
      placeholder: "0m",
      readOnly: true,
      ref: nativeRef,
      isCopied: isNativeCopied,
      onCopy: () => copyToClipboard(nativeRef, setIsNativeCopied),
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between space-y-4 px-3 py-0.5">
      <div className="rounded-md shadow w-full h-full bg-scootopia-gray-100 ring-scootopia-gray-80 ring-1 p-6 flex flex-col">
        <h3 className="text-xl font-medium uppercase tracking-wide mb-6">
          Volume Calculator
        </h3>
        <div className="flex flex-col h-full space-y-8 pb-4">
          {volumeData.map(
            ({
              type,
              value,
              onChange,
              placeholder,
              readOnly,
              ref,
              isCopied,
              onCopy,
            }) => (
              <div key={type} className="h-full space-y-1">
                <Label>{type}</Label>
                <div className="h-full relative">
                  {isCopied && (
                    <span className="absolute top-1/2 right-2 -translate-y-1/2 text-xl z-10">
                      📋
                    </span>
                  )}
                  <Input
                    className={`${INPUT_CLASS} ${onCopy ? `${INPUT_READONLY_CLASS} cursor-pointer` : INPUT_EDITABLE_CLASS}`}
                    value={value}
                    onChange={
                      onChange ? (e) => onChange(e.target.value) : undefined
                    }
                    placeholder={placeholder}
                    readOnly={readOnly}
                    ref={ref}
                    onClick={onCopy}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="rounded-md shadow w-full h-full relative overflow-hidden">
        <Image
          src="/hero.gif"
          alt="Captain Pikachu Dancing"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default VolumePanel;
