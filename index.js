const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

const createEmployeeRecords = (employees) => {
  return employees.map(createEmployeeRecord)
}

const createTimeInEvent = (employeeRecord, dateStamp) => {
  const [date, hour] = dateStamp.split(' ')
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employeeRecord
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {
  const [date, hour] = dateStamp.split(' ')
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, dateStamp) => {
 const timeInSearchDate = employeeRecord.timeInEvents.find(event => event.date === dateStamp).hour
 const timeOutSearchDate = employeeRecord.timeOutEvents.find(event => event.date === dateStamp).hour
 return (timeOutSearchDate - timeInSearchDate) / 100
}

const wagesEarnedOnDate = (employeeRecord, dateStamp) => {
  return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour
}

const allWagesFor = (employeeRecord) => {
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date)
  return datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date)
  }, 0)
}

const calculatePayroll = (employeeRecords) => {
 return employeeRecords.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord)
  }, 0)
}
