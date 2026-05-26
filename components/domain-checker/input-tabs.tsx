"use client";

import FileUploadZone from "@/components/domain-checker/file-upload-zone";
import PasteInput from "@/components/domain-checker/paste-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InputTabs = () => {
  return (
    <Tabs defaultValue="paste" className="w-full">
      <TabsList className="bg-scootopia-gray-100 ">
        <TabsTrigger
          className="data-active:bg-scootopia-gray-70 dark:data-active:bg-scootopia-gray-70 data-active:text-scootopia-gray-10 dark:data-active:text-scootopia-gray-10  cursor-pointer uppercase tracking-wide rounded-md"
          value="paste"
        >
          Paste / Type
        </TabsTrigger>
        <TabsTrigger
          className="data-active:bg-scootopia-gray-70 dark:data-active:bg-scootopia-gray-70 data-active:text-scootopia-gray-10 dark:data-active:text-scootopia-gray-10 cursor-pointer uppercase tracking-wide rounded-md"
          value="upload"
        >
          Upload
        </TabsTrigger>
      </TabsList>
      <TabsContent value="paste">
        <PasteInput />
      </TabsContent>
      <TabsContent value="upload">
        <FileUploadZone />
      </TabsContent>
    </Tabs>
  );
};

export default InputTabs;
