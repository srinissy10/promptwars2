const EMAIL_FIELDS = ['TO', 'SUBJECT', 'MESSAGE', 'SCHEDULE', 'SCHEDULE_ISO']

export function normalizeAgentResponse(response) {
  if (typeof response === 'string') return response.trim()
  if (response == null) return ''

  if (typeof response === 'object') {
    for (const key of ['output', 'text', 'message']) {
      const value = response[key]
      if (typeof value === 'string') return value.trim()
      if (value && typeof value === 'object') {
        const nested = normalizeAgentResponse(value)
        if (nested) return nested
      }
    }
    return JSON.stringify(response, null, 2)
  }

  return String(response)
}

export function parseEmailResponse(responseText) {
  if (!responseText) return null
  const fields = {}
  const fieldPattern = /^(TO|SUBJECT|MESSAGE|SCHEDULE|SCHEDULE_ISO):\s*(.*)$/gm
  let match
  let currentField = null

  while ((match = fieldPattern.exec(responseText)) !== null) {
    currentField = match[1]
    fields[currentField] = match[2].trim()
    const nextFieldStart = fieldPattern.lastIndex
    const nextMatch = fieldPattern.exec(responseText)
    if (nextMatch) {
      fields[currentField] = responseText.slice(nextFieldStart, nextMatch.index).trim() || fields[currentField]
      fieldPattern.lastIndex = nextMatch.index
    } else {
      const remainder = responseText.slice(nextFieldStart).trim()
      if (remainder) fields[currentField] = `${fields[currentField]}\n${remainder}`.trim()
      break
    }
  }

  if (!EMAIL_FIELDS.every((field) => fields[field])) return null
  return {
    to: fields.TO,
    subject: fields.SUBJECT,
    message: fields.MESSAGE,
    schedule: fields.SCHEDULE,
    scheduleIso: fields.SCHEDULE_ISO,
  }
}