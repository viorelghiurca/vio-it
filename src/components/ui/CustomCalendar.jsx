import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function getEaster(year) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function getBavarianHolidays(year) {
  const easter = getEaster(year)
  const add = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

  const list = [
    { date: new Date(year, 0, 1),    name: 'Neujahr' },
    { date: new Date(year, 0, 6),    name: 'Heilige Drei Könige' },
    { date: add(easter, -2),         name: 'Karfreitag' },
    { date: add(easter, 0),          name: 'Ostersonntag' },
    { date: add(easter, 1),          name: 'Ostermontag' },
    { date: new Date(year, 4, 1),    name: 'Tag der Arbeit' },
    { date: add(easter, 39),         name: 'Christi Himmelfahrt' },
    { date: add(easter, 49),         name: 'Pfingstsonntag' },
    { date: add(easter, 50),         name: 'Pfingstmontag' },
    { date: add(easter, 60),         name: 'Fronleichnam' },
    { date: new Date(year, 7, 15),   name: 'Mariä Himmelfahrt' },
    { date: new Date(year, 9, 3),    name: 'Tag der Deutschen Einheit' },
    { date: new Date(year, 10, 1),   name: 'Allerheiligen' },
    { date: new Date(year, 11, 25),  name: 'Erster Weihnachtstag' },
    { date: new Date(year, 11, 26),  name: 'Zweiter Weihnachtstag' },
  ]

  const map = {}
  list.forEach(({ date, name }) => {
    map[toKey(date)] = name
  })
  return map
}

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

function toKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export { toKey }

export default function CustomCalendar({
  value,
  onChange,
  minDate,
  bookedSlotsMap = {},
  totalSlots = 12,
}) {
  const today = new Date()
  const start = value || minDate || today

  const [viewYear, setViewYear] = useState(start.getFullYear())
  const [viewMonth, setViewMonth] = useState(start.getMonth())
  const [tooltip, setTooltip] = useState(null)

  const holidays = useMemo(
    () => ({ ...getBavarianHolidays(viewYear), ...getBavarianHolidays(viewYear + 1) }),
    [viewYear],
  )

  const days = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1)
    let startDow = firstDay.getDay() - 1
    if (startDow < 0) startDow = 6

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const grid = []

    for (let i = 0; i < startDow; i++) grid.push(null)

    const minMidnight = minDate
      ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
      : null

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d)
      const key = toKey(date)
      const dow = date.getDay()
      const isWeekend = dow === 0 || dow === 6
      const isPast = minMidnight ? date < minMidnight : false
      const holiday = holidays[key] || null
      const bookedCount = (bookedSlotsMap[key] || []).length
      const isFullyBooked = bookedCount >= totalSlots
      const isSelected = value ? toKey(value) === key : false
      const isToday = toKey(today) === key
      const isUnavailable = isWeekend || isPast || !!holiday || isFullyBooked

      grid.push({ date, key, isWeekend, isPast, holiday, isFullyBooked, isSelected, isToday, isUnavailable })
    }

    return grid
  }, [viewYear, viewMonth, value, minDate, holidays, bookedSlotsMap, totalSlots])

  const canGoPrev =
    new Date(viewYear, viewMonth, 1) > new Date(today.getFullYear(), today.getMonth(), 1)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  return (
    <div className="select-none rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">

      {/* Month navigation */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-white/80 hover:text-white hover:bg-white/15 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-white font-semibold text-sm tracking-wide">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-neutral-100 bg-neutral-50/80">
        {WEEKDAYS.map(d => (
          <div
            key={d}
            className={`py-2.5 text-center text-xs font-semibold tracking-wide ${
              d === 'Sa' || d === 'So' ? 'text-neutral-300' : 'text-neutral-400'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-0.5 p-2">
        {days.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />

          let cellClass =
            'relative flex items-center justify-center rounded-xl h-11 text-sm font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary-400'

          if (day.isSelected) {
            cellClass += ' bg-primary-600 text-white shadow-md shadow-primary-200/60'
          } else if (day.isUnavailable) {
            if (day.isPast || day.isWeekend) {
              cellClass += ' text-neutral-200 cursor-not-allowed'
            } else if (day.holiday) {
              cellClass += ' bg-amber-50 text-amber-300 cursor-not-allowed'
            } else {
              cellClass += ' bg-red-50 text-red-300 cursor-not-allowed'
            }
          } else if (day.isToday) {
            cellClass += ' ring-2 ring-primary-400 text-primary-700 hover:bg-primary-50 cursor-pointer'
          } else {
            cellClass += ' text-neutral-700 hover:bg-primary-50 hover:text-primary-700 cursor-pointer'
          }

          const tooltipText = day.holiday
            ? day.holiday
            : day.isFullyBooked
            ? 'Ausgebucht'
            : null

          return (
            <button
              key={day.key}
              type="button"
              onClick={() => !day.isUnavailable && onChange(day.date)}
              disabled={day.isUnavailable}
              onMouseEnter={() => tooltipText && setTooltip({ key: day.key, text: tooltipText })}
              onMouseLeave={() => setTooltip(null)}
              className={cellClass}
            >
              {day.date.getDate()}

              {/* Dot indicator */}
              {!day.isSelected && (day.holiday || day.isFullyBooked) && (
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                    day.holiday ? 'bg-amber-400' : 'bg-red-400'
                  }`}
                />
              )}

              {/* Tooltip */}
              {tooltip?.key === day.key && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap rounded-lg bg-neutral-800 px-2.5 py-1 text-xs font-medium text-white shadow-lg z-10 pointer-events-none">
                  {tooltip.text}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800" />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 pt-1 pb-3 text-xs text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full ring-2 ring-primary-400 bg-white inline-block" />
          Heute
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          Feiertag
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
          Ausgebucht
        </span>
      </div>
    </div>
  )
}
