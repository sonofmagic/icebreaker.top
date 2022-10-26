export interface IShiftCellValue {
  shiftId: string
  name: string
  startTime: string
  endTime: string
  duration: number
  shiftDate: string
  ifSenior: number
  remark: string
}

export interface IShiftPerson {
  personId: string
  hireDate: string
  terminationDate?: string
  name: string
  employeeId: string
  orgCode: string
  positionCode?: null
  shiftList: IShiftCellValue[]
  lockDateList: string[]
  totalDuration: number
  totalWorkDays: number
  totalRestDays: number
}
