const EXAMPLES = [
  'Send an email to Rahul tomorrow at 10 AM about our meeting.',
  'Send a thank-you email to my professor today at 6 PM.',
  'Send a reminder email to srinissy04@gmail.com tomorrow at 9 AM.',
]

function ExamplePrompts({ onSelect }) {
  return (
    <section className="examples" aria-label="Suggested requests">
      <div className="examples-heading">
        <span className="examples-spark" aria-hidden="true">✳</span>
        <h2>Try asking</h2>
      </div>
      <div className="example-list">
        {EXAMPLES.map((example, index) => (
          <button className="example-prompt" key={example} type="button" onClick={() => onSelect(example)}>
            <span className="example-index">0{index + 1}</span>
            <span>{example}</span>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" /></svg>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ExamplePrompts