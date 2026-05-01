import { useMemo, useState } from 'react'
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useEmployees } from '../../hooks/useEmployees'
import { Timesheet, TimesheetEntry, useTimesheet } from '../../hooks/useTimesheet'

const days: { label: string, value: string }[] = [
  { label: 'Mon', value: 'MONDAY' },
  { label: 'Tue', value: 'TUESDAY' },
  { label: 'Wed', value: 'WEDNESDAY' },
  { label: 'Thu', value: 'THURSDAY' },
  { label: 'Fri', value: 'FRIDAY' }
]

function mondayOfWeek(date: Date) {
  const d = new Date(date)
  const day = d.getDay() || 7
  if (day !== 1) d.setHours(-24 * (day - 1))
  return d
}

export default function TimesheetEditor() {
  const { employees } = useEmployees()
  const [selectedEmp, setSelectedEmp] = useState<number | ''>('')
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const weekStart = useMemo(() => dayjs(mondayOfWeek(new Date(selectedDate))).format('YYYY-MM-DD'), [selectedDate])
  const { timesheet, setTimesheet, save } = useTimesheet(Number(selectedEmp || 0), weekStart)
  const [savedOk, setSavedOk] = useState(false)

  const handleHoursChange = (dayValue: string, hours: number) => {
    const entry: TimesheetEntry = { dayOfWeek: dayValue, hours, projectCode: 'PRJ1' }
    const newEntries = [...timesheet.entries.filter(e => e.dayOfWeek !== dayValue), entry]
    setTimesheet({ ...timesheet, entries: newEntries })
  }

  const onSave = async () => {
    const payload: Timesheet = { ...timesheet, employeeId: Number(selectedEmp), weekStart }
    await save(payload)
    setSavedOk(true)
    setTimeout(() => setSavedOk(false), 2000)
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Timesheet</Typography>
      <Stack direction="row" spacing={2}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="emp-label">Employee</InputLabel>
          <Select labelId="emp-label" label="Employee" value={selectedEmp} onChange={e => setSelectedEmp(e.target.value as number)}>
            <MenuItem value=""><em>Select...</em></MenuItem>
            {employees.map(e => (
              <MenuItem key={e.id} value={e.id}>{e.firstName} {e.lastName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField type="date" label="Week" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} InputLabelProps={{ shrink: true }} />
      </Stack>

      {selectedEmp === '' ? (
        <Alert severity="info">Select an employee and week to edit.</Alert>
      ) : (
        <Box>
          <Stack direction="row" spacing={2}>
            {days.map(d => (
              <TextField
                key={d.value}
                label={`${d.label} Hours`}
                type="number"
                inputProps={{ step: 0.5, min: 0, max: 24 }}
                value={timesheet.entries.find(e => e.dayOfWeek === d.value)?.hours ?? ''}
                onChange={e => handleHoursChange(d.value, Number(e.target.value))}
              />
            ))}
          </Stack>
          <Button sx={{ mt: 2 }} variant="contained" onClick={onSave}>Save</Button>
          {savedOk && <Alert sx={{ mt: 2 }} severity="success">Saved</Alert>}
        </Box>
      )}
    </Stack>
  )
}

