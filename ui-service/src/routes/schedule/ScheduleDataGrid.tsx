import { DataGrid } from "@mui/x-data-grid";
import { columns } from "src/routes/schedule/config";
import { transformDispatchesToRows } from "src/routes/schedule/utils/transformDispatchesToRows";
import type { Dispatch } from "src/types/Dispatch";

const ScheduleDataGrid = ({ dispatches }: { dispatches: Dispatch[] }) => {
  const rows = transformDispatchesToRows(dispatches);
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

export default ScheduleDataGrid;
