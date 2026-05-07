# prompts.md

# React Form Handling

Explain how React captures input data without using a <form> tag.

Why does this work?

```js
onChange={handleChange}
```

Explain what happens internally when a user types inside an input field.

---

Explain this code step by step in very simple words:

```js
setForm((prev) => ({
  ...prev,
  [e.target.name]: e.target.value
}));
```

Questions:
- What is prev?
- Why do we spread old data using ...prev?
- Why do we use square brackets?
- How does e.target.name dynamically update fields?
- Why are inputs called controlled components?

---

Explain the difference between:

```js
value={form.name}
```

and normal HTML input fields.

Why does React store values inside state instead of directly inside the DOM?

---

# Component Communication

Explain how App.jsx sends a function to Form.jsx using props.

Explain this:

```js
<Form onSubmit={handleSubmit} />
```

How does the child component call the parent function?

Explain the complete data flow of my project step by step.

---

# Submit Logic

Explain why we use:

```js
onClick={handleSubmit}
```

instead of HTML form submit.

Why does this project work even without a <form> tag?

Difference between:
- onSubmit
- onClick
- preventDefault()

When should we use real form tags in React?

---

# Validation Logic

Explain this validation logic:

```js
required.forEach((field) => {
  if (!form[field].trim()) {
    newErrors[field] = "This field is required";
  }
});
```

Questions:
- How is field changing automatically?
- Why do we use form[field] instead of form.field?
- Why is trim() important?

---

# File Upload + PDF Parsing

Explain how this works:

```js
const file = e.target.files[0];
```

How does the browser give access to uploaded files?

---

Explain FileReader in very simple words.

Explain this:

```js
reader.readAsArrayBuffer(file);
```

What is ArrayBuffer?

Why do PDF libraries need binary data instead of normal text?

---

Explain this code deeply:

```js
reader.onload = async () => {

}
```

When does onload run?

Why is async used inside it?

---

Explain how pdfjs-dist extracts text from PDFs.

Explain this loop:

```js
for (let i = 1; i <= pdf.numPages; i++)
```

How does it go page by page?

---

Explain this line:

```js
content.items.map((item) => item.str).join(" ")
```

Questions:
- What is inside content.items?
- Why do we use map?
- What is item.str?
- Why do we join everything into one string?

---

# AI + Gemini API

Explain how Gemini API works internally.

What happens after clicking "Generate Cover Letter"?

Explain the complete AI request flow:
- Frontend
- API call
- Prompt
- AI model
- Response
- UI update

---

Explain prompt engineering in simple words.

Why is systemInstruction important?

How does this restrict AI behavior?

```js
systemInstruction: `
You are an expert cover letter writer.
`
```

How can system instructions force AI to do only one task?

Explain role-based prompting in LLMs.

---

Explain the difference between:
- systemInstruction
- contents
- user prompt

How do LLMs understand prompts internally?

---

# API Keys + Security

Explain why API keys should never be pushed to GitHub.

What can happen if someone steals an API key?

---

Explain the difference between:

Node.js:
```js
process.env.API_KEY
```

Vite/React:
```js
import.meta.env.VITE_API_KEY
```

Why does Vite use import.meta.env?

Why must variables start with VITE_ in React Vite projects?

---

Explain what .env files actually do internally.

How does .gitignore protect secret keys?

---

# Async / Await

Explain async/await in simple words using real-life examples.

Why do we use await before API calls?

What happens if we do not use await?

---

Explain try/catch using my project example.

What happens if Gemini API fails?

---

# React State Management

Explain useState deeply but in simple words.

How does React know when to re-render UI?

Why does changing state update the screen automatically?

---

Explain this:

```js
const [loading, setLoading] = useState(false);
```

How does loading state control UI animations?

---

# Conditional Rendering

Explain this:

```js
{loading && (...) }
```

Why does React hide/show components like this?

---

Explain this:

```js
{result && (...) }
```

Why does it only show after AI response comes?

---

# Copy Clipboard Feature

Explain this:

```js
navigator.clipboard.writeText(result)
```

How does clipboard access work in browsers?

---

# UI + Tailwind

Explain how Tailwind CSS works internally.

Why are utility classes faster for development?

---

Explain responsive classes like:

```js
md:flex-row
```

How does responsive design work in Tailwind?

---

# Overall Project Architecture

Explain the complete architecture of my AI Cover Letter Generator project step by step.

Include:
- React flow
- State flow
- Props flow
- PDF flow
- AI flow
- Rendering flow
- User interaction flow

Explain everything in beginner-friendly words.