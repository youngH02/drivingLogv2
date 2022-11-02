module.exports = {
  getcarList: `select CAR_NUM, NOW_POS, TOTAL_DIS from CAR_INFO left join CAR_STAT on (CAR_INFO.CAR_ID=CAR_STAT.CAR_ID)`,
  regiCar: `insert into CAR_INFO set ?`,
  findCarId : `select CAR_ID from CAR_INFO where CAR_NUM=?`,
  findCarInfo : `select * from CAR_INFO where CAR_ID=?`,
  findCarInfobyNum: `select * from CAR_INFO where CAR_NUM=?`,
  insertDriveHist: `insert into DRIVE_HIST set ? `, 
  getCarHist: `select * from DRIVE_HIST where CAR_ID=?`
}