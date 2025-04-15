import {
  IconButton,
  RenderTextCell,
} from "@/component/organisms/AppTable/CommonCells";
import { FaEye, FaUserEdit } from "react-icons/fa";

export const PatientTableHeader = [
  {
    key: "name",
    title: "Name",
    style: { width: "10%" },
  },
  {
    key: "email",
    title: "Email Address",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "medicalCondition",
    title: "Medical Conditions",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "gender",
    title: "Gender",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "bloodType",
    title: "Blood Type",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    key: "usefulInformation",
    title: "Useful Information",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Action",
    key: "action",
    style: { width: "10%" },
    // Render 'View' button for each row
    renderValue: (cellValue, completeData) => (
      <div className="flex row gap-2">
        <IconButton
          onClick={() =>
            navigate(`/clinic/patient-detail/${completeData?.slug}`)
          }
          icon={<FaEye size={20} />}
        />
        <IconButton
          onClick={() => navigate(`/clinic/edit-patient/${data}`)}
          icon={<FaUserEdit size={20} />}
        />
      </div>
    ),
  },
];
