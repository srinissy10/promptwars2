const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:5678/webhook/personal-email-agent'

export async function sendEmailAgentMessage(message) {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error('Failed to contact email agent')
  }

  const responseText = await response.text()
  if (!responseText) return ''

  try {
    return JSON.parse(responseText)
  } catch {
    return responseText
  }
}