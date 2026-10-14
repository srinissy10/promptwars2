function EmailSummary({ email }) {
  return (
    <section className="email-summary" aria-label="Email ready to send">
      <div className="summary-heading">
        <span className="summary-mail-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="14" rx="2.5" /><path d="m5 7 7 5.5L19 7" /></svg>
        </span>
        <div>
          <h2>Email ready</h2>
          <p>Here’s what I’ve prepared</p>
        </div>
      </div>
      <dl className="email-details">
        <div><dt>To</dt><dd>{email.to}</dd></div>
        <div><dt>Subject</dt><dd>{email.subject}</dd></div>
        <div><dt>Message</dt><dd className="email-body">{email.message}</dd></div>
        <div><dt>Scheduled</dt><dd>{email.schedule}</dd></div>
      </dl>
      <div className="scheduled-badge">
        <svg viewBox="0 0 18 18" aria-hidden="true"><path d="m4 9.2 3.1 3.1L14 5.5" /></svg>
        Scheduled
      </div>
    </section>
  )
}

export default EmailSummary