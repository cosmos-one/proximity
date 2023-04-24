import { FaFilePdf } from "react-icons/fa";
import {
  SiAdobephotoshop,
  SiMicrosoftword,
  SiMicrosoftpowerpoint,
  SiMicrosoftexcel,
  SiRhinoceros,
  SiAdobeillustrator,
} from "react-icons/si";
import { VscMarkdown } from "react-icons/vsc";
import { TbPng } from "react-icons/tb";
import {
  BsImageFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { GiBlackBook } from "react-icons/gi";
import { RiFileUnknowFill } from "react-icons/ri";

export const FileIcon = ({ fileType }) => {
  return (
    <>
      {fileType === ".pdf" ? (
        <FaFilePdf />
      ) : fileType === ".md" ? (
        <VscMarkdown />
      ) : fileType === ".jpg" ? (
        <BsImageFill />
      ) : fileType === ".png" ? (
        <TbPng />
      ) : fileType === ".pcol" ? (
        <BsFillGrid3X3GapFill />
      ) : fileType === ".pas" ? (
        <GiBlackBook />
      ) : fileType === ".psd" ? (
        <SiAdobephotoshop />
      ) : fileType === ".ai" ? (
        <SiAdobeillustrator />
      ) : fileType === ".docx" ? (
        <SiMicrosoftword />
      ) : fileType === ".pptx" ? (
        <SiMicrosoftpowerpoint />
      ) : fileType === ".xlsx" ? (
        <SiMicrosoftexcel />
      ) : fileType === ".3dm" ? (
        <SiRhinoceros />
      ) : <RiFileUnknowFill/>}
    </>
  );
};
