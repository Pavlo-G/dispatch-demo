import { DataGrid } from "@mui/x-data-grid";
import { columns } from "src/routes/techs/config";
import { transformTechsToRows } from "src/routes/techs/utils/transformTechsToRows";
import type { Technician } from "src/types/Technician";

const TechsDataGrid = ({ techs }: { techs: Technician[] }) => {
  const rows = transformTechsToRows(techs);
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      disableRowSelectionOnClick
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
};

export default TechsDataGrid;
